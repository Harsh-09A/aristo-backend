import Image from "next/image";
import Link from "next/link";
import Features from "./Features";
import SectionHeading from "@/components/frontend/common/sections/SectionHeading";

const WhyChooseUs = () => {
  return (
    <>
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
            title={"Why Choose"}
            highlight={"Us"}
            subtitle={"Lorem ipsum dolor sit, amet consectetur"}
          />
        </div>
        {/* End main-title2 */}

        <div className="why-chose-list">
          <Features />
        </div>
        {/* End .why-chose-list */}
      </div>
      {/* End .col-6 */}
    </>
  );
};

export default WhyChooseUs;
