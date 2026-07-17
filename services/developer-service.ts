//services/developers-service.ts
import prisma from "@/lib/prisma";

// List page — sabhi developers
export async function getAllDevelopers() {
  const developers = await prisma.developer.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      logo: true,
      _count: {
        select: { projects: true },
      },
    },
    orderBy: { name: "asc" },
  });

  return developers;
  // shape: { id, name, slug, logo, _count: { projects: number } }[]
}

// Single developer page — ab slug se fetch, id se nahi
const PROJECTS_PER_PAGE = 10;

// Just the developer's own info (name, logo, etc.) + total project count.
// No project list here — that's fetched separately so it can be paginated.
export async function getDeveloperBySlug(slug: string) {
  return prisma.developer.findUnique({
    where: { slug },
    include: {
      _count: {
        select: { projects: true },
      },
    },
  });
}

// One page of a developer's projects.
// services/developers-service.ts

export async function getDeveloperProjects(
  developerId: string,
  page: number = 1,
) {
  const pageSize = PROJECTS_PER_PAGE;
  const skip = (page - 1) * pageSize;

  const [projects, totalCount] = await Promise.all([
    prisma.project.findMany({
      where: { developerId },
      include: {
        developer: true, // ← added, PropertyCardFeatured needs listing.developer.name/logo
        location: true,
        configurations: true,
        amenities: true,
        agents: true,
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.project.count({ where: { developerId } }),
  ]);

  return {
    projects,
    totalPages: Math.ceil(totalCount / pageSize),
  };
}
