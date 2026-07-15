import "./dashboard.css";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import Sidebar from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="dashboard-layout">
      <Sidebar user={session.user} />
      <main className="dashboard-main">{children}</main>
    </div>
  );
}