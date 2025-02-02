"use server";

import db from "@/lib/db";
import { Prisma } from "@prisma/client";

export type THomePanorama = Prisma.PromiseReturnType<typeof getHomePanorama>;
export type THomeBeaches = Prisma.PromiseReturnType<
  typeof getHomeBeachesInitial
>;

export async function getHomePanorama() {
  return await db.panorama.findUnique({
    where: {
      panoramaType: "prologue",
    },
    include: {
      files: {
        take: 2,
      },
    },
  });
}

export async function getHomeBeachesInitial() {
  return await db.beach.findMany({
    select: {
      id: true,
      files: true,
    },
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getHomeBeachesMore(page: number) {
  return await db.beach.findMany({
    select: {
      id: true,
      files: true,
    },
    take: 6,
    skip: 6 * page,
    orderBy: {
      createdAt: "desc",
    },
  });
}
