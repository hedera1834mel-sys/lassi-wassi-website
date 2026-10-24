import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lassi Wassi Pune",
    short_name: "Lassi Wassi",
    description: "Authentic Shawarma, Burgers, Lassi & Shakes in Pune",
    start_url: "/",
    display: "standalone",
    background_color: "#060606",
    theme_color: "#E50914",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
