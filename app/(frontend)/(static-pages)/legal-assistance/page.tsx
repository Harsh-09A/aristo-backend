import SectionHeading from "@/components/frontend/common/sections/SectionHeading";
import Link from "next/link";
import Image from "next/image";
import ContactPageForm from "@/components/frontend/static-pages/contact/ContactPageForm";

const ServicesPage = () => {
  return (
    <>
      {/* Breadcrumb Section */}
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
                <h2 className="title text-white">Legal Assistance</h2>
                <div className="breadcumb-list text-white fs-5">
                  <a href="#" className="text-white">
                    Home
                  </a>
                  <a href="#" className="text-white">
                    Legal Assistance
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcrumb Section */}

      {/* Intro Area — centered text, no image (different from About page's 2-column layout) */}
      <section className="services-intro pt40 pb60">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <div className="col-lg-6">
              {/* <h2>
                      We&apos;re on a Mission to Change{" "}
                      <br className="d-none d-lg-block" /> View of Real Estate Field.
                    </h2> */}
              <SectionHeading
                heading={"Assistance"}
                title={"Legal  "}
                highlight={"Assistance"}
                subtitle={""}
              />
              <p className="text mb25">
                We offer a complete range of property related legal services
                that cover both residential and commercial properties. Using our
                20 years experience in the real estate industry, our legal team
                is always in a strong position to provide legal advice regarding
                infrastructural and building projects, solving dispute and any
                documents related problems.
              </p>
              <p className="text mb55">
                You can feel free to talk to our legal consultant anytime and
                get legal advice on property matters of purchase/lease,
                taxation, legal disputes etc.
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
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Intro Area */}

      {/* Intro Area — centered text, no image (different from About page's 2-column layout) */}
      <section className="services-intro pt40 pb60">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <div className="col-lg-12">
              <SectionHeading
                heading={"Get In Touch"}
                title={"Send Us a "}
                highlight={"Message"}
                subtitle={
                  "Fill the form and our team will reach out to you shortly"
                }
              />
              <ContactPageForm />
            </div>
          </div>
        </div>
      </section>
      {/* End Intro Area */}

      {/* CTA Banner — naya section, image background ke saath call-to-action */}
      <section
        className="services-cta position-relative"
        style={{
          backgroundImage: 'url("/assets/images/home/aristo-why-choose.jpeg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* dark overlay taaki white text readable rahe */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
        />
        <div className="container position-relative py-5">
          <div className="row justify-content-center text-center py-4">
            <div className="col-lg-8">
              <h3 className="text-white mb-3">
                Looking for the right property consultancy?
              </h3>
              <p className="text-white-50 mb-4">
                Get in touch with our team and let us help you find the best
                real estate solution tailored to your needs.
              </p>
              <Link
                href="/contact"
                className="btn btn-light px-4 py-2 fw-semibold"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* End CTA Banner */}
    </>
  );
};

export default ServicesPage;
