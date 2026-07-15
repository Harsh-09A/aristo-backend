import Developers from "@/components/frontend/common/developers/Developers";
import SectionHeading from "@/components/frontend/common/sections/SectionHeading";
import Hero from "@/components/frontend/home/hero/Hero";
import PricesCard from "@/components/frontend/home/prices/PricesCard";
import FeaturedListings from "@/components/frontend/property/listing/FeaturedListings";
import Link from "next/link";

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
      <section className="our-partners pb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-4" data-aos="fade-up">
              <SectionHeading
                heading={"Developers"}
                title={"Our Top"}
                highlight={"Developers"}
                subtitle={"Lorem ipsum dolor sit, amet consectetur"}
              />
            </div>
            <div className="col-lg-12 text-center">
              <div
                className="dots_none nav_none"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                {
                  /* <Partner /> */
                  <Developers />
                }
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
    </>
  );
};

export default Home;
