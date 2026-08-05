import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "aos/dist/aos.css";
import "rc-slider/assets/index.css";
import "@/_styles/scss/main.scss"
import "./globals.css";

import BootstrapClient from "@/components/wrappers/BootstrapClient";
import ClientProviders from "@/components/wrappers/ClientProviders";

import { DM_Sans, Poppins } from "next/font/google";

import DefaultHeader from "@/components/frontend/common/header/DefaultHeader";
import MobileMenu from "@/components/frontend/common/mobile-menu/MobileMenu";
import Footer from "@/components/frontend/common/footer";
import ContactModal from "@/components/frontend/common/popup/ContactModal";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--body-font-family",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--title-font-family",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ClientProviders>
        <div className={` wrapper ${poppins.variable} ${dmSans.variable}`}>
          {/* Main Header Nav */}
          <DefaultHeader />
          {/* End Main Header Nav */}

          {/* Mobile Nav  */}
          <MobileMenu />
          {/* End Mobile Nav  */}

          {children}

          {/* Start Our Footer */}
          <section className="footer-style1 pt60 pb-0">
            <Footer />
          </section>
          {/* End Our Footer */}
        </div>
        {/* <ScrollToTop /> */}
      </ClientProviders>

      {/* Loads Bootstrap's JavaScript (needed for things like dropdowns) */}
      <BootstrapClient />

      <ContactModal />
    </>
  );
}
