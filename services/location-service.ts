// lib/queries/locations.ts

import prisma from "@/lib/prisma";

/**
 * Get locations, sorted alphabetically by name.
 * Also includes a count of how many PUBLISHED projects are in each location,
 * which is handy for showing "Andheri West (12 properties)" in a dropdown.
 *
 * Pass `limit` to only fetch the first N locations (e.g. for a homepage
 * that only shows 6 locations). Leave it out to get all of them.
 *
 * Example:
 *   const allLocations = await getLocations();
 *   const topSix = await getLocations(6);
 */
export async function getLocations(limit?: number) {
  const locations = await prisma.location.findMany({
    orderBy: { name: "asc" },
    take: limit, // if `limit` is undefined, Prisma just ignores this and returns everything
    include: {
      _count: {
        select: {
          projects: {
            where: { publishStatus: "PUBLISHED" },
          },
        },
      },
    },
  });

  return locations;
}

/**
 * Get one location by its slug (the URL-friendly name, e.g. "andheri-west").
 * Returns `null` if nothing matches, so always check for that in your page.
 */
// export async function getLocationBySlug(slug: string) {
//   const location = await prisma.location.findUnique({
//     where: { slug },
//   });

//   return location;
// }

/**
 * Get just the total number of locations in the database.
 * Useful for admin dashboards ("You have 8 locations").
 */
export async function getLocationsCount() {
  const count = await prisma.location.count();
  return count;
}

// Search panel ke Location dropdown ke liye - sirf jitna chahiye utna hi select karo
export async function getAllLocations() {
  return prisma.location.findMany({
    select: { id: true, name: true, slug: true },
    orderBy: { name: "asc" },
  });
}

export async function getTopLocations(limit: number = 6) {
  // Pehle sabhi locations fetch karo, saath mein sirf PUBLISHED projects ka count
  const locations = await prisma.location.findMany({
    include: {
      _count: {
        select: {
          projects: {
            where: { publishStatus: "PUBLISHED" },
          },
        },
      },
    },
  });

  // Ab JS mein published count ke hisaab se sort karo (highest first)
  const sorted = locations.sort(
    (a, b) => b._count.projects - a._count.projects,
  );

  // Sirf top `limit` locations return karo
  return sorted.slice(0, limit);
}

export async function getNaviMumbaiLocations() {
  return prisma.location.findMany({
    where: {
      latitude: { not: null },
      longitude: { not: null },
    },
    select: {
      id: true,
      name: true,
      slug: true,
      image: true, // ← add kiya, field naam confirm kar lena
      latitude: true,
      longitude: true,
      _count: { select: { projects: true } },
    },
  });
}

const LOCATIONS_PER_PAGE = 12;

export async function getLocationsPaginated(page: number = 1) {
  const pageSize = LOCATIONS_PER_PAGE;
  const skip = (page - 1) * pageSize;

  const [locations, totalCount] = await Promise.all([
    prisma.location.findMany({
      orderBy: { name: "asc" },
      skip,
      take: pageSize,
      include: {
        _count: {
          select: {
            projects: {
              where: { publishStatus: "PUBLISHED" }, // drafts count mein nahi aayenge
            },
          },
        },
      },
    }),
    prisma.location.count(),
  ]);

  return { locations, totalPages: Math.ceil(totalCount / pageSize) };
}

export async function getLocationBySlug(slug: string) {
  const location = await prisma.location.findUnique({
    where: { slug },
    include: {
      _count: {
        select: {
          projects: {
            where: { publishStatus: "PUBLISHED" },
          },
        },
      },
    },
  });

  return location;
}

// Naya function — ek location ke projects, paginated (agent/developer wale pattern jaisa)
const LOCATION_PROJECTS_PER_PAGE = 10;

export async function getLocationProjects(
  locationId: string,
  page: number = 1,
) {
  const pageSize = LOCATION_PROJECTS_PER_PAGE;
  const skip = (page - 1) * pageSize;

  const where = {
    publishStatus: "PUBLISHED" as const, // drafts hide
    locationId,
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
