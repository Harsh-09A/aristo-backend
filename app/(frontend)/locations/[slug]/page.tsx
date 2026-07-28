// app/location/[slug]/page.tsx

import { notFound } from "next/navigation";
import {
  getLocationBySlug,
  getLocationProjects,
} from "@/services/location-service";
import LocationSinglePage from "@/components/frontend/location/LocationSinglePage";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const location = await getLocationBySlug(slug);

  return {
    title: location ? `${location.name} | Locations` : "Location Not Found",
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = await searchParams;

  const currentPage = Math.max(1, Number(sp.page) || 1);

  const location = await getLocationBySlug(slug);
  if (!location) {
    notFound();
  }

  const { projects, totalPages } = await getLocationProjects(
    location.id,
    currentPage,
  );

  return (
    <LocationSinglePage
      location={location}
      projects={projects}
      currentPage={currentPage}
      totalPages={totalPages}
      searchParams={sp}
    />
  );
}
