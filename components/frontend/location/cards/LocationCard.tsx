// components/frontend/location/cards/LocationCard.tsx

import Image from "next/image";
import Link from "next/link";

type Props = {
  location: {
    id: string;
    name: string;
    slug: string;
    image?: string | null; // ← field naam schema ke hisaab se badal do agar zaroorat ho
    _count?: { projects: number };
  };
};

const LocationCard = ({ location }: Props) => {
  const { name, slug, image, _count } = location;

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
            src={image || "/assets/images/placeholder/placeholder-image.jpg"}
            alt={name}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="tag">{`${_count?.projects ?? 0} Properties`}</div>
      </div>
      <div className="agency-details pt20">
        <h5 className="agency-title mb-1 text-center">{name}</h5>

        <div className="d-grid pt10">
          <Link href={`/locations/${slug}`} className="ud-btn btn-white2">
            View Listings
            <i className="fal fa-arrow-right-long" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;