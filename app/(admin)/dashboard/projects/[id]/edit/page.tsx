import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProjectForm from "../../ProjectForm";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [project, developers, locations, amenities, agents] = await Promise.all([
    prisma.project.findUnique({
      where: { id: id },
      include: {
        amenities: { select: { id: true } },
        agents: { select: { id: true } },
        configurations: true,
      },
    }),
    prisma.developer.findMany({ orderBy: { name: "asc" } }),
    prisma.location.findMany({ orderBy: { name: "asc" } }),
    prisma.amenity.findMany({ orderBy: { name: "asc" } }),
    prisma.agent.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <h1 className="h3 mb-4">Edit Project</h1>
      <ProjectForm
        project={project}
        developers={developers}
        locations={locations}
        amenities={amenities}
        agents={agents}
      />
    </div>
  );
}
