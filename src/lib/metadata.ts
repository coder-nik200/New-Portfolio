import type { Metadata } from "next";
import { siteConfig } from "@/config/meta";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  type?: "website" | "article";
};

export function createPageMetadata({
  title,
  description,
  path,
  image = siteConfig.ogImage,
  imageWidth = siteConfig.ogImageWidth,
  imageHeight = siteConfig.ogImageHeight,
  type = "website",
}: PageMetadataOptions): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const imageUrl = new URL(image, siteConfig.url).toString();

  const pathname = new URL(imageUrl).pathname.toLowerCase();

  const imageType = pathname.endsWith(".png")
    ? "image/png"
    : pathname.endsWith(".webp")
      ? "image/webp"
      : pathname.endsWith(".jpg") || pathname.endsWith(".jpeg")
        ? "image/jpeg"
        : undefined;
  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type,
      locale: "en_IN",
      images: [
        {
          url: imageUrl,
          width: imageWidth,
          height: imageHeight,
          alt: `${siteConfig.name} — ${title}`,
          type: imageType,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function pageTitle(label: string) {
  return `${label} | ${siteConfig.name}`;
}
