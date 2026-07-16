import Image from "next/image";
// import { Property } from "@/types/property";
import { formatIndianPrice } from "@/utils/helper-functions";
import Link from "next/link";
import { formatIndianDate } from "@/utils/helper-functions";

type Props = {
  listing: any;
};

const PropertyCardFeatured = ({ listing }: Props) => {
  return (
    <>
      <div className="item">
        <div className="listing-style1">
          <div className="list-thumb ">
            <div className="position-relative overflow-hidden rounded">
              <div
                style={{
                  width: "250px",
                  height: "250px",
                }}
              >
                <Image
                  src={listing.images[0] || "/assets/images/placeholder/placeholder-image.jpg"}
                  alt={listing.title}
                  fill
                  sizes="250px"
                  className="object-fit-cover"
                />
              </div>
            </div>

            {/* <div className="sale-sticker-wrap">
              {!listing.tags && (
                <div className="list-tag fz12">
                  <span className="flaticon-electricity me-2" />
                  FEATURED
                  {listing.tags[0]}
                </div>
              )}
            </div> */}

            <div className="list-price">
              {formatIndianPrice(listing.price) || "N/A"}
              {/* / <span>mo</span> */}
            </div>
          </div>
          <div className="list-content">
            <h6 className="list-title property-title">
              <Link href={`/property/${listing.slug}`}>{listing.title || "N/A"}</Link>
            </h6>
            <p className="list-text color-primary">
              <span className="location-icon">📍</span>
              {listing.location.name || "N/A"}
            </p>

            {/* <!-- Specs --> */}
            <div className="top-specs-grid">
              <div className="top-specs-item">
                <div className="top-specs-value">
                  <span className="flaticon-bed top-specs-icon" />
                  {listing.configurations
                    .map((config: any) => config.value)
                    .join(", ") || "N/A"}{" "}
                    
                  {listing.configurationUnit}
                </div>
              </div>
              <div className="top-specs-item">
                <div className="top-specs-value text-capitalize">
                  <span className="flaticon-home top-specs-icon" />
                  {listing.type || "N/A"}
                </div>
              </div>
              <div className="top-specs-item">
                <div className="top-specs-value">
                  <span className="flaticon-protection top-specs-icon" />
                  {listing.reraNumber || "N/A"}
                </div>
              </div>
              <div className="top-specs-item">
                <div className="top-specs-value">
                  <span className="flaticon-event top-specs-icon" />
                  {formatIndianDate(listing.possessionDate) || "N/A"}
                </div>
              </div>
            </div>

            {/* <!-- Developer --> */}

            {/* <hr className="mt-2 mb-2" /> */}

            <div className="developer-row">
              <div className="developer-logo">
                {/* <!-- Placeholder logo using initials --> */}
                <Image
                  width={40}
                  height={40}
                  src={listing.developer.logo || "/assets/images/placeholder/placeholder-image.jpg"}
                  alt={listing.developer.name}
                />
              </div>
              <div>
                <div className="developer-name">
                  {listing.developer.name}
                </div>
                <div className="developer-tag">Developer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyCardFeatured;
