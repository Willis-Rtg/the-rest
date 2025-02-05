import { notFound } from "next/navigation";
import RoomDetailClient from "./client";
import { getRoom } from "./actions";
import { getSession } from "@/lib/session";
import db from "@/lib/db";

export async function generateMetadata({
  params: { id },
}: {
  params: { id: number };
}) {
  if (!id) {
    return {};
  }
  const room = await db.room.findUnique({
    where: {
      id: +id,
    },
    select: {
      title: true,
    },
  });
  if (!room) return;
  return {
    title: `${room.title}`,
    description: "THe 쉼 펜션 방 소개",
  };
}

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
