"use server";

import db from "@/lib/db";
import { PanoramaType, Prisma } from "@prisma/client";
import { z } from "zod";

export type TPanorama = Prisma.PromiseReturnType<typeof getPanorama>;

const panorama2Schema = z.array(z.instanceof(File)).max(7).min(6);

export async function getPanorama() {
  const panorama = await db.panorama.findUnique({
    where: { panoramaType: "prologue" },
    select: {
      files: {
        select: {
          id: true,
          index: true,
          url: true,
          storageId: true,
          filename: true,
        },
        orderBy: {
          index: "asc",
        },
      },
    },
  });
  return panorama;
}

export async function deleteCloudFile(fileId: number, storegeId: string) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1/${storegeId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      },
    }
  );
  const result = await response.json();
  if (!result.success)
    return {
      fieldError: "delete failed.",
    };

  const deleteFile = await db.file.delete({ where: { id: fileId } });

  let files = await db.file.findMany({
    where: {
      panoramaId: deleteFile.panoramaId,
      Panorama: {
        panoramaType: "prologue",
      },
    },
  });

  if (deleteFile.index < 6) {
    for (let file of files) {
      if (file.index > deleteFile.index) {
        await db.file.update({
          where: { id: file.id },
          data: { index: file.index - 1 },
        });
      }
    }
  }
  console.log(result);
}

export async function uploadPanorama(state: any, formData: FormData) {
  const data = formData.getAll("panorama");

  const validData = await panorama2Schema.safeParse(data);

  console.log(validData);
  if (!validData.success) {
    return {
      fieldError: "valid error.",
    };
  }

  let panorama: any;
  panorama = await db.panorama.findUnique({
    where: {
      panoramaType: "prologue",
    },
    select: {
      id: true,
      files: true,
    },
  });

  if (!panorama) {
    panorama = await db.panorama.create({
      data: { panoramaType: "prologue" },
    });
  }

  const oldFiles = await db.file.findMany({
    where: {
      panoramaId: panorama.id,
    },
    select: {
      id: true,
      storageId: true,
    },
  });

  for (let file of oldFiles) {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1/${file.storageId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        },
      }
    );
    const result = await response.json();
    if (!result.success) return;
    console.log("delete");
  }
  await db.file.deleteMany({
    where: {
      panoramaId: panorama.id,
    },
  });

  for (let [index, file] of validData.data.entries()) {
    let panorama2FormData = new FormData();
    panorama2FormData.append("file", file);
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        },
        body: panorama2FormData,
      }
    );
    const result = await response.json();
    if (!result.success) {
      return {
        fieldError: "upload error",
      };
    }
    let panorama2Result = result.result;
    await db.file.create({
      data: {
        filename: panorama2Result.filename,
        storageId: panorama2Result.id,
        url: panorama2Result.variants[0],
        index: index + 2,
        type: "photo",
        panoramaId: panorama.id,
      },
    });
  }
}

export async function getUploadUrl() {
  const url = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      },
    }
  );
  const data = await url.json();
  return data;
}
