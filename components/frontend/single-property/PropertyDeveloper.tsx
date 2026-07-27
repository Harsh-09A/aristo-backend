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
      <AgentListingsSlider agents={data.agents} />

      <h6 className="title fz16">DEVELOPED BY</h6>
      <div className="agent-single d-sm-flex align-items-center justify-content-between pb25">
        <div className="single-contant ml0-xs">
          <h6 className="title mb-1">{data.developer.name}</h6>
          {/* <div className="agent-meta mb10 d-md-flex align-items-center">
            <a className="text fz15" href="#">
              <i className="flaticon-call pe-1" />
              +91 0123456789
            </a>
          </div> */}
          <Link
            href={`/developer/${data.developer.slug}`}
            className="text-decoration-underline fw600"
          >
            View Listings
          </Link>
        </div>
        <div className="single-img mb30-sm">
          <Image
            width={120}
            height={90}
            className=""
            src={
              data.developer.logo ||
              "/assets/images/placeholder/placeholder-image.jpg"
            }
            alt="avatar"
          />
        </div>
      </div>
      {/* End agent-single */}

      {/* <div>
        <p>{data.developer.description || "No Description"}</p>
      </div> */}
    </>
  );
};

export default PropertyDeveloper;
