import prisma from "@/lib/prisma";
import Link from "next/link";

// This page just shows how many records we have of each type,
// so the admin gets a quick overview when they log in.

const DashboardPage = async () => {
  const results = await Promise.allSettled([
    prisma.project.count(),
    prisma.developer.count(),
    prisma.agent.count(),
    prisma.location.count(),
    prisma.amenity.count(),
    prisma.blog.count(),
  ]);

  // Agar status 'fulfilled' hai toh value lo, nahi toh placeholder 'N/A' ya 0 set karo
  const [
    projectCount,
    developerCount,
    agentCount,
    locationCount,
    amenityCount,
    blogCount,
  ] = results.map((res) => (res.status === "fulfilled" ? res.value : "N/A"));
  // Aap 'N/A' ki jagah 'Not Found' ya 0 bhi rakh sakte hain

  // const cards = [
  //   {
  //     label: "Projects",
  //     count: projectCount,
  //     href: "/dashboard/projects",
  //     color: "primary",
  //   },
  //   {
  //     label: "Developers",
  //     count: developerCount,
  //     href: "/dashboard/developers",
  //     color: "success",
  //   },
  //   {
  //     label: "Agents",
  //     count: agentCount,
  //     href: "/dashboard/agents",
  //     color: "info",
  //   },
  //   {
  //     label: "Locations",
  //     count: locationCount,
  //     href: "/dashboard/locations",
  //     color: "warning",
  //   },
  //   {
  //     label: "Amenities",
  //     count: amenityCount,
  //     href: "/dashboard/amenities",
  //     color: "secondary",
  //   },
  //   {
  //     label: "Blog Posts",
  //     count: blogCount,
  //     href: "/dashboard/blogs",
  //     color: "dark",
  //   },
  // ];

  const cards = [
    {
      label: "Projects",
      count: projectCount,
      href: "/dashboard/projects",
      color: "primary",
    },
    {
      label: "Developers",
      count: developerCount,
      href: "/dashboard/developers",
      color: "success",
    },
    {
      label: "Agents",
      count: agentCount,
      href: "/dashboard/agents",
      color: "info",
    },
    {
      label: "Locations",
      count: locationCount,
      href: "/dashboard/locations",
      color: "warning",
    },
    {
      label: "Amenities",
      count: amenityCount,
      href: "/dashboard/amenities",
      color: "danger",
    },
    {
      label: "Blogs",
      count: blogCount,
      href: "/dashboard/blogs",
      color: "secondary",
    },
  ];

  async function checkConnection() {
  try {
    // Ye query sirf database ka connection test karegi
    await prisma.$queryRaw`SELECT 1`
    console.log('🎉 NeonDB se successfully connect ho gaya hai!')
  } catch (error) {
    console.error('❌ Connection fail ho gaya. Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkConnection()

  return (
    <div>
      <h1 className="h3 mb-4">Dashboard</h1>
      <div className="row g-3">
        {cards.map((card) => (
          <div key={card.label} className="col-12 col-sm-6 col-lg-4">
            <Link href={card.href} className="text-decoration-none">
              <div className={`card border-${card.color} h-100`}>
                <div className="card-body">
                  <h6 className="text-muted">{card.label}</h6>
                  {/* Agar value N/A hai toh red color me text dikhega, nahi toh display-6 size me number */}
                  <p
                    className={`${card.count === "N/A" ? "text-danger fs-5" : "display-6"} mb-0`}
                  >
                    {card.count}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
