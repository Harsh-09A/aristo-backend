// lib/queries/developers.ts
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
export async function getDeveloperBySlug(slug: string) {
  const developer = await prisma.developer.findUnique({
    where: { slug },
    include: {
      projects: {
        include: {
          location: true,
          configurations: true,
          amenities: true,
          agents: true,
        },
        orderBy: { createdAt: "desc" },
      },
      _count: {
        select: { projects: true },
      },
    },
  });

  return developer;
}