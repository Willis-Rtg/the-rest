import { getSession } from "@/lib/session";
import BeachClient from "./client";
import { getBeachesCache } from "./actions";

export default async function Beach() {
  const session = await getSession();

  const beaches = await getBeachesCache();

  return <BeachClient isAdmin={session.id === 1} initialBeaches={beaches} />;
}
