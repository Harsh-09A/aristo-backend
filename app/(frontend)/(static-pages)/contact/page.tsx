import SectionHeading from "@/components/frontend/common/sections/SectionHeading";
import ContactPageForm from "@/components/frontend/static-pages/contact/ContactPageForm";

const ContactPage = () => {
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
        {/* Brand-color overlay taaki breadcrumb bhi theme se match kare */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
        //   style={{ backgroundColor: "rgba(218, 37, 28, 0.55)" }}
        />
        <div className="container position-relative">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title text-white">Contact Us</h2>
                <div className="breadcumb-list">
                  <a href="#">Home</a>
                  <a href="#">Contact</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcrumb Section */}

      {/* Quick Info Cards — Phone / Address / Email, brand-colored icons */}
      <section className="contact-info-strip pt60 pb30">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb30" data-aos="fade-up" data-aos-delay="100">
              <div className="info-card h-100 p-4 rounded-4 text-center">
                <div className="info-icon mx-auto mb-3">
                  <i className="bi bi-telephone-fill" />
                </div>
                <h6 className="mb-2">Call Us</h6>
                <a href="tel:02227560408" className="d-block text-dark text-decoration-none">
                  022 2756 0408
                </a>
                <a href="tel:02227570408" className="d-block text-dark text-decoration-none">
                  022 2757 0408
                </a>
                <a
                  href="tel:+919130307464"
                  className="d-block text-dark text-decoration-none"
                >
                  +91 9130307464
                </a>
              </div>
            </div>

            <div className="col-md-4 mb30" data-aos="fade-up" data-aos-delay="200">
              <div className="info-card h-100 p-4 rounded-4 text-center">
                <div className="info-icon mx-auto mb-3">
                  <i className="bi bi-geo-alt-fill" />
                </div>
                <h6 className="mb-2">Visit Us</h6>
                <p className="text mb-0">
                  B 408 & 409, Mahaavir Icon, Plot 89 &amp; 90, Sector 15,
                  CBD Belapur, Navi Mumbai 400614.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb30" data-aos="fade-up" data-aos-delay="300">
              <div className="info-card h-100 p-4 rounded-4 text-center">
                <div className="info-icon mx-auto mb-3">
                  <i className="bi bi-clock-fill" />
                </div>
                <h6 className="mb-2">Working Hours</h6>
                <p className="text mb-0">
                  Mon - Sat: 10:00 AM - 7:00 PM
                  <br />
                  Sunday: By appointment
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Quick Info Cards */}

      {/* Form + Map Area */}
      <section className="contact-main pb90">
        <div className="container">
          <div className="row">
            {/* Form column */}
            <div className="col-lg-6 mb30" data-aos="fade-up" data-aos-delay="100">
              <div className="contact-form-wrap p-4 p-md-5 rounded-4 h-100">
                <SectionHeading
                  heading={"Get In Touch"}
                  title={"Send Us a "}
                  highlight={"Message"}
                  subtitle={"Fill the form and our team will reach out to you shortly"}
                />
                <ContactPageForm />
              </div>
            </div>

            {/* Map column */}
            <div className="col-lg-6 mb30" data-aos="fade-up" data-aos-delay="200">
              <div className="contact-map-wrap h-100 rounded-4 overflow-hidden">
                <iframe
                  title="Aristo Office Location"
                  src="https://www.google.com/maps?q=Mahaavir+Icon+Sector+15+CBD+Belapur+Navi+Mumbai&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "450px" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Form + Map Area */}

      {/* Page-level theme styling */}
      <style>{`
        .info-card {
          background-color: #fff;
          box-shadow: 0 4px 20px rgba(218, 37, 28, 0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .info-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 28px rgba(218, 37, 28, 0.15);
        }
        .info-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: rgba(218, 37, 28, 0.1);
          color: #da251c;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
        }
        .contact-form-wrap {
          background-color: #fff;
          box-shadow: 0 4px 24px rgba(218, 37, 28, 0.08);
        }
      `}</style>
    </>
  );
};

export default ContactPage;