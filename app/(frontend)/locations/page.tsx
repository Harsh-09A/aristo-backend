// app/location/page.tsx

import { getLocationsPaginated } from "@/services/location-service";
import LocationListingsGrid from "@/components/frontend/location/listing/LocationListingsGrid";
import Pagination from "@/components/frontend/common/pagination/Pagination";
import SectionHeading from "@/components/frontend/common/sections/SectionHeading";

export const metadata = {
  title: "All Locations",
};

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function LocationsPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const currentPage = Math.max(1, Number(sp.page) || 1);

  const { locations, totalPages } = await getLocationsPaginated(currentPage);

  return (
    <div className="container pt60 pb60">
      <SectionHeading
        heading={"Locations"}
        title={"All"}
        highlight={"Locations"}
        subtitle={"Explore properties across well-connected and desirable locations."}
      />

      {locations.length > 0 ? (
        <>
          <LocationListingsGrid locations={locations} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchParams={sp}
            basePath="/locations"
          />
        </>
      ) : (
        <p className="text mt30">No locations found.</p>
      )}
    </div>
  );
}