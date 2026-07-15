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
export async function getLocationBySlug(slug: string) {
  const location = await prisma.location.findUnique({
    where: { slug },
  });

  return location;
}

/**
 * Get just the total number of locations in the database.
 * Useful for admin dashboards ("You have 8 locations").
 */
export async function getLocationsCount() {
  const count = await prisma.location.count();
  return count;
}