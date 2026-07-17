import SectionHeading from "@/components/frontend/common/sections/SectionHeading";
import SimilarListings from "@/components/frontend/property/listing/SimilarListings";
import PropertyAddress from "@/components/frontend/single-property/PropertyAddress";
import PropertyAgents from "@/components/frontend/single-property/PropertyAgents";
import PropertyAmenities from "@/components/frontend/single-property/PropertyAmenities";
import PropertyDescription from "@/components/frontend/single-property/PropertyDescription";
import PropertyDetails from "@/components/frontend/single-property/PropertyDetails";
import PropertyDeveloper from "@/components/frontend/single-property/PropertyDeveloper";
import PropertyFloorPlans from "@/components/frontend/single-property/PropertyFloorPlans";
import PropertyHeader from "@/components/frontend/single-property/PropertyHeader";
import PropertyHero from "@/components/frontend/single-property/PropertyHero";
import { getPropertyBySlug } from "@/services/property-service";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};
const PropertySinglePage = async ({ params }: Props) => {
  const { slug } = await params;

  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  return (
    <>
      {/* Property All Single V1 */}
      <section className="pt30 pb90 bgc-f7">
        <div className="container">
          <div className="row">
            <PropertyHeader data={property} />
          </div>
          {/* End .row */}

          <div className="row mb30 mt30">
            <PropertyHero data={property} />
          </div>
        </div>

        <div className="container pt-5 mt-4">
          <div className="row">
            <div className="col-lg-8">
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Property Description</h4>
                <PropertyDescription data={property} />
                {/* End property description */}

                <h4 className="title fz17  mt50">Property Details</h4>
                <div className="row">
                  <PropertyDetails data={property} />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30 mt30">Location</h4>
                <div className="row">
                  <PropertyAddress data={property} />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Amenities</h4>
                <div className="row">
                  <PropertyAmenities data={property} />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Floor Plans</h4>
                <div className="row">
                  <PropertyFloorPlans data={property} />
                </div>
              </div>
              {/* End .ps-widget */}

              {/* <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 ">
                <h4 className="title fz17 mb30">Video</h4>
                <div className="row">
                  <PropertyVideo />
                </div>
              </div> */}
              {/* End .ps-widget */}
            </div>
            {/* End .col-8 */}

            <div className="col-lg-4 ">
              <div className=" sticky-top" style={{ top: "20px" }}>
                <div className="agen-personal-info position-relative bgc-white default-box-shadow1 bdrs12 p30 mt30">
                  <div className="widget-wrapper mb-0">
                    <h6 className="title fz17 mb30">Developer Information</h6>
                    <PropertyDeveloper data={property} />
                  </div>
                </div>

                {/* Naya Agents Swiper widget, same style */}
                {/* <PropertyAgents data={property} /> */}
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row mt30 align-items-center justify-content-between">
            <div className="col-auto">
              {/* <div className="main-title">
                <h2 className="title">Discover Our Featured Listings</h2>
                <p className="paragraph">
                  Aliquam lacinia diam quis lacus euismod
                </p>
              </div> */}

              <SectionHeading
                heading={"Similar Properties"}
                title={"View"}
                highlight={"Similar Properties"}
                subtitle={"Lorem ipsum dolor sit, amet consectetur"}
              />
            </div>
            {/* End header */}
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-lg-12">
              <div className="property-city-slider">
                <SimilarListings data={property} />
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
      </section>
      {/* End Property All Single V1  */}
    </>
  );
};

export default PropertySinglePage;
