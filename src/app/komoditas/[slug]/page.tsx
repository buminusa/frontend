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
    const url = `/komoditas/${product.slug ?? slug}`;
    const keywords = [product.nama, product.category?.name_categories, product.hs_code, "rempah", product.supplier?.company_name].filter(Boolean) as string[];

    return {
      title: `${product.nama} — Beli di ${SITE_NAME}`,
      description,
      keywords,
      alternates: { canonical: url, languages: { "id-ID": url, "x-default": url } },
      openGraph: {
        type: "website",
        title: `${product.nama} — ${SITE_NAME}`,
        description,
        url: `${SITE_URL}${url}`,
        images: image
          ? [{ url: image, width: 1200, height: 630, alt: product.nama }]
          : [{ url: "/opengraph-image", width: 1200, height: 630, alt: SITE_NAME }],
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
      const isRange = product.price_min !== product.price_max;
      const availability =
        product.status === "Rejected" || product.status === "Pending"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock";
      productJsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.nama,
        description: product.description ?? product.spectification ?? undefined,
        image: product.images?.map((img) => img.image_url) ?? undefined,
        url: `${SITE_URL}/komoditas/${product.slug ?? slug}`,
        sku: product.hs_code ?? undefined,
        category: product.category?.name_categories ?? undefined,
        brand: { "@type": "Brand", name: product.supplier?.company_name ?? SITE_NAME },
        ...(product.supplier
          ? { manufacturer: { "@type": "Organization", name: product.supplier.company_name } }
          : {}),
        offers: isRange
          ? {
              "@type": "AggregateOffer",
              priceCurrency: "IDR",
              lowPrice: product.price_min,
              highPrice: product.price_max,
              offerCount: 1,
              availability,
              url: `${SITE_URL}/komoditas/${product.slug ?? slug}`,
              seller: { "@type": "Organization", name: product.supplier?.company_name ?? SITE_NAME },
              itemCondition: "https://schema.org/NewCondition",
            }
          : {
              "@type": "Offer",
              priceCurrency: "IDR",
              price: product.price_min,
              availability,
              url: `${SITE_URL}/komoditas/${product.slug ?? slug}`,
              seller: { "@type": "Organization", name: product.supplier?.company_name ?? SITE_NAME },
              itemCondition: "https://schema.org/NewCondition",
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
