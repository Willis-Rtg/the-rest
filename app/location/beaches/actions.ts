"use server";

import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";

export type TBeachs = Prisma.PromiseReturnType<typeof getInitalBeaches>;

export const getBeachesCache = nextCache(getInitalBeaches, ["beaches"], {
  tags: ["beaches"],
});

export async function getInitalBeaches() {
  return db.beach.findMany({
    select: {
      id: true,
      files: true,
      payload: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 1,
  });
}

export async function getMoreBeaches(page: number) {
  return db.beach.findMany({
    select: {
      id: true,
      files: true,
      payload: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 1,
    skip: 1 * page,
  });
}

export async function deleteBeachDB(beachId: number) {
  const files = await db.file.findMany({
    where: {
      beachId,
    },
  });

  for (let file of files!) {
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
  const check = await db.beach.delete({
    where: {
      id: beachId,
    },
  });
  if (!check) return;
  revalidateTag("beaches");
}
