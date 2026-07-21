//services/developers-service.ts
import prisma from "@/lib/prisma";
import { PublishStatus } from "@/generated/prisma/client"; // add this import at top

// List page — sabhi developers
export async function getAllDevelopers2() {
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

//! Uppar wala function and uska code hata na hai

// Single developer page — ab slug se fetch, id se nahi
const PROJECTS_PER_PAGE = 10;
const DEVELOPERS_PER_PAGE = 12;

// Just the developer's own info (name, logo, etc.) + total project count.
// No project list here — that's fetched separately so it can be paginated.
export async function getDeveloperBySlug(slug: string) {
  return prisma.developer.findUnique({
    where: { slug },
    include: {
      _count: {
        select: {
          projects: {
            where: { publishStatus: PublishStatus.PUBLISHED }, // ← added
          },
        },
      },
    },
  });
}

// One page of a developer's projects.

export async function getDeveloperProjects(
  developerId: string,
  page: number = 1,
) {
  const pageSize = PROJECTS_PER_PAGE;
  const skip = (page - 1) * pageSize;

  const where = {
    publishStatus: PublishStatus.PUBLISHED, // ← added: DRAFT projects hide ho jayenge
    developerId,
  };

  const [projects, totalCount] = await Promise.all([
    prisma.project.findMany({
      where,
      include: {
        developer: true,
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

export async function getAllDevelopers(page: number = 1) {
  const pageSize = DEVELOPERS_PER_PAGE;
  const skip = (page - 1) * pageSize;

  const [developers, totalCount] = await Promise.all([
    prisma.developer.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        logo: true,
        _count: {
          select: {
            projects: {
              where: { publishStatus: PublishStatus.PUBLISHED }, // ← added
            },
          },
        },
      },
      orderBy: { name: "asc" },
      skip,
      take: pageSize,
    }),
    prisma.developer.count(),
  ]);

  return { developers, totalPages: Math.ceil(totalCount / pageSize) };
}

// Top developers — jinke paas sabse zyada projects hain, limit ke saath
// export async function getTopDevelopers(limit: number = 10) {
//   const developers = await prisma.developer.findMany({
//     select: {
//       id: true,
//       name: true,
//       slug: true,
//       logo: true,
//       _count: {
//         select: {
//           projects: {
//             where: { publishStatus: PublishStatus.PUBLISHED }, // ← added
//           },
//         },
//       },
//     },
//     orderBy: {
//       projects: {
//         _count: "desc", // sabse zyada projects wale developer sabse upar
//       },
//     },
//     take: limit,
//   });

//   return developers;
// }


// Top developers — jinke paas sabse zyada PUBLISHED projects hain, limit ke saath
//
// Pehle wala version `orderBy: { projects: { _count: "desc" } }` use karta tha,
// jo TOTAL projects (draft + published) ke hisaab se sort karta hai — Prisma
// relation-count orderBy filter nahi le sakta. Isliye humein manually
// groupBy karna padega taaki sirf PUBLISHED projects count ho, aur usi
// count ke hisaab se sahi ranking mile.
export async function getTopDevelopers(limit: number = 10) {
  // Step 1: Project table ko developerId ke hisaab se group karo,
  // sirf PUBLISHED projects gino, aur count ke hisaab se descending sort karo
  const grouped = await prisma.project.groupBy({
    by: ["developerId"],
    where: { publishStatus: PublishStatus.PUBLISHED },
    _count: { _all: true },
    orderBy: {
      _count: { developerId: "desc" },
    },
    take: limit,
  });

  // Agar koi published project hi nahi hai, toh empty array return kar do
  if (grouped.length === 0) return [];

  // Step 2: Ab in developer IDs ki actual details (name, slug, logo) fetch karo
  const developerIds = grouped.map((g) => g.developerId);

  const developers = await prisma.developer.findMany({
    where: { id: { in: developerIds } },
    select: {
      id: true,
      name: true,
      slug: true,
      logo: true,
    },
  });

  // Step 3: groupBy se mila count wapas map karke merge karo, aur
  // groupBy wali ordering (sabse zyada published projects wala pehle) preserve karo
  const developerMap = new Map(developers.map((d) => [d.id, d]));

  return grouped
    .map((g) => {
      const developer = developerMap.get(g.developerId);
      if (!developer) return null; // safety check, ideally kabhi null nahi hoga

      return {
        ...developer,
        _count: { projects: g._count._all },
      };
    })
    .filter((d): d is NonNullable<typeof d> => d !== null);
}