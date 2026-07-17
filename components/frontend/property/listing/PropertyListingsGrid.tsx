import { Project } from "@/types/property";
import PropertyCardGrid from "../cards/PropertyCardGrid";

type Props = {
  listings: Project[];
};

const PropertyListingsGrid = ({ listings }: Props) => {
  return (
    // Yeh row wapas zaroori hai — Bootstrap ke col-* classes
    // sirf ek .row (flex container) ke andar hi side-by-side lagti hain
    <div className="row mt15">
      {listings.map((listing) => (
        <div
          className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4"
          key={listing.id}
        >
          <PropertyCardGrid listing={listing} />
        </div>
      ))}
    </div>
  );
};

export default PropertyListingsGrid;