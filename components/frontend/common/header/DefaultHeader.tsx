import Image from "next/image";
import Link from "next/link";
import SidebarPanel from "../sidebar-panel/SidebarPanel";
import HeaderIcons from "./HeaderIcons";

const DefaultHeader = () => {
  return (
    <>
      <header
        className={`header-nav nav-homepage-style light-header menu-home4 main-menu `}
      >
        <nav className="posr">
          <div className="container posr menu_bdrt1">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="logos mr40">
                    <Link className="header-logo logo1" href="/">
                      <Image
                        width={200}
                        height={100}
                        loading="eager"
                        src="/assets/images/logo/aristo-logo.png"
                        alt="Header Logo"
                      />
                    </Link>
                    <Link className="header-logo logo2" href="/">
                      <Image
                        width={200}
                        height={100}
                        loading="eager"
                        src="/assets/images/logo/aristo-logo.png"
                        alt="Header Logo"
                      />
                    </Link>
                  </div>
                  {/* End Logo */}

                  {/* <MainMenu />  
                  //! To Add Menu in header
                  */}
                  {/* End Main Menu */}
                </div>
              </div>
              {/* End .col-auto */}

              <div className="col-auto">
                <div className="d-flex align-items-center">
                  <HeaderIcons />
                  <Image
                    className="maharera-logo mx-4"
                    width={60}
                    height={60}
                    src="/assets/images/logo/maharera-new.webp"
                    alt="Header Logo"
                  />

                  {/* Sidebar hamburger */}
                  <a
                    className="sidemenu-btn filter-btn-right"
                    href="#"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#SidebarPanel"
                    aria-controls="SidebarPanelLabel"
                  >
                    <Image
                      width={25}
                      height={9}
                      className="img-1"
                      src="/assets/images/icon/dark-nav-icon.svg"
                      alt="humberger menu"
                    />
                    <Image
                      width={25}
                      height={9}
                      className="img-2"
                      src="/assets/images/icon/dark-nav-icon.svg"
                      alt="humberger menu"
                    />
                  </a>
                  {/* Sidebar hamburger End */}
                </div>
              </div>
              {/* End .col-auto */}
            </div>
            {/* End .row */}
          </div>
        </nav>
      </header>
      {/* End Header */}

      {/* DesktopSidebarMenu */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="SidebarPanel"
        aria-labelledby="SidebarPanelLabel"
      >
        <SidebarPanel />
      </div>
      {/* Sidebar Panel End */}
    </>
  );
};

export default DefaultHeader;
