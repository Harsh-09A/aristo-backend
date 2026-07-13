import prisma from "@/lib/prisma";
import ProjectForm from "../ProjectForm";

export default async function NewProjectPage() {
  // Fetch everything the dropdowns/checkboxes need, all at once
  const [developers, locations, amenities, agents] = await Promise.all([
    prisma.developer.findMany({ orderBy: { name: "asc" } }),
    prisma.location.findMany({ orderBy: { name: "asc" } }),
    prisma.amenity.findMany({ orderBy: { name: "asc" } }),
    prisma.agent.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div>
      <h1 className="h3 mb-4">Add Project</h1>
      <ProjectForm
        developers={developers}
        locations={locations}
        amenities={amenities}
        agents={agents}
      />
    </div>
  );
}
