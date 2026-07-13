// import Sidebar from "@/components/Sidebar";
import "./dashboard.css"
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

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
    <div className="container-fluid">
      <div className="row">
        {/* <Sidebar /> */}
        <main className="col-12 col-md-9 col-lg-10 p-4">{children}</main>
      </div>
    </div>
  );
}
