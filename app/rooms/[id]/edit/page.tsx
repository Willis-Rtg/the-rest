import { notFound } from "next/navigation";
import { getRoom } from "../actions";
import RoomEditClient from "./client";

export default async function RoomEdit({ params }: { params: { id: string } }) {
  const roomId = Number(params.id);
  if (isNaN(roomId)) return notFound();
  const room = await getRoom(roomId);
  return <RoomEditClient room={room} />;
}
