"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import UserMenu from "./UserMenu";

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

// User ka simple type — agar aapke lib/session.ts mein already koi type
// export hota hai (jaise `SessionUser`), toh usko yahan import kar lena
// behtar rahega. Filhaal beginner-friendly rakhne ke liye yahi kaafi hai.
type SidebarUser = {
  name: string;
  email: string;
  image?: string | null;
};

export default function Sidebar({ user }: { user: SidebarUser }) {
  const pathname = usePathname();

  return (
    // p-0 aur col-* classes hata di — width ab CSS (.sidebar) se control ho rahi hai
    <div className="sidebar">
      <div className="sidebar-brand">
        <img
          src="/assets/images/logo/aristo-logo-white.png"
          alt=""
          height={"80px"}
        />
      </div>

      <nav className="d-flex flex-column gap-1 px-2 flex-grow-1">
        {navItems.map((item) => {
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

      <UserMenu user={user} />
    </div>
  );
}