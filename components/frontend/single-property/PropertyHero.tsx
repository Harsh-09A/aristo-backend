import { Project } from "@/types/property";

import PropertySlider from "./single-property-hero/PropertySlider";
import PropertyOverview from "./single-property-hero/PropertyOverview";
import PropertyActions from "./single-property-hero/PropertyActions";

interface Props {
  data: Project;
}

const PropertyHero = ({ data }: Props) => {
  const phone = "+919130307464";
  return (
    <>
      <section className="property-hero py-0">
        <div className="row">
          <div className="col-lg-6 col-sm-6">
            <PropertySlider images={data.images} />
          </div>

          <div className="col-lg-6 col-sm-6">
            {/* OVERVIEW */}
            <PropertyOverview data={data} />

            {/* ACTIONS */}
            <PropertyActions phone={phone} />
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyHero;
