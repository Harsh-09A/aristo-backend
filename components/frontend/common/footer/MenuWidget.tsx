import React from "react";

const MenuWidget = () => {
  const menuSections = [
    {
      title: "Popular Search",
      links: [
        {
          label: "Apartments in Kharghar",
          href: "/listings?category=Residential&type=Apartment&location=Kharghar",
        },
        {
          label: "Apartment in Nerul",
          href: "/listings?category=Residential&type=Apartment&location=Nerul",
        },
        {
          label: "Offices in CBD Belapur",
          href: "/listings?category=Commercial&type=Office&location=CBD+Belapur",
        },
        {
          label: "Offices in Vashi",
          href: "listings?category=Commercial&type=Office&location=Vashi",
        },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { label: "About", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Contact", href: "/contact" },
        { label: "Terms & Conditions ", href: "/terms-and-conditions" },
        { label: "Privacy Policy", href: "/privacy-policy" },
      ],
    },
    {
      title: "Discover",
      links: [
        { label: "Kharghar", href: "/locations/kharghar" },
        { label: "Vashi", href: "/locations/vashi" },
        { label: "Ulwe", href: "/locations/ulwe" },
        { label: "Airoli", href: "/locations/airoli" },
      ],
    },
  ];

  return (
    <>
      {menuSections.map((section, index) => (
        <div className="col-auto" key={index}>
          <div className="link-style1 mb-3">
            <h6 className="text-white mb25">{section.title}</h6>
            <ul className="ps-0">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default MenuWidget;
