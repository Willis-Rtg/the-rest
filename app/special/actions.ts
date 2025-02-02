"use server";

import db from "@/lib/db";
import { PanoramaType, Prisma } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const specialSchema = z.object({
  files: z.array(z.instanceof(File)).length(5),
  type: z.enum(["해변&산책로", "오션뷰", "바베큐", "잔디마당"]),
  index: z.array(z.number()),
});

export async function uploadPanorama(prevState: any, formData: FormData) {
  const data = {
    files: formData.getAll("files"),
    type: prevState.type,
    index: prevState.index,
  };

  const validData = await specialSchema.safeParse(data);

  if (!validData.success) {
    return {
      fieldError: validData.error.flatten(),
    };
  }

  let panoramaType: PanoramaType;

  switch (validData.data.type) {
    case "해변&산책로":
      panoramaType = "sea";
      break;
    case "오션뷰":
      panoramaType = "oceaon";
      break;
    case "바베큐":
      panoramaType = "barbecue";
      break;
    case "잔디마당":
      panoramaType = "garden";
      break;
  }

  let panorama;
  panorama = await db.panorama.findUnique({
    where: {
      panoramaType: panoramaType!,
    },
    select: {
      id: true,
      files: true,
    },
  });
  if (panorama) {
    for (let oldFile of panorama?.files!) {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1/${oldFile.storageId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          },
        }
      );
    }
    await db.panorama.delete({
      where: {
        id: panorama?.id,
      },
    });
  }
  panorama = await db.panorama.create({
    data: {
      panoramaType,
    },
  });

  for (let [index, file] of validData.data.files.entries()) {
    const specialForm = new FormData();
    specialForm.append("file", file);
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        },
        body: specialForm,
      }
    );
    const result = await response.json();
    const fileResult = result.result;
    if (!result.success) {
      return {
        fieldError: "Panorama upload failed.",
      };
    }
    const newFile = await db.file.create({
      data: {
        filename: fileResult.filename,
        index,
        storageId: fileResult.id,
        url: fileResult.variants[0],
        type: "photo",
        panoramaId: panorama.id,
      },
      select: {
        id: true,
      },
    });
  }
  revalidateTag("special");

  return {
    success: true,
    fieldError: null,
  };
}

export async function getPanorama(panoramaType: PanoramaType) {
  return await db.panorama.findUnique({
    where: { panoramaType },
    select: {
      id: true,
      panoramaType: true,
      files: true,
    },
  });
}
