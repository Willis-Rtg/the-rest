import Image from "next/image";
import HomeClient from "./client";
import { getHomeBeachesInitial, getHomePanorama } from "./actions";

export default async function Home() {
  const panorama = await getHomePanorama();
  const beachesInitial = await getHomeBeachesInitial();

  return <HomeClient panorama={panorama} beachesInitial={beachesInitial} />;
}
