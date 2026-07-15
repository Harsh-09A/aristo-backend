"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; // 👈 apna actual path daalein

type SidebarUser = {
  name: string;
  email: string;
  image?: string | null;
};

export default function UserMenu({ user }: { user: SidebarUser }) {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="sidebar-user-menu px-3 py-3 border-top">
      <div className="d-flex align-items-center gap-2 mb-2">
        {user.image ? (
          <img
            src={user.image}
            alt={user.name}
            width={36}
            height={36}
            className="rounded-circle"
          />
        ) : (
          <div
            className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white"
            style={{ width: 36, height: 36 }}
          >
            <i className="bi bi-person-fill"></i>
          </div>
        )}

        <div className="flex-grow-1" style={{ minWidth: 0 }}>
          <div className="fw-semibold text-truncate">{user.name}</div>
          <div className="small text-truncate text-muted">{user.email}</div>
        </div>
      </div>

      <button
        onClick={handleSignOut}
        className="btn btn-sm btn-outline-danger w-100"
      >
        <i className="bi bi-box-arrow-right me-2"></i>
        Sign Out
      </button>
    </div>
  );
}