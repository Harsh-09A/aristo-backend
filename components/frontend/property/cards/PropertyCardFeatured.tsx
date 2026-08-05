import Image from "next/image";
// import { Property } from "@/types/property";
import { formatIndianPrice, getConfigData } from "@/utils/helper-functions";
import Link from "next/link";
import { formatIndianDate } from "@/utils/helper-functions";

type Props = {
  listing: any;
};

const PropertyCardFeatured = ({ listing }: Props) => {
  return (
    <>
      <div className="featured-property-card">
        <div className="row g-0">
          {/* <!-- Image Column --> */}
          <div className="col-12 col-sm-5 card-image-col">
            <div className="card-img-wrapper">
              <Image
                width={600}
                height={600}
                src={
                  listing.images[0] ||
                  "/assets/images/placeholder/placeholder-image.jpg"
                }
                alt={listing.title}
              />
              {listing.tags && listing.tags[0] && (
                <span className="img-badge">{listing.tags[0]}</span>
              )}
            </div>
          </div>
          {/* <!-- Content Column --> */}
          <div className="col-12 col-sm-7 card-content-col">
            {/* <!-- Title + Price --> */}
            <div>
              <div className="card-header-row">
                <Link href={`/property/${listing.slug}`}>
                  <h2 className="property-title">{listing.title}</h2>
                </Link>
                <span
                  className="price-badge"
                  data-bs-toggle="modal"
                  data-bs-target="#contactModal"
                >
                  {/* {formatIndianPrice(listing.price)} */}
                  Contact For Price
                </span>
              </div>

              {/* <!-- Location --> */}
              <div className="location-row">
                <span className="location-icon">📍</span>
                {listing.location.name}
              </div>

              {/* <!-- Specs --> */}
              <div className="specs-grid">
                <div className="spec-item">
                  <div className="spec-label">Configuration</div>
                  <div className="spec-value">
                    {/* {listing.configurations
                      .map((config: any) => config.value)
                      .join(", ")}{" "}
                    {listing.configurationUnit} */}
                    {getConfigData(listing)}
                  </div>
                </div>
                <div className="spec-item">
                  <div className="spec-label">Possession</div>
                  <div className="spec-value">
                    {formatIndianDate(listing.possessionDate)}{" "}
                  </div>
                </div>
                <div className="spec-item">
                  <div className="spec-label">Property Type</div>
                  <div className="spec-value text-capitalize">
                    {listing.type}{" "}
                  </div>
                </div>
                <div className="spec-item">
                  <div className="spec-label">RERA Number</div>
                  <div className="spec-value">{listing.reraNumber}</div>
                </div>
              </div>
            </div>

            {/* <!-- Developer --> */}
            <div>
              <hr className="card-divider" />
              <div className="developer-row">
                <div className="developer-logo">
                  {/* <!-- Placeholder logo using initials --> */}
                  <Image
                    width={40}
                    height={40}
                    src={
                      listing.developer.logo ||
                      "/assets/images/placeholder/placeholder-image.jpg"
                    }
                    alt={listing.developer.name}
                  />
                </div>
                <div>
                  <div className="developer-name">{listing.developer.name}</div>
                  <div className="developer-tag">Developer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyCardFeatured;
