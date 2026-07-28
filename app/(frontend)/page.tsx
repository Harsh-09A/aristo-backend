import BlogsListings from "@/components/frontend/blogs/BlogsListings";
import CallToActions from "@/components/frontend/common/cta/CallToActions";
import Developers from "@/components/frontend/common/developers/Developers";
import SectionHeading from "@/components/frontend/common/sections/SectionHeading";
import DeveloperListings from "@/components/frontend/developer/listing/DeveloperListings";
import Hero from "@/components/frontend/home/hero/Hero";
import PricesCard from "@/components/frontend/home/prices/PricesCard";
import WhyChooseUs from "@/components/frontend/home/why-choose/WhyChooseUs";
import LocationListings from "@/components/frontend/location/LocationListings";
import FeaturedListings from "@/components/frontend/property/listing/FeaturedListings";
import TopListings from "@/components/frontend/property/listing/TopListings";
import ReelsSection4 from "@/components/frontend/temporary/ReelsSection4";
import TestimonialListings from "@/components/frontend/testimonial/TestimonialListings";
import Link from "next/link";

export const dynamic = "force-dynamic";

const Home = async () => {
  return (
    <>
      {/* Home Banner Style V1 */}
      <section
        className="home-banner-style1 p0"
        style={{
          backgroundImage:
            "url(/assets/images/banners/navi-mumbai-bg-600.jpeg)",
        }}
      >
        <div className="home-style1">
          <div className="container">
            <div className="row">
              <div className="col-xl-11 mx-auto">
                <Hero />
              </div>
            </div>
          </div>
          {/* End .container */}
        </div>
      </section>
      {/* End Home Banner Style V1 */}

      {/* Our Developers */}
      <section className="mb-0 pb-0">
        <div className="container">
          <div className="row align-items-center" data-aos="fade-up">
            <div className="col-lg-9 mb-4 ">
              <SectionHeading
                heading={"Developers"}
                title={"Our Top"}
                highlight={"Developers"}
                subtitle={"Lorem ipsum dolor sit, amet consectetur"}
              />
            </div>
            <div className="col-lg-3">
              <div className="text-start text-lg-end mb-3">
                <Link className="ud-btn2" href="/developers">
                  See All Developers
                  <i className="fal fa-arrow-right-long" />
                </Link>
              </div>
            </div>
          </div>
          {/* End header */}

          <div className="row">
            <div className="col-lg-12" data-aos="fade-up" data-aos-delay="200">
              <div className="">
                {/* <Developers /> */}
                <DeveloperListings />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Our Partners */}

      {/* Explore By Prices */}
      <section className="pb-0">
        <div className="container">
          <div className="row wow fadeInUp" data-wow-delay="00ms">
            <div className="col-lg-12 mb-4" data-aos="fade-up">
              <SectionHeading
                heading={"Budgets"}
                title={"Explore By"}
                highlight={"Prices"}
                subtitle={"Lorem ipsum dolor sit, amet consectetur"}
              />
            </div>
          </div>
          <div className="row" data-aos="fade-up" data-aos-delay="100">
            <PricesCard />
          </div>
        </div>
      </section>
      {/* End Explore By Prices */}

      {/* Featured Listings */}
      <section className="bgc-f7 py">
        <div className="container">
          <div className="row align-items-center" data-aos="fade-up">
            <div className="col-lg-9 mb-4 ">
              <SectionHeading
                heading={"Latest Properties"}
                title={"Discover Our"}
                highlight={"Latest Properties"}
                subtitle={"Lorem ipsum dolor sit, amet consectetur"}
              />
            </div>
            <div className="col-lg-3">
              <div className="text-start text-lg-end mb-3">
                <Link className="ud-btn2" href="/listings">
                  See All Properties
                  <i className="fal fa-arrow-right-long" />
                </Link>
              </div>
            </div>
          </div>
          {/* End header */}

          <div className="row">
            <div className="col-lg-12" data-aos="fade-up" data-aos-delay="200">
              <div className="">
                <FeaturedListings />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Featured Listings */}

      {/* Reels Section */}
      <ReelsSection4 />
      {/* End Reels Section */}

      {/* Top Listings */}
      <section className="bgc-f7">
        <div className="container">
          <div className="row align-items-center" data-aos="fade-up">
            <div className="col-lg-9 mb-4 ">
              <SectionHeading
                heading={"Top Properties"}
                title={"Discover Our"}
                highlight={"Top Properties"}
                subtitle={"Lorem ipsum dolor sit, amet consectetur"}
              />
            </div>
            <div className="col-lg-3">
              <div className="text-start text-lg-end mb-3">
                <Link className="ud-btn2" href="/listings">
                  See All Properties
                  <i className="fal fa-arrow-right-long" />
                </Link>
              </div>
            </div>
          </div>
          {/* End header */}

          <div className="row">
            <div className="col-lg-12" data-aos="fade-up" data-aos-delay="200">
              <div className="feature-listing-slider">
                <TopListings />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Featured Listings */}

      {/* Explore Locations */}
      <section className="pb40-md">
        <div className="container">
          <div
            className="row align-items-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="col-lg-9 mb-4">
              <SectionHeading
                heading={"Top Locations"}
                title={"Discover Our"}
                highlight={"Top Locations"}
                subtitle={"Lorem ipsum dolor sit, amet consectetur"}
              />
            </div>
            {/* End col-lg-9 */}

            <div className="col-lg-3">
              <div className="text-start text-lg-end mb-3">
                <Link className="ud-btn2" href="/locations">
                  See All Locations
                  <i className="fal fa-arrow-right-long" />
                </Link>
              </div>
            </div>
            {/* End col-lg-3 */}
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-lg-12" data-aos="fade-up" data-aos-delay="300">
              <div className="property-city-slider position-relative">
                <LocationListings />
              </div>
            </div>
            <div
              className="col-lg-12 mt-2 pt-2 text-center"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <Link
                className="ud-btn btn-white2"
                href={`/locations/map`}
                style={{ fontSize: "16px", fontWeight: 600, width: "max-content" }}
              >
                View Locations On Map
              </Link>
            </div>
          </div>
          {/* End .row */}
        </div>
      </section>
      {/* End Explore Locations */}

      {/* <!-- Why Choose Us --> */}
      <section>
        <div className="container">
          <div
            className="row align-items-md-center"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            <WhyChooseUs />
          </div>
        </div>
      </section>
      {/*  <!-- End Why Choose Us --> */}

      {/* Our Testimonials */}
      <section className="pb50-md bgc-thm-light">
        <div className="container">
          <div className="row  justify-content-between align-items-center">
            <div className="col-auto mb-4">
              <SectionHeading
                heading={"Reviews"}
                title={"What Our Customers Say About"}
                highlight={"Aristo"}
                subtitle={"Lorem ipsum dolor sit, amet consectetur"}
              />
            </div>
            {/* End header */}
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-lg-12">
              <div
                className="testimonial-slider"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <TestimonialListings />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Our Testimonials */}

      {/* Explore Blog */}
      <section className="pb90 pb20-md">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-4" data-aos="fade-up">
              <SectionHeading
                heading={"Blog"}
                title={"Aristo"}
                highlight={"Blog"}
                subtitle={"Lorem ipsum dolor sit, amet consectetur"}
              />
            </div>
          </div>
          {/* End .row */}

          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <BlogsListings />
          </div>
          {/* End .row */}
        </div>
      </section>
      {/* Explore Blog */}

      {/* Our CTA */}
      <CallToActions />
      {/* Our CTA */}
    </>
  );
};

export default Home;
