import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/property";
import PropertyActions from "./single-property-hero/PropertyActions";
import AgentListingsSlider from "../agent/listing/AgentListingsSlider";

interface Props {
  data: Project;
}

const PropertyDeveloper = ({ data }: Props) => {
  return (
    <>
      <div className="agent-single d-sm-flex align-items-center pb25">
        <div className="single-img mb30-sm">
          <Image
            width={90}
            height={90}
            className="w90"
            src={data.developer.logo || "/assets/images/placeholder/placeholder-image.jpg"}
            alt="avatar"
          />
        </div>
        <div className="single-contant ml20 ml0-xs">
          <h6 className="title mb-1">{data.developer.name}</h6>
          {/* <div className="agent-meta mb10 d-md-flex align-items-center">
            <a className="text fz15" href="#">
              <i className="flaticon-call pe-1" />
              +91 0123456789
            </a>
          </div> */}
          <Link
            href="/"
            className="text-decoration-underline fw600"
          >
            View Listings
          </Link>
        </div>
      </div>
      {/* End agent-single */}

      <div>
        <p>
         {data.developer.description || "No Description"}
        </p>
      </div>

      <AgentListingsSlider agents={data.agents} />
      <PropertyActions/>


    </>
  );
};

export default PropertyDeveloper;
