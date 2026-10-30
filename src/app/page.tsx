/*
|-----------------------------------------
| setting up page.tsx for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, 1 November, 2026
|-----------------------------------------
*/

import type { Metadata, ResolvingMetadata } from "next";

import HomeQuery from "@/components/pages/home/Query";
import { PageBlocks } from "@/components/pages/PageBlocks";
import { PwaControls } from "@/components/pwa-controls";
import { getPublishedPageSeoMetadata } from "@/lib/pages/seo-metadata";
import { getPublishedPage } from "@/lib/pages/server";
import { getPublicProductsByReferences, type PublicProductReference } from "@/lib/products/server";
import type { PageBlock } from "@/redux/features/dashboard/pages/pagesSlice";

function containerProductReferences(blocks: PageBlock[]): PublicProductReference[] {
  const references: PublicProductReference[] = [];
  for (const block of blocks) {
    if (block.type !== "container") continue;
    let data: unknown = block.data;
    if (typeof data === "string") {
      try {
        data = JSON.parse(data);
      } catch {
        continue;
      }
    }
    if (!data || typeof data !== "object" || Array.isArray(data)) continue;
    const templates = (data as { templates?: unknown }).templates;
    if (!Array.isArray(templates)) continue;
    for (const value of templates) {
      if (!value || typeof value !== "object") continue;
      const template = value as { sourceProductId?: unknown; productUID?: unknown; visible?: unknown };
      if (template.visible === false) continue;
      const id = typeof template.sourceProductId === "string" ? template.sourceProductId.trim() : "";
      const sku = typeof template.productUID === "string" ? template.productUID.trim() : "";
      if (id || sku) references.push({ ...(id ? { id } : {}), ...(sku ? { sku } : {}) });
    }
  }
  return references;
}

export async function generateMetadata(_props: object, parent: ResolvingMetadata): Promise<Metadata> {
  const page = await getPublishedPage("/");
  return page ? getPublishedPageSeoMetadata(page, parent) : {};
}

export default async function Home() {
  const page = await getPublishedPage("/");
  if (page) {
    const products = await getPublicProductsByReferences(containerProductReferences(page.blocks));
    return (
      <main className="flex-1">
        <PageBlocks blocks={page.blocks} pageId={page.id} products={products} />
      </main>
    );
  }

  return (
    <main className="flex-1">
      <HomeQuery />
      <PwaControls />
    </main>
  );
}
