import { Project } from "@/types/property";
import { formatIndianPrice } from "@/utils/helper-functions";

interface Props {
  data: Project;
}

const PropertyHeader = ({ data }: Props) => {
  return (
    <>
      <div className="col-lg-8">
        <div className="single-property-content mb30-md d-flex gap-3">
          <h2 className="sp-lg-title">{data.title}</h2>
          <div className="pd-meta d-md-flex align-items-center">
            <p className="text fz15 mb-0 bdrl1 pl10 bdrln-sm">
              {data.location.name}
            </p>
          </div>
        </div>
      </div>
      {/* End .col-lg--8 */}

      <div className="col-lg-4">
        <div className="single-property-content">
          <div className="property-action text-lg-end">
            {/* <h3 className="price mb-0">₹ {formatIndianPrice(data.price || 0) }</h3> */}
            <h3 className="price mb-0">Contact For Price</h3>
          </div>
        </div>
      </div>
      {/* End .col-lg--4 */}
    </>
  );
};

export default PropertyHeader;
