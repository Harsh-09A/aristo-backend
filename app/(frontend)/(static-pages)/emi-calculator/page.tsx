// app/emi-calculator/page.tsx

import type { Metadata } from "next";
import EMICalculator from "@/components/frontend/static-pages/emi-calculator/EMICalculator"; // apne actual path se adjust karo
import SectionHeading from "@/components/frontend/common/sections/SectionHeading";

export const metadata: Metadata = {
  title: "EMI Calculator | Aristo",
  description:
    "Calculate your home loan EMI instantly with Aristo's easy-to-use EMI calculator. Plan your loan amount, interest rate, and tenure.",
};

export default function EMICalculatorPage() {
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
                <h2 className="title text-white">EMI Calculator</h2>
                <div className="breadcumb-list text-white fs-5">
                  <a href="#" className="text-white">
                    Home
                  </a>
                  <a href="#" className="text-white">
                    EMI Calculator
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcrumb Section */}

      <EMICalculator />
    </>
  );
}
