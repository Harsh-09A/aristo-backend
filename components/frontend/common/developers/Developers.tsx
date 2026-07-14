import React from "react";
import DevelopersCard from "./DevelopersCard";

const Developers = () => {
  return (
    <>
      <section className="our-agents py-0">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="100">
            <DevelopersCard />
          </div>
          {/* End .row */}
        </div>
      </section>
    </>
  );
};

export default Developers;
