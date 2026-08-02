import type { Metadata } from "next";

const SITE_URL = "https://pedaver.com";
const SITE_NAME = "Pedaver";
const DEFAULT_IMAGE = `${SITE_URL}/images/og-image.jpg`;

/**
 * Builds a consistent Metadata object (title, description, Open Graph, Twitter Card)
 * for a single route. Pass `path` without a leading domain, e.g. "/about" or
 * "/crops/wheat" — `path: ""` means the homepage.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image ?? DEFAULT_IMAGE;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
      images: [{ url: ogImage }],
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export { SITE_URL, SITE_NAME };
