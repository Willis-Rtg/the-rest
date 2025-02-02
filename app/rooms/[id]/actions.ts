"use server";

import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { TypeOf, z } from "zod";

export type TRoom = Prisma.PromiseReturnType<typeof getRoom>;

export type TRooms = Prisma.PromiseReturnType<typeof getRooms>;

const deleteRoomSchema = z.object({
  roomId: z.number(),
});

export async function getRoom(id: number) {
  return await db.room.findUnique({
    where: { id },
    include: {
      prices: true,
      panorama: { include: { files: true } },
      roomPhotos: true,
    },
  });
}

export async function getRooms() {
  return await db.room.findMany({
    select: { title: true, id: true },
    orderBy: { createdAt: "asc" },
  });
}

export async function deleteRoomDB(_: any, formData: FormData) {
  const data = {
    roomId: Number(formData.get("roomId")),
  };
  const validData = await deleteRoomSchema.safeParse(data);

  if (!validData.success) {
    return {
      fieldError: "valid error.",
    };
  }

  const files = await db.file.findMany({
    where: {
      roomId: validData.data.roomId,
    },
  });
  for (let file of files) {
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1/${file.storageId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        },
      }
    );
  }
  await db.room.delete({
    where: {
      id: validData.data.roomId,
    },
  });
}
