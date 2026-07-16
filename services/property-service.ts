// ===================================================================
//services/developers-service.ts
// Property (Prisma model: Project) queries
// Rewritten to use the real Prisma client instead of a static
// in-memory `properties` array, based on the new schema.
//
// ASSUMPTION: you have a Prisma client singleton exported from
// `@/lib/prisma` (the usual Next.js pattern, e.g. `src/lib/prisma.ts`
// that does `export default new PrismaClient()`). Adjust the import
// path below if yours lives somewhere else.
// ===================================================================

import prisma from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client"; // adjust path if your `output` in schema.prisma differs

type Filters = {
  category?: string;
  type?: string;
  search?: string;
  location?: string;
  bhk?: number;
  min_price?: number;
  max_price?: number;
  status?: string;
  developer?: string;
  page?: number;
  pageSize?: number;
};

// Reused across every query so all relations come back the same shape
// (matches the Property/Developer/Location/etc. types in property.ts)
const propertyInclude = {
  developer: true,
  location: true,
  configurations: true,
  amenities: true,
  agents: true,
} satisfies Prisma.ProjectInclude;

export async function getProperties() {
  return prisma.project.findMany({
    include: propertyInclude,
    orderBy: { createdAt: "desc" },
  });
}

export async function getFeaturedProperties(limit?: number) {
  return prisma.project.findMany({
    where: {
      tags: {
        has: "featured", // Prisma's way of checking "is this value inside the String[] array"
      },
    },
    include: propertyInclude,
    orderBy: { createdAt: "desc" },
    take: limit, // if `limit` is undefined, Prisma just returns everything
  });
}

export async function getFilteredProperties(filters: Filters) {
  const where: Prisma.ProjectWhereInput = {};

  if (filters.category) where.category = filters.category;
  if (filters.type) where.type = filters.type;

  if (filters.search) {
    where.title = { contains: filters.search, mode: "insensitive" };
  }

  if (filters.location) {
    where.location = {
      name: { contains: filters.location, mode: "insensitive" },
    };
  }

  // bhk ab number hai. "5" select karne ka matlab "5 BHK ya usse zyada".
  if (filters.bhk) {
    where.configurations = {
      some:
        filters.bhk >= 5
          ? { value: { gte: filters.bhk } }
          : { value: filters.bhk },
    };
  }

  if (filters.min_price || filters.max_price) {
    where.price = {
      ...(filters.min_price ? { gte: filters.min_price } : {}),
      ...(filters.max_price ? { lte: filters.max_price } : {}),
    };
  }

  if (filters.status) where.status = filters.status;
  if (filters.developer) where.developer = { name: filters.developer };

  // Pagination values - kuch invalid ho toh safe defaults
  const page = filters.page && filters.page > 0 ? filters.page : 1;
  const pageSize =
    filters.pageSize && filters.pageSize > 0 ? filters.pageSize : 20;

  // Dono queries ek saath chalao - properties bhi aur total count bhi
  const [properties, total] = await Promise.all([
    prisma.project.findMany({
      where,
      include: propertyInclude,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.project.count({ where }),
  ]);

  return {
    properties,
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export async function getPropertyBySlug(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
    include: propertyInclude,
  });
}

// Get similar properties — same location, but NOT the current property.
// Used on the property detail page to show "You might also like" section.
export async function getSimilarProperties(
  currentProjectId: string,
  locationId: string,
  limit: number = 4,
) {
  return prisma.project.findMany({
    where: {
      locationId: locationId, // same location as current property
      id: {
        not: currentProjectId, // exclude the current property itself
      },
    },
    include: propertyInclude,
    orderBy: { createdAt: "desc" },
    take: limit, // how many similar properties to show (default 4)
  });
}
