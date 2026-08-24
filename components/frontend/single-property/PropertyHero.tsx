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
            {/* Left column apni natural height define karta hai (image + thumbnails) */}
            <div className="h-100 d-flex flex-column">
              <PropertySlider images={data.images} />
            </div>
          </div>

          <div className="col-lg-6 col-sm-6">
            {/* Right column: left column jitni height le lega (row stretch ki wajah se),
          ab isko andar se flex-column bana ke Overview ko grow karwao aur
          Actions ko bottom pe chipka do */}
            <div className="h-100 d-flex flex-column">
              <div className="flex-grow-1">
                <PropertyOverview data={data} />
              </div>

              <div className="mt-auto ">
                <PropertyActions phone={phone} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyHero;
