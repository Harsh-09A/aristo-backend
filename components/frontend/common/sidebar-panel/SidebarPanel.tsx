// import MenuItems from "./MenuItems";
const menuItems = [
  { id: 1, title: "About", link: "/about" },
  { id: 2, title: "Tools & Advise", link: "/" },
  { id: 3, title: "Post Requirements", link: "/" },
  { id: 4, title: "Contact", link: "/" },
  { id: 5, title: "Legal ", link: "/" },
  { id: 6, title: "Home Loan Assistance", link: "/" },
  { id: 7, title: "Documentation", link: "/" },
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
          <span className="far fa-times"></span>
        </div>
        <h4 className="title">Aristo</h4>
      </div>
      {/* End header */}

      <div className="hsidebar-content">
        <div className="hiddenbar_navbar_content">
          <div className="hiddenbar_navbar_menu">
            <ul className="navbar-nav">
              {menuItems.map((item) => (
                <li className="nav-item" key={item.id}>
                  <a className="nav-link" href={item.link} role="button">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
            {/* <MenuItems /> */}
          </div>
          {/* End .hiddenbar_navbar_menu */}
        </div>
      </div>
      {/* End hsidebar-content */}
    </div>
  );
};

export default SidebarPanel;
