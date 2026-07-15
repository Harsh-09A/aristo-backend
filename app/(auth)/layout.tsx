import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import "./auth-global.css";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return children;
}
