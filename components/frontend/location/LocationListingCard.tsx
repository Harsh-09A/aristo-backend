import Image from "next/image";
import Link from "next/link";
import { Location } from "@/types/property";

export interface LocationWithCount extends Location {
  _count: {
    projects: number;
  };
}
interface LocationListingCardProps {
  location: LocationWithCount;
}

const LocationListingCard = ({ location }: LocationListingCardProps) => {
  return (
    <>
      <div className="item">
        <div className="feature-style1">
          <div className="position-relative overflow-hidden rounded">
            <div
              style={{
                width: "400px",
                height: "400px",
              }}
            >
              <Image
                src={
                  location.image ||
                  "/assets/images/placeholder/placeholder-image.jpg"
                }
                alt="image"
                fill
                sizes="250px"
                quality={100}
                className="object-fit-cover"
              />
            </div>
          </div>
          <div className="feature-content">
            <div className="top-area">
              <h6 className="title mb-1">{location.name}</h6>
              <p className="text">{location._count.projects} Properties</p>
            </div>
            <div className="bottom-area">
              <Link
                className="ud-btn2"
                href={`/listings?location=${location.slug}`}
              >
                See All Projects
                <i className="fal fa-arrow-right-long" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationListingCard;
