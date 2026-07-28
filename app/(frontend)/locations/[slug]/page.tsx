// app/locations/[slug]/page.tsx
import prisma from "@/lib/prisma";
// import { getFilteredProperties } from "@/services/location-service";

export default async function LocationProjectsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const location = await prisma.location.findUnique({ where: { slug } });
  if (!location) return <div>Location not found</div>;

  // const projects = await getFilteredProperties({ location: location.name });

  return (
    <div className="container py-5">
      <h2>Projects in {location.name}</h2>
      {/* <div className="row">
        {projects.map((p) => (
          <div key={p.id} className="col-md-4 mb-4">
            <h5>{p.title}</h5>
            <p>{p.price ? `₹${p.price}` : "Price on request"}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
}