import SidebarSubmenu from "./SidebarSubmenu";

//* Tools & Advice
//* EMI Calculator
//* Legal Assistance
//* Home Loan Assistance
//* Property Valuation
//* Documentation / Registration

// Post Requirements
//* Blog
//* About
//* Contact
// Sell Your Property
//* Our Philosophy
// Our Logo
//* Our Executive Team
//* Our Services
// Gallery
// Careers
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

const SidebarPanel = () => {
  return (
    <div className="rightside-hidden-bar">
      <div className="hsidebar-header">
        <div
          className="sidebar-close-icon"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <span className="fa-solid fa-times"></span>
        </div>
        <h4 className="title">Menu</h4>
      </div>

      <div className="hsidebar-content">
        <div className="hiddenbar_navbar_content">
          <div className="hiddenbar_navbar_menu">
            <ul className="navbar-nav">
              {menuItems.map((item) => {
                const hasSubmenu = item.submenu && item.submenu.length > 0;

                if (hasSubmenu) {
                  // Isolated client component — sirf yeh part interactive hai
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
                    <a className="nav-link" href={item.link} role="button">
                      {item.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarPanel;
