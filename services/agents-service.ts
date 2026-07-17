// services/agents-service.ts
import prisma from "@/lib/prisma";

const PROJECTS_PER_PAGE = 10;

// List page — sabhi agents
// export async function getAllAgents() {
//   const agents = await prisma.agent.findMany({
//     select: {
//       id: true,
//       name: true,
//       slug: true,
//       photo: true,
//       specialization: true,
//       _count: {
//         select: { projects: true },
//       },
//     },
//     orderBy: { name: "asc" },
//   });

//   return agents;
//   // shape: { id, name, slug, photo, specialization, _count: { projects: number } }[]
// }

// Single agent page — agent ki apni info (name, photo, contact, etc.) + total project count.
// Project list yahan nahi — woh alag se fetch hoga taaki pagination laga sakein.
export async function getAgentBySlug(slug: string) {
  return prisma.agent.findUnique({
    where: { slug },
    include: {
      _count: {
        select: { projects: true },
      },
    },
  });
}

// One page of an agent's projects.
// Note: agent <-> project many-to-many hai, isliye "developerId" jaisa direct
// filter nahi chalega. Iski jagah "agents" relation ke andar "some" use karte hain,
// jo matlab hai: "un projects ko do jinke agents list mein yeh agentId maujood hai".
export async function getAgentProjects(agentId: string, page: number = 1) {
  const pageSize = PROJECTS_PER_PAGE;
  const skip = (page - 1) * pageSize;

  const where = {
    agents: {
      some: { id: agentId },
    },
  };

  const [projects, totalCount] = await Promise.all([
    prisma.project.findMany({
      where,
      include: {
        developer: true, // PropertyCardGrid ko listing.developer.name/logo chahiye
        location: true,
        configurations: true,
        amenities: true,
        agents: true,
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.project.count({ where }),
  ]);

  return {
    projects,
    totalPages: Math.ceil(totalCount / pageSize),
  };
}


// services/agents-service.ts
const AGENTS_PER_PAGE = 8;

export async function getAllAgents(page: number = 1) {
  const pageSize = AGENTS_PER_PAGE;
  const skip = (page - 1) * pageSize;

  const [agents, totalCount] = await Promise.all([
    prisma.agent.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        photo: true,
        specialization: true,
        _count: {
          select: { projects: true },
        },
      },
      orderBy: { name: "asc" },
      skip,
      take: pageSize,
    }),
    prisma.agent.count(),
  ]);

  return {
    agents,
    totalPages: Math.ceil(totalCount / pageSize),
  };
}