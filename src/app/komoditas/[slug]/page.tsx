import type { Metadata } from "next";
import ProductDetailSection from "../../../components/section/product-detail-section"
import { productService } from "@/lib/api/services";
import { SITE_URL, SITE_NAME, truncate } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await productService.getBySlug(slug);
    const product = res.data;
    if (!product) return {};

    const description = truncate(
      product.description ?? product.spectification ?? `Beli ${product.nama} berkualitas dengan harga terbaik di ${SITE_NAME}.`
    );
    const image = product.images?.[0]?.image_url;

    return {
      title: `${product.nama} — Beli di ${SITE_NAME}`,
      description,
      alternates: {
        canonical: `/komoditas/${product.slug ?? slug}`,
      },
      openGraph: {
        type: "website",
        title: `${product.nama} — ${SITE_NAME}`,
        description,
        url: `${SITE_URL}/komoditas/${product.slug ?? slug}`,
        images: image ? [{ url: image, alt: product.nama }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: `${product.nama} — ${SITE_NAME}`,
        description,
        images: image ? [image] : undefined,
      },
    };
  } catch {
    return {};
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  let productJsonLd: Record<string, unknown> | null = null;
  try {
    const res = await productService.getBySlug(slug);
    const product = res.data;
    if (product) {
      productJsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.nama,
        description:
          product.description ?? product.spectification ?? undefined,
        image: product.images?.map((img) => img.image_url) ?? undefined,
        url: `${SITE_URL}/komoditas/${product.slug ?? slug}`,
        sku: product.hs_code ?? undefined,
        brand: { "@type": "Brand", name: SITE_NAME },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "IDR",
          lowPrice: product.price_min,
          highPrice: product.price_max,
          availability: "https://schema.org/InStock",
        },
      };
    }
  } catch {
    // Metadata dan JSON-LD hanya bonus; halaman tetap dirender oleh komponen client
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Komoditas", item: `${SITE_URL}/komoditas` },
      {
        "@type": "ListItem",
        position: 3,
        name: productJsonLd ? (productJsonLd as { name: string }).name : slug,
        item: `${SITE_URL}/komoditas/${slug}`,
      },
    ],
  };

  return (
    <>
      {productJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductDetailSection />
    </>
  )
}