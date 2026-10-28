import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@lib/core";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — The Tree of Knowledge`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#f6f4ef",
    theme_color: "#191918",
    categories: ["education", "science", "reference", "medical"],
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
