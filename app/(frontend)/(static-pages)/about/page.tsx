import SectionHeading from "@/components/frontend/common/sections/SectionHeading";
import Features from "@/components/frontend/home/why-choose/Features";
import Mission from "@/components/frontend/static-pages/about/Mission";
import Image from "next/image";

const AboutPage = () => {
  return (
    <>
      {/* Breadcrumb Sections */}
      <section
        className="breadcumb-section2 p-0"
        style={{
          backgroundImage: 'url("/assets/images/innerpages/about-bg.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title text-white">About Us</h2>
                <div className="breadcumb-list ">
                  <a href="#">Home</a>
                  <a href="#">About</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcrumb Sections */}
      {/* Our About Area */}
      <section className="our-about pb90">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <div className="col-lg-6">
              {/* <h2>
                We&apos;re on a Mission to Change{" "}
                <br className="d-none d-lg-block" /> View of Real Estate Field.
              </h2> */}
              <SectionHeading
                heading={"About"}
                title={"About "}
                highlight={"Aristo"}
                subtitle={""}
              />
              <p className="text mb25">
                Aristo Real Estate Consultants was established in the year 1999
                with an objective to provide professional property consultancy
                services to its clients in and around Navi Mumbai. We are widely
                regarded as the market leader for high quality commercial and
                residential property services. We’re passionate about property.
              </p>
              <p className="text mb55">
                We aim to be progressive in our thinking. And above all, we are
                professional in everything we do, which is why we are known as
                trusted property agency and consultancy in Navi Mumbai. Besides,
                the company provides in-depth analysis, to-the-point assessment
                and special guidance to its clients, who intend to invest in the
                real estate business.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="position-relative mb30-md">
                <Image
                  width={600}
                  height={400}
                  priority
                  className="cover"
                  src={"/assets/images/home/aristo-why-choose.jpeg"}
                  alt="why chosse"
                />
                {/* <Link href="/">
                        <div className="iconbox-style5 d-flex align-items-center">
                          <span className="icon flaticon-home flex-shrink-0" />
                          <div className="iconbox-content flex-shrink-1 ms-2">
                            <p className="text mb-0">Total Units</p>
                            <h4 className="title mb-0">5000+</h4>
                          </div>
                        </div>
                      </Link> */}
              </div>
            </div>
            <div className="row mt-4 pt-2">
              <Mission />
            </div>
          </div>
        </div>
      </section>
      {/* End Our About Area */}

      {/* ============= */}
      {/* <!-- Why Choose Us --> */}
      <section className="overx-hide">
        <div className="container">
          <div
            className="row align-items-md-center"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            <div className="col-md-6 col-lg-6">
              <div className="position-relative mb30-md">
                <Image
                  width={591}
                  height={685}
                  priority
                  className="w-100 h-100 cover"
                  src={"/assets/images/home/aristo-why-choose.jpeg"}
                  alt="why chosse"
                />
                {/* <Link href="/">
                        <div className="iconbox-style5 d-flex align-items-center">
                          <span className="icon flaticon-home flex-shrink-0" />
                          <div className="iconbox-content flex-shrink-1 ms-2">
                            <p className="text mb-0">Total Units</p>
                            <h4 className="title mb-0">5000+</h4>
                          </div>
                        </div>
                      </Link> */}
              </div>
            </div>
            {/* End .col-6 */}

            <div
              className="col-md-6 col-lg-5 offset-lg-1"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              <div className="main-title2">
                {/* <h2 className="title">Why Choose Us</h2>
                      <p className="paragraph fz15">
                        As the complexity of buildings to increase, the{" "}
                        <br className="d-none d-lg-block" />
                        field of architecture.
                      </p> */}

                <SectionHeading
                  heading={"Why Aristo"}
                  title={"Our "}
                  highlight={"Philosophy"}
                  subtitle={
                    "Experience trusted expertise and personalized real estate solutions."
                  }
                />
              </div>
              {/* End main-title2 */}

              <div className="why-chose-list">
                <Features />
              </div>
              {/* End .why-chose-list */}
            </div>
            {/* End .col-6 */}
          </div>
        </div>
      </section>
      {/*  <!-- End Why Choose Us --> */}
    </>
  );
};

export default AboutPage;
