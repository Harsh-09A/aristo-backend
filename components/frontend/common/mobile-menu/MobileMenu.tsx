"use client"; // ← scroll listener use karne ke liye zaroori

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SidebarSubmenu from "../sidebar-panel/SidebarSubmenu";

const menuItems = [
  { id: 1, title: "About", link: "/about" },
  { id: 2, title: "Services", link: "/services" },
  { id: 3, title: "Our Executive Team", link: "/team" },
  { id: 4, title: "Blog", link: "/blog" },
  {
    id: 5,
    title: "Tools & Advice",
    link: "/",
    submenu: [
      { id: 51, title: "EMI Calculator", link: "/emi-calculator" },
      { id: 52, title: "Legal Assistance", link: "/" },
      { id: 53, title: "Home Loan Assistance", link: "/" },
      { id: 54, title: "Property Valuation", link: "/" },
      { id: 55, title: "Documentation / Registration", link: "/" },
    ],
  },
  { id: 6, title: "Gallery", link: "/gallery" },
  { id: 7, title: "Careers", link: "/careers" },
  { id: 8, title: "Contact", link: "/contact" },
];

const MobileMenu = () => {
  const [isSticky, setIsSticky] = useState(false); // ← DefaultHeader jaisa hi state

  useEffect(() => {
    const handleScroll = () => {
      // 80px se zyada scroll hua toh sticky ON, warna OFF
      setIsSticky(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    // cleanup — memory leak se bachne ke liye
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`mobilie_header_nav stylehome1 ${
        isSticky ? "sticky-header" : ""
      }`}
    >
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
                  width={100}
                  height={50}
                  src="/assets/images/logo/aristo-logo.png"
                  alt="logo"
                />
              </Link>

              <Image
                width={50}
                height={44}
                src="/assets/images/logo/maharera-new.webp"
                alt="logo"
              />
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
                  {menuItems.map((item) => {
                    const hasSubmenu = item.submenu && item.submenu.length > 0;

                    if (hasSubmenu) {
                      return (
                        <SidebarSubmenu
                          key={item.id}
                          title={item.title}
                          submenu={item.submenu!}
                        />
                      );
                    }

                    return (
                      <li className="nav-item" key={item.id}>
                        <Link
                          className="nav-link"
                          href={item.link}
                          role="button"
                        >
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                {/* <MenuItems /> */}
              </div>
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
