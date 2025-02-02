import { notFound } from "next/navigation";
import BeachEditClient from "./client";
import { getBeach } from "./actions";

export default async function BeachEdit({
  params,
}: {
  params: { id: number };
}) {
  const beachId = Number(params.id);
  if (isNaN(beachId)) return notFound();

  const beach = await getBeach(beachId);

  return <BeachEditClient beachDB={beach} />;
}
