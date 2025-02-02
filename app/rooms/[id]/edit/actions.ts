"use server";

import db from "@/lib/db";
import { FileType, Season, Week } from "@prisma/client";
import { z } from "zod";

const roomEditSchema = z.object({
  title: z.string(),
  structure: z.string(),
  pyong: z.number(),
  quantity: z.number(),
  maxQuantity: z.number(),
  addPrice: z.number(),
  facilities: z.string(),
  extra: z.string(),
  prices: z.array(z.number()),
  panoramas: z.array(z.instanceof(File)),
  roomPhotos: z.array(z.instanceof(File)),
});

export async function updateRoomDB(roomId: any, formData: FormData) {
  const data = {
    title: formData.get("title"),
    structure: formData.get("structure"),
    pyong: Number(formData.get("pyong")),
    quantity: Number(formData.get("quantity")),
    maxQuantity: Number(formData.get("maxQuantity")),
    addPrice: Number(formData.get("addPrice")?.toString().replaceAll(",", "")),
    facilities: formData.get("facilities"),
    extra: formData.get("extra"),
    prices: formData
      .getAll("prices")
      .map((price) => Number(price.toString().replaceAll(",", ""))),
    panoramas: formData.getAll("panoramas"),
    roomPhotos: formData.getAll("roomPhotos"),
  };

  const validData = await roomEditSchema.safeParse(data);

  if (!validData.success) {
    return validData.error.flatten();
  }

  // old file remove
  const oldRoomPhotos = await db.file.findMany({
    where: {
      roomId,
    },
  });
  for (let file of oldRoomPhotos) {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1/${file.storageId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        },
      }
    );
  }
  await db.file.deleteMany({
    where: {
      roomId,
    },
  });
  const oldPanorama = await db.panorama.findUnique({
    where: { roomId },
    select: { id: true, files: true },
  });
  if (oldPanorama) {
    for (let file of oldPanorama.files) {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1/${file.storageId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          },
        }
      );
    }
    await db.file.deleteMany({
      where: {
        panoramaId: oldPanorama.id,
      },
    });
    await db.panorama.delete({ where: { id: oldPanorama?.id } });
  }

  await db.price.deleteMany({
    where: {
      roomId,
    },
  });

  let pricesArray: any = [];
  let i = 0;
  for (let season of Object.values(Season)) {
    for (let week of Object.values(Week)) {
      pricesArray.push({
        season,
        week,
        price: validData.data.prices[i],
      });
      i++;
    }
  }

  // upload new files
  const newPanorama = await db.panorama.create({
    data: {
      roomId,
    },
    select: {
      id: true,
    },
  });

  for (let [index, file] of validData.data.panoramas.entries()) {
    let panoramaFormData = new FormData();
    panoramaFormData.append("file", file);
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        },
        body: panoramaFormData,
      }
    );
    const result = await response.json();
    if (!result.success) {
      return {
        fieldError: "Panorama upload failed.",
      };
    }
    let panoramaResult = result.result;
    await db.file.create({
      data: {
        filename: file.name + "",
        type: FileType.photo,
        storageId: panoramaResult.id + "",
        url: panoramaResult.variants[0] + "",
        index,
        panoramaId: newPanorama.id,
      },
    });
  }
  for (let [index, file] of validData.data.roomPhotos.entries()) {
    let roomPhotoFormData = new FormData();
    roomPhotoFormData.append("file", file);
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        },
        body: roomPhotoFormData,
      }
    );
    const result = await response.json();
    if (!result.success) {
      return {
        fieldError: "roomPhoto upload failed.",
      };
    }
    let roomPhotoResult = result.result;

    await db.file.create({
      data: {
        filename: file.name,
        index,
        roomId,
        url: roomPhotoResult.variants[0],
        storageId: roomPhotoResult.id,
        type: "photo",
      },
    });
  }

  // update Room
  db.price.deleteMany({ where: { roomId } });

  const result = await db.room.update({
    where: {
      id: roomId,
    },
    data: {
      title: validData.data.title,
      structure: validData.data.structure,
      pyong: validData.data.pyong,
      quantity: validData.data.quantity,
      maxQuantity: validData.data.maxQuantity,
      addPrice: validData.data.addPrice,
      facilities: validData.data.facilities,
      extra: validData.data.extra,
      prices: {
        createMany: {
          data: pricesArray,
        },
      },
    },
  });
}
