import { notFound } from "next/navigation";
import RoomDetailClient from "./client";
import { getRoom } from "./actions";
import { getSession } from "@/lib/session";

export default async function RoomDetail({
  params,
}: {
  params: { id: string };
}) {
  const roomId = Number(params.id);
  if (isNaN(roomId)) return notFound();

  const roomDB = await getRoom(roomId);
  const session = await getSession();

  return <RoomDetailClient roomDB={roomDB} isAdmin={session.id === 1} />;
}
