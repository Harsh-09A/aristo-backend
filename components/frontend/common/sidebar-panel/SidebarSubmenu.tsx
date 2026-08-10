"use client";

import { useState } from "react";

type SubmenuChild = {
  id: number;
  title: string;
  link: string;
};

type Props = {
  title: string;
  submenu: SubmenuChild[];
};

const SidebarSubmenu = ({ title, submenu }: Props) => {
  // Yeh state hi decide karega ki submenu khula hai ya band
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="nav-item has-submenu">
      {/* Parent link — click par state toggle hoga, Bootstrap collapse nahi */}
      <a
        className="nav-link d-flex justify-content-between align-items-center"
        href="#"
        role="button"
        onClick={(e) => {
          e.preventDefault(); // link jump hone se rokne ke liye
          setIsOpen((prev) => !prev); // true -> false, false -> true
        }}
        aria-expanded={isOpen}
      >
        {title}
        <span
          className={`fa-solid fa-chevron-down submenu-arrow ${
            isOpen ? "rotated" : ""
          }`}
        ></span>
      </a>

      {/* Submenu — sirf CSS class ke through show/hide hoga, koi Bootstrap JS nahi */}
      <ul className={`submenu-list ${isOpen ? "submenu-open" : ""}`}>
        {submenu.map((sub) => (
          <li className="nav-item" key={sub.id}>
            <a className="nav-link" href={sub.link}>
              {sub.title}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default SidebarSubmenu;
