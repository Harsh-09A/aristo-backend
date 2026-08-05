// components/frontend/agent/cards/AgentCard.tsx

import Image from "next/image";
import Link from "next/link";
import PropertyActions from "../../single-property/single-property-hero/PropertyActions";


const SidebarCard = () => {
  // const { name, slug, photo, specialization, phone } = agent;
  const name = "Aristo Real Estate Consultants";
  const photo = "/assets/images/logo/aristo-logo.png";
  const specialization = "Navi Mumbai Property Expert";
  const phone = "+919130307464";

  return (
    <div className="agency-style1 p15 bdrs12 bdr1 mb30">
      <div className="agency-img">
        <div
          style={{
            position: "relative",
            width: "200px",
            height: "150px",
            // borderRadius: "50%",
            // overflow: "hidden",
            margin: "0 auto",
          }}
        >
          <Image
            fill
            src={photo || "/assets/images/logo/aristo-logo.png"}
            alt={name}
            style={{ objectFit: "contain" }}
          />
        </div>
        {/* <div className="tag">{`${_count.projects || ""} Properties`}</div> */}
      </div>
      <div className="agency-details pt20">
        <h5 className="agency-title mb-1 text-center">{name}</h5>
        {specialization && (
          <p className="text text-center mb-0">{specialization}</p>
        )}

        <div className="d-grid pt10">
          <PropertyActions phone={phone} />
        </div>
      </div>
    </div>
  );
};

export default SidebarCard;
