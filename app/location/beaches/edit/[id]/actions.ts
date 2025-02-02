"use server";

import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export type TBeachDB = Prisma.PromiseReturnType<typeof getBeach>;

const editBeachSchema = z.object({
  files: z
    .array(z.instanceof(File))
    .min(2, { message: "두 개 이상의 파일을 올려주세요." }),
  payload: z.string() || z.null(),
});

export async function getBeach(beachId: number) {
  return await db.beach.findUnique({
    where: {
      id: beachId,
    },
    select: {
      id: true,
      payload: true,
      files: {
        orderBy: {
          index: "asc",
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function editBeach(formData: FormData, beachId: number) {
  const data = {
    files: formData.getAll("files"),
    payload: formData.get("payload"),
  };

  const validData = await editBeachSchema.safeParse(data);

  if (!validData.success) {
    return validData.error.flatten();
  }

  const beach = await db.beach.findUnique({
    where: {
      id: beachId,
    },
    select: {
      id: true,
      files: true,
    },
  });
  if (!beach) {
    return console.log("not found beach");
  }
  // old files delete
  for (let file of beach.files) {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1/${file.storageId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        },
      }
    );
    const responseJson = await response.json();
    if (!responseJson.success) {
      return console.log("cloud file delete error");
    }
  }
  const deleteFiles = await db.file.deleteMany({
    where: { beachId },
  });
  if (!deleteFiles) return console.log("DB delete files Error.");

  // new file upload
  for (let [index, file] of validData.data.files.entries()) {
    const beachFileFormData = new FormData();
    beachFileFormData.append("file", file);
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        },
        body: beachFileFormData,
      }
    );
    const responseJson = await response.json();
    if (!responseJson.success)
      return console.log("Cloud beach file upload faild");
    const newFile = await db.file.create({
      data: {
        filename: file.name,
        index,
        storageId: responseJson.result.id,
        type: "photo",
        url: responseJson.result.variants[0],
        beachId,
      },
    });
  }
  const updateBeach = await db.beach.update({
    where: {
      id: beachId,
    },
    data: {
      payload: validData.data.payload,
    },
  });
  revalidateTag("beaches");
  redirect("/location/beaches");
}
