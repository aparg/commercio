import { notFound } from "next/navigation";
import ListingListPage from "@/components/resale/ListingListPage";
import ListingDetailPage from "@/components/resale/ListingDetailPage";
import AlbertaListingDetailPage from "@/components/resale/AlbertaListingDetailPage";
import AlbertaFiltersWithSalesList from "@/components/resale/AlbertaFiltersWithSalesList";
import AlbertaListingListPage from "@/components/resale/AlbertaListingListPage";

export default async function DynamicPage({ params, searchParams }) {
  const slug = params.slug1;

  // Check if this is a property detail page
  if (slug.length >= 2 && slug[slug.length - 2] === "listings") {
    try {
      return <AlbertaListingDetailPage slug={slug} />;
    } catch (error) {
      console.error("Error in listing detail page:", error);
      notFound();
    }
  }

  // Handle regular listing pages
  try {
    return <AlbertaListingListPage slug={slug} searchParams={searchParams} />;
  } catch (error) {
    console.error("Error in listing list page:", error);
    notFound();
  }
}

export async function generateMetadata({ params, searchParams }) {
  const slug = params.slug1;

  if (slug.length >= 2 && slug[slug.length - 2] === "listings") {
    return AlbertaListingDetailPage.generateMetadata({ params, searchParams });
  }

  return AlbertaListingListPage.generateMetadata({ params, searchParams });
}
