// components/frontend/location/listing/LocationListingsGrid.tsx

import LocationCard from "@/components/frontend/location/cards/LocationCard";
import type { getLocationsPaginated } from "@/services/location-service";

// getLocationsPaginated() { locations, totalPages } return karta hai,
// isliye sirf "locations" key ka type nikal rahe hain — poora object nahi.
type Locations = Awaited<ReturnType<typeof getLocationsPaginated>>["locations"];

type Props = {
  locations: Locations;
};

const LocationListingsGrid = ({ locations }: Props) => {
  return (
    <div className="row mt15">
      {locations.map((location) => (
        <div
          className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4"
          key={location.id}
        >
          <LocationCard location={location} />
        </div>
      ))}
    </div>
  );
};

export default LocationListingsGrid;