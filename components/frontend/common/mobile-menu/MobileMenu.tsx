import Image from "next/image";
import Link from "next/link";

const menuItems = [
  { id: 1, title: "About", link: "/about" },
  { id: 2, title: "Tools & Advise", link: "/" },
  { id: 3, title: "Post Requirements", link: "/" },
  { id: 4, title: "Contact", link: "/" },
  { id: 5, title: "Legal ", link: "/" },
  { id: 6, title: "Home Loan Assistance", link: "/" },
  { id: 7, title: "Documentation", link: "/" },
];

const MobileMenu = () => {
  return (
    <div className="mobilie_header_nav stylehome1">
      <div className="mobile-menu">
        <div className="header innerpage-style">
          <div className="menu_and_widgets">
            <div className="mobile_menu_bar d-flex justify-content-between align-items-center">
              <a
                className="menubar"
                href="#"
                data-bs-toggle="offcanvas"
                data-bs-target="#mobileMenu"
                aria-controls="mobileMenu"
              >
                <Image
                  width={25}
                  height={9}
                  src="/assets/images/icon/mobile-dark-nav-icon.svg"
                  alt="mobile icon"
                />
              </a>
              <Link className="mobile_logo" href="/">
                <Image
                  width={138}
                  height={44}
                  src="/assets/images/logo/aristo-logo.png"
                  alt="logo"
                />
              </Link>
              {/* <Link href="/login">
                <span className="icon fz18 far fa-user-circle" />
              </Link> */}
            </div>
          </div>
        </div>
      </div>
      {/* /.mobile-menu meta */}

      <div
        className="offcanvas offcanvas-start mobile_menu-canvas"
        tabIndex={-1}
        id="mobileMenu"
        aria-labelledby="mobileMenuLabel"
        data-bs-scroll="true"
      >
        <div className="rightside-hidden-bar">
          <div className="hsidebar-header">
            <div
              className="sidebar-close-icon"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <span className="far fa-times"></span>
            </div>
            <h4 className="title">Welcome to Aristo</h4>
          </div>
          {/* End header */}

          <div className="hsidebar-content ">
            <div className="hiddenbar_navbar_content">
              <div className="hiddenbar_navbar_menu">
                <ul className="navbar-nav">
                  {menuItems.map((item) => (
                    <li className="nav-item" key={item.id}>
                      <Link className="nav-link" href={item.link} role="button">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                {/* <MenuItems /> */}
              </div>
              {/* <ProSidebarContent /> /! NOT TO ADD */}
              {/* End .hiddenbar_navbar_menu */}
            </div>
          </div>
          {/* End hsidebar-content */}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
