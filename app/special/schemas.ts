import { Prisma } from "@prisma/client";
import { unstable_cache as nextCache } from "next/cache";
import { getPanorama } from "./actions";

export type TPanoramaSpecial = Prisma.PromiseReturnType<typeof getPanorama>;

export const getPanoramaCache = nextCache(getPanorama, ["special"], {
  tags: ["special"],
});
