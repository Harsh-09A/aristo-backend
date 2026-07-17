// components/frontend/agent/cards/AgentCard.tsx

import Image from "next/image";
import Link from "next/link";

type Props = {
  agent: {
    id: string;
    name: string;
    slug: string;
    photo: string | null;
    specialization: string | null;
    _count: { projects: number };
  };
};

const AgentCard = ({ agent }: Props) => {
  const { name, slug, photo, specialization, _count } = agent;

  return (
    <div className="agency-style1 p30 bdrs12 bdr1 mb30">
      <div className="agency-img">
        <div
          style={{
            position: "relative",
            width: "220px",
            height: "220px",
            borderRadius: "50%",
            overflow: "hidden",
            margin: "0 auto",
          }}
        >
          <Image
            fill
            src={photo || "/assets/images/placeholder/placeholder-image.jpg"}
            alt={name}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="tag">{`${_count.projects} Properties`}</div>
      </div>
      <div className="agency-details pt20">
        <h5 className="agency-title mb-1 text-center">{name}</h5>
        {specialization && (
          <p className="text text-center mb-0">{specialization}</p>
        )}

        <div className="d-grid pt10">
          <Link href={`/agent/${slug}`} className="ud-btn btn-white2">
            View Listings
            <i className="fal fa-arrow-right-long" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
