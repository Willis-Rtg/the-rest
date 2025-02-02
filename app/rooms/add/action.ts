"use server";
import db from "@/lib/db";
import { Season, Week } from "@prisma/client";
import { redirect } from "next/navigation";

import { z } from "zod";

const roomSchema = z.object({
  title: z.string(),
  structure: z.string(),
  pyong: z.string(),
  quantity: z.string(),
  maxQuantity: z.string(),
  addPrice: z.string(),
  facilities: z.string(),
  extra: z.string(),
  panaramas: z.array(z.instanceof(File)),
  roomPhotos: z.array(z.instanceof(File)),
  prices: z.array(z.string()),
});

export async function uploadRoom(_: any, formData: FormData) {
  const data = {
    title: formData.get("title"),
    structure: formData.get("structure"),
    pyong: formData.get("pyong"),
    quantity: formData.get("quantity"),
    maxQuantity: formData.get("maxQuantity"),
    addPrice: formData.get("addPrice"),
    facilities: formData.get("facilities"),
    extra: formData.get("extra"),
    panaramas: formData.getAll("panaramas"),
    roomPhotos: formData.getAll("roomPhotos"),
    prices: formData.getAll("prices"),
  };
  const result = await roomSchema.safeParse(data);

  if (!result.success) return;

  let panoramaResult;
  let roomPhotoResult;

  let panoramaDB = await db.panorama.create({ data: {} });
  for (const [index, panorama] of result.data?.panaramas.entries()) {
    const panoramaFormData = new FormData();
    panoramaFormData.append("file", panorama);
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
    panoramaResult = result.result;
    const file = await db.file.create({
      data: {
        filename: panoramaResult.filename,
        index,
        storageId: panoramaResult.id,
        url: panoramaResult.variants[0],
        type: "photo",
        panoramaId: panoramaDB.id,
      },
    });
  }
  let roomPhotoDBs = [];
  for (const [index, roomPhoto] of result.data.roomPhotos.entries()) {
    const roomPhotoFormData = new FormData();
    roomPhotoFormData.append("file", roomPhoto);
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
        fieldError: "Room photo upload failed.",
      };
    }
    roomPhotoResult = result.result;
    const file = await db.file.create({
      data: {
        filename: roomPhotoResult.filename,
        storageId: roomPhotoResult.id,
        url: roomPhotoResult.variants[0],
        type: "photo",
        index,
      },
    });
    roomPhotoDBs.push(file);
  }

  let index = 0;
  const seasons = ["base", "middle", "busy"];
  const weeks = ["weekday", "friday", "weekend"];

  const manyPrice = seasons.map((season) => {
    return weeks.map((week) => {
      return {
        price: Number(result.data.prices[index++]),
        season,
        week,
      };
    });
  });
  let createManyPrice: any = [];
  manyPrice.forEach((price) => {
    createManyPrice = [...createManyPrice, ...price];
  });

  console.log(result.data.addPrice);

  const room = await db.room.create({
    data: {
      title: result.data.title,
      structure: result.data.structure,
      pyong: Number(result.data.pyong),
      quantity: Number(result.data.quantity),
      maxQuantity: Number(result.data.maxQuantity),
      addPrice: Number(result.data.addPrice.replace(/,/g, "")),
      facilities: result.data.facilities,
      extra: result.data.extra,
      roomPhotos: {
        connect: roomPhotoDBs,
      },
      panorama: {
        connect: {
          id: panoramaDB.id,
        },
      },
      prices: {
        createMany: {
          data: createManyPrice,
        },
      },
    },
  });
  redirect(`/rooms/${room.id}`);
}
