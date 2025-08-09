"use server";

import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getSession } from "@/lib/session";
import {
  DeleteBucketCommand,
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { TPreview } from "@/components/top-image";
import { Prisma } from "@prisma/client";

const loginSchema = z.object({
  ID: z.string().trim().toLowerCase(),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, "비밀먼호가 너무 짧습니다.")
    .max(PASSWORD_MAX_LENGTH, "비밀번호가 너무 깁니다."),
  // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERR_MSG),
});

export async function login(prevState: any, formData: FormData) {
  const data = {
    ID: formData.get("ID"),
    password: formData.get("password"),
  };
  const result = await loginSchema.safeParse(data);
  if (result.success) {
    const admin = await db.user.findUnique({
      where: {
        ID: result.data.ID,
      },
    });
    if (admin) {
      const check = await bcrypt.compare(result.data.password, admin?.password);
      if (!check) {
        return { feildErrors: { ID: [], password: ["Wrong password"] } };
      }
      const session = await getSession();
      session.id = admin.id;
      await session.save();
      return { success: true };
    }
  }
}

export async function isLoggedIn() {
  const session = await getSession();
  if (session.id === 1) {
    return true;
  } else {
    return false;
  }
}

const bannerSchema = z
  .array(z.instanceof(File))
  .min(5, "Need at least 5 files.");

const bucket = process.env.AMPLIFY_BUCKET;
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export async function uploadBanner(
  prevState: { index: number[]; selectedBanner: number },
  formData: FormData
) {
  const fileList = await formData.getAll("file");

  const result = await bannerSchema.safeParse(fileList);
  if (!result.success) {
    return result.error.flatten();
  }
  const oldFiles = await db.file.findMany({
    where: { bannerId: prevState.selectedBanner },
  });
  if (oldFiles.length > 0) {
    for (const file of oldFiles) {
      if (file.type === "photo" || file.type === "svg") {
        await fetch(
          `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1/${file.storageId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
            },
          }
        );
      } else {
        await s3.send(
          new DeleteObjectCommand({
            Bucket: process.env.AMPLIFY_BUCKET,
            Key: file.filename,
          })
        );
      }
    }

    await db.file.deleteMany({ where: { bannerId: prevState.selectedBanner } });
  }
  const session = await getSession();
  if (!session.id) return;
  for (let [index, file] of result.data.entries()) {
    const newFormData = new FormData();
    newFormData.append(`file`, result.data[index]);
    const files = result.data;
    console.log(files);
    if (files[index].type != "video/mp4" && files[index].type != "video") {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          },
          body: newFormData,
        }
      );
      const {
        result: { id },
      } = await response.json();
      await db.file.create({
        data: {
          index: prevState.index[index],
          filename: files[index].name,
          url: `https://imagedelivery.net/${process.env.CLOUDFLARE_HASH}/${id}/public`,
          type: files[index].type === "image/svg+xml" ? "svg" : "photo",
          storageId: id,
          Banner: {
            connectOrCreate: {
              where: { id: prevState.selectedBanner },
              create: { id: prevState.selectedBanner },
            },
          },
        },
      });
    } else {
      if (file.size > 1024 ** 2 * 3) {
        return {
          fieldErrors: ["File size is too big."],
          formErrors: ["File size is too big."],
        };
      }
      let file_Key;
      if (files[index].name.includes("-")) {
        file_Key = `${Date.now()}-${files[index].name.split("-")[1]}`;
      } else {
        file_Key = `${Date.now()}-${files[index].name}`;
      }
      file;
      const s3item = await s3.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: file_Key,
          Body: (await files[index].arrayBuffer()) as unknown as Buffer,
          ContentType: "video/mp4",
        })
      );
      console.log(s3item);

      await db.file.create({
        data: {
          filename: file_Key,
          index: prevState.index[index],
          url: `https://the--rest.s3.ap-northeast-2.amazonaws.com/${file_Key}`,
          type: "video",
          storageId: s3item.$metadata.requestId as string,
          Banner: {
            connectOrCreate: {
              where: { id: prevState.selectedBanner },
              create: { id: prevState.selectedBanner },
            },
          },
        },
      });
    }
  }
  await db.user.update({
    where: { id: session.id },
    data: { bannerId: prevState.selectedBanner },
  });
}

export async function getFiles(selectedBanner: number) {
  return await db.file.findMany({
    where: { bannerId: selectedBanner },
    orderBy: { index: "asc" },
  });
}

export async function getUser() {
  const session = await getSession();
  if (!session.id) return;
  return await db.user.findUnique({
    where: { id: session.id },
    select: { bannerId: true, id: true },
  });
}

export async function fetchFile(url: string) {
  return await (await fetch(url)).blob();
}

export async function deleteCloudFile(deletedFile: TPreview) {
  if (!deletedFile.id || !deletedFile.storageId) return;

  if (deletedFile.type === "video") {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.AMPLIFY_BUCKET,
        Key: deletedFile.filename,
      })
    );
    await db.file.delete({ where: { id: deletedFile.id } });
  } else {
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1/${deletedFile.storageId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        },
      }
    );
    await db.file.delete({ where: { id: deletedFile.id } });
  }
}

export async function getRoomsInfo() {
  return await db.room.findMany({
    select: { title: true, id: true, roomPhotos: true, panorama: true },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export type TRooms = Prisma.PromiseReturnType<typeof getRoomsInfo>;
