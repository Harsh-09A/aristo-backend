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

import DefaultHeader from "@/components/frontend/common/header/DefaultHeader";
import MobileMenu from "@/components/frontend/common/mobile-menu/MobileMenu";
import Footer from "@/components/frontend/common/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        {/* Bootstrap Icons, loaded from a CDN so we don't need an extra npm package */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body>
        <ClientProviders>
          <div className="wrapper">
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
      </body>
    </html>
  );
}
