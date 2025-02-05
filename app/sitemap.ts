import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.xn--9m1bl10a.com/",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://www.xn--9m1bl10a.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.xn--9m1bl10a.com/location/beaches",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      // images: ['https://www.xn--9m1bl10a.com/더쉼.png']
    },
  ];
}
