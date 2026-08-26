import React from "react";

const getCurrentYear = () => {
  return new Date().getFullYear();
};

const Footer = () => {
  const footerMenuItems = [
    {
      label: "Privacy",
      link: "#",
    },
    {
      label: "Terms",
      link: "#",
    },
    {
      label: "Sitemap",
      link: "#",
    },
  ];
  // Copyright © 2025 Aristo Real Estate Consultants (Haresh Gurno Rochani). All rights reserved. Designed & Developed by DigIN Media

  return (
    <div className="container white-bdrt1 py-4">
      <div className="row">
        <div className="col-sm-6">
          <div className="text-center text-lg-start">
            <p className="copyright-text text-gray ff-heading">
              © {getCurrentYear()} Aristo Real Estate Consultants (Haresh Gurno
              Rochani)
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              ></a>
              . All rights reserved
            </p>
          </div>
        </div>
        {/* End .col-sm-6 */}

        <div className="col-sm-6">
          <div className="text-center text-lg-end">
            <p className="footer-menu ff-heading text-gray">
              Designed & Developed by {" "}
              <a
                href="https://letsdigin.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                DigIN Media
              </a>
            </p>
          </div>
        </div>
        {/* End .col-sm-6 */}
      </div>
    </div>
  );
};

export default Footer;
