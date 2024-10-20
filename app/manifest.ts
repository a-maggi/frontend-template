import type { MetadataRoute } from "next";
import { config } from "../config";

export default function manifest(): MetadataRoute.Manifest {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return {
    name: config.name,
    short_name: config.name,
    description: config.description,
    start_url: baseUrl,
    icons: [
      {
        src: "/static/favicon/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/static/favicon/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ],
    theme_color: "#137648",
    background_color: "#171717",
    display: "standalone"
  };
}
