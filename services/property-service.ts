// ===================================================================
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
  // Build the `where` object piece by piece. Only add a condition if
  // the matching filter was actually passed in.
  const where: Prisma.ProjectWhereInput = {};

  // category
  if (filters.category) {
    where.category = filters.category;
  }

  // type
  if (filters.type) {
    where.type = filters.type;
  }

  // search (case-insensitive match on title)
  if (filters.search) {
    where.title = {
      contains: filters.search,
      mode: "insensitive",
    };
  }

  // location — this is now a relation, so we filter through it.
  // Matches against the location's name (e.g. "Andheri West").
  if (filters.location) {
    where.location = {
      name: {
        contains: filters.location,
        mode: "insensitive",
      },
    };
  }

  // bhk — Configuration.value is a STRING in the DB (e.g. "2", "2.5"),
  // so we convert the incoming number to a string before comparing.
  if (filters.bhk) {
    where.configurations = {
      some: {
        value: String(filters.bhk),
      },
    };
  }

  // min price / max price
  if (filters.min_price || filters.max_price) {
    where.price = {
      ...(filters.min_price ? { gte: filters.min_price } : {}),
      ...(filters.max_price ? { lte: filters.max_price } : {}),
    };
  }

  // status
  if (filters.status) {
    where.status = filters.status;
  }

  // developer — also a relation now, filter by the developer's name
  if (filters.developer) {
    where.developer = {
      name: filters.developer,
    };
  }

  return prisma.project.findMany({
    where,
    include: propertyInclude,
    orderBy: { createdAt: "desc" },
  });
}

export async function getPropertyBySlug(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
    include: propertyInclude,
  });
}