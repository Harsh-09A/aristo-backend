import prisma from "@/lib/prisma";
import Link from "next/link";

const Home = async() => {
  const users = await prisma.user.findMany();
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: "#fff",
        gap: "16px",
      }}
    >
      <h1>
        <i className="fa-solid fa-city"></i> EstateHub
      </h1>
      <Link href="/login" className="btn btn-primary">
        Go to Login Page
      </Link>
    </div>
  );
};

export default Home;
