import { MetadataRoute } from "next";
import { config } from "../config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: config.domain,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1
    }
  ];
}
