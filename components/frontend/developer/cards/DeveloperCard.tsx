// components/frontend/developer/cards/DeveloperCard.tsx

import Image from "next/image";
import Link from "next/link";

type Props = {
  developer: {
    id: string;
    name: string;
    slug: string;
    logo: string | null;
    _count: { projects: number };
  };
};

const DeveloperCard = ({ developer }: Props) => {
  const { name, slug, logo, _count } = developer;

  return (
    <div className="agency-style1 p10 bdrs12 bdr1 mb30">
      <div className="agency-img">
        <div
          style={{
            position: "relative",
            width: "220px",
            height: "200px",
          }}
        >
          <Image
            fill
            sizes="220px" /* <-- Added sizes prop to fix performance warning */
            src={logo || "/assets/images/placeholder/placeholder-image.jpg"}
            alt={name}
            style={{ objectFit: "contain" }}
          />
        </div>
        {/* <div className="tag">{`${_count.projects} Properties`}</div> */}
      </div>
      <div className="agency-details pt10">
        <h6 className="agency-title mb-1 text-center">{name}</h6>

        <div className="d-grid pt10">
          {/* <Link href={`/agency-single/${agent.id}`} className="ud-btn btn-white2"> */}
          <Link href={`/developer/${slug}`} className="ud-btn btn-white2">
            View Listings
            <i className="fal fa-arrow-right-long" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeveloperCard;
