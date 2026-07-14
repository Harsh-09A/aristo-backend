"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Each link the sidebar shows
const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "bi-speedometer2" },
  { href: "/dashboard/projects", label: "Projects", icon: "bi-buildings" },
  {
    href: "/dashboard/developers",
    label: "Developers",
    icon: "bi-person-badge",
  },
  { href: "/dashboard/agents", label: "Agents", icon: "bi-people" },
  { href: "/dashboard/locations", label: "Locations", icon: "bi-geo-alt" },
  { href: "/dashboard/amenities", label: "Amenities", icon: "bi-stars" },
  { href: "/dashboard/blogs", label: "Blog Posts", icon: "bi-journal-text" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="sidebar col-12 col-md-3 col-lg-2 p-0">
      <div className="sidebar-brand">
        {/* 🏠 Aristo Dashboard */}
        <img src="/assets/logo/aristo-logo-white.png" alt="" height={"80px"} />
      </div>
      <nav className="d-flex flex-column gap-1 px-2">
        {navItems.map((item) => {
          // Highlight the link if we're currently on that page (or a sub-page of it)
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={isActive ? "active" : ""}
            >
              <i className={`bi ${item.icon} me-2`}></i>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
