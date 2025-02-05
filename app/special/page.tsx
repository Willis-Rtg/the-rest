import SpecialClient from "./client";
import { PanoramaType } from "@prisma/client";
import { getPanoramaCache } from "./schemas";
import { revalidateTag } from "next/cache";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: {
    type: string;
  };
}) {
  return {
    title: searchParams.type,
    description: "The 쉼 펜션만의 특별한 체험",
  };
}

export default async function Special({
  searchParams,
}: {
  searchParams: {
    type: string;
  };
}) {
  let panoramaType: PanoramaType;
  switch (searchParams.type) {
    case "해변&산책로":
      panoramaType = "sea";
      break;
    case "오션뷰":
      panoramaType = "oceaon";
      break;
    case "바베큐":
      panoramaType = "barbecue";
      break;
    case "잔디마당":
      panoramaType = "garden";
      break;
    default:
      panoramaType = "sea";
  }

  const panorama = await getPanoramaCache(panoramaType);

  revalidateTag("special");

  return <SpecialClient panorama={panorama} />;
}
