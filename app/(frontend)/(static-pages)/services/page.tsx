import SectionHeading from "@/components/frontend/common/sections/SectionHeading";
import Link from "next/link";
import Image from "next/image";

// Har service ke liye ek Bootstrap Icon class + short description.
// About page mein sirf title tha, yahan thoda zyada detail diya hai
// taaki cards khaali na lagein.
const servicesList = [
  {
    icon: "bi-building",
    title: "Buying & Selling of Commercial Properties",
    desc: "End-to-end support for office spaces, retail units and commercial land deals.",
  },
  {
    icon: "bi-house-door",
    title: "Buying & Selling of Residential Properties",
    desc: "From first homes to premium apartments, we guide you through every step.",
  },
  {
    icon: "bi-key",
    title: "Accommodation Services",
    desc: "Finding the right rental or accommodation that fits your budget and needs.",
  },
  {
    icon: "bi-graph-up-arrow",
    title: "Real Estate Investment",
    desc: "Data-backed guidance to help you invest in properties with strong returns.",
  },
  {
    icon: "bi-file-earmark-text",
    title: "Leasing",
    desc: "Hassle-free leasing solutions for both property owners and tenants.",
  },
  {
    icon: "bi-cash-coin",
    title: "Financing",
    desc: "Assistance in arranging financing options for your property purchase.",
  },
  {
    icon: "bi-award",
    title: "Sole Selling Rights of Projects",
    desc: "Dedicated, exclusive selling partnership for developers and project owners.",
  },
];

// Simple 3-step "how we work" list — naya section jo about page mein nahi tha
const processSteps = [
  {
    step: "01",
    title: "Understand Your Needs",
    desc: "We start with a detailed conversation to understand what you're looking for.",
  },
  {
    step: "02",
    title: "Curated Recommendations",
    desc: "Based on your requirement, we shortlist the best-fit properties or services.",
  },
  {
    step: "03",
    title: "Smooth Closure",
    desc: "From negotiation to paperwork, we handle everything till the deal closes.",
  },
];

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
                <h2 className="title text-white">Our Services</h2>
                <div className="breadcumb-list">
                  <a href="#">Home</a>
                  <a href="#">Services</a>
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
          <div
            className="row justify-content-center text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="col-lg-8">
              <SectionHeading
                heading={"Services"}
                title={"What We "}
                highlight={"Offer"}
                subtitle={""}
              />
              <p className="text">
                With versatile knowledge of the real estate industry, we provide
                unparalleled consultancy services for sale, purchase, ownership,
                leasing and related services for residential, commercial and
                industrial landscape. Our core competence is efficient and value
                added client servicing.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* End Intro Area */}

      {/* Services Grid Area — icon based cards, 3 per row on large screens */}
      <section className="services-grid pt-0">
        <div className="container">
          <div className="row">
            {servicesList.map((service, index) => (
              <div
                className="col-md-6 col-lg-4 mb30"
                key={service.title}
                data-aos="fade-up"
                data-aos-delay={100 * (index + 1)}
              >
                <div className="service-card h-100 p-4 border rounded-3 text-center">
                  <div
                    className="service-icon d-inline-flex align-items-center justify-content-center mb-3 rounded-circle"
                    style={{
                      width: "70px",
                      height: "70px",
                      backgroundColor: "rgba(218, 37, 28, 0.08)", // light tint of brand color
                    }}
                  >
                    <i
                      className={`bi ${service.icon}`}
                      style={{ fontSize: "1.75rem", color: "#da251c" }}
                    />
                  </div>
                  <h5 className="title mb-2">{service.title}</h5>
                  <p className="text mb-0">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* End Services Grid Area */}

      {/* Process Area — naya section, "how we work" style timeline */}
      <section
        className="services-process pb90 pt90"
        style={{ backgroundColor: "#f7f8f6" }}
      >
        <div className="container">
          <div className="row mb40 justify-content-center text-center">
            <div className="col-lg-7">
              <SectionHeading
                heading={"Our Process"}
                title={"How We "}
                highlight={"Work"}
                subtitle={""}
              />
              <p className="text">
                A simple, transparent process from first call to final deal.
              </p>
            </div>
          </div>

          <div className="row">
            {processSteps.map((item, index) => (
              <div
                className="col-md-4 mb30"
                key={item.step}
                data-aos="fade-up"
                data-aos-delay={100 * (index + 1)}
              >
                <div className="text-center px-3">
                  <h2
                    className="fw-bold mb-3"
                    style={{ color: "#da251c", opacity: 0.25 }}
                  >
                    {item.step}
                  </h2>
                  <h5 className="title mb-2">{item.title}</h5>
                  <p className="text mb-0">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* End Process Area */}

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
