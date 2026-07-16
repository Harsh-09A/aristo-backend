import { Project } from "@/types/property";
import PropertyCardListings from "../cards/PropertyCardFeatured";
type Props = {
  listings: Project[];
};

const PropertyListings = ({ listings }: Props) => {
  return (
    <>
      {listings.map((listing) => (
        <div className="row mt15" key={listing.id}>
          <PropertyCardListings listing={listing} />
        </div>
      ))}
    </>
  );
};

export default PropertyListings;
