// ===================================================================
// services/developers-service.ts (a.k.a. property-service)
// Property (Prisma model: Project) queries.
//
// FIX: every public-facing query now filters `publishStatus: PUBLISHED`
// so DRAFT projects (the default when a project is created) don't show
// up on the live site — same pattern as blogs-service.ts.
// ===================================================================

import prisma from "@/lib/prisma";
import { PublishStatus } from "@/generated/prisma/client";
import type { Prisma } from "@/generated/prisma/client"; // adjust path if your `output` in schema.prisma differs

type Filters = {
  category?: string;
  type?: string;
  search?: string;
  location?: string;
  bhk?: string;
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

// Every query below starts from this base `where` — it guarantees
// drafts never leak onto the public site. Spread it first, then let
// filters override/add on top.
const publishedOnly = {
  publishStatus: PublishStatus.PUBLISHED,
} satisfies Prisma.ProjectWhereInput;

// Har 0.5 step pe 5 se 12 tak string list bana deta hai: ["5","5.5","6",...,"12"]
function bhkFivePlusValues(): string[] {
  const values: string[] = [];
  for (let n = 5; n <= 12; n += 0.5) {
    values.push(String(n));
  }
  return values;
}

export async function getProperties() {
  return prisma.project.findMany({
    where: publishedOnly,
    include: propertyInclude,
    orderBy: { createdAt: "desc" },
  });
}

export async function getFeaturedProperties(limit?: number) {
  return prisma.project.findMany({
    where: {
      ...publishedOnly,
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
  // Start with publishedOnly so every branch below builds on top of it.
  const where: Prisma.ProjectWhereInput = { ...publishedOnly };

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
  // getFilteredProperties ke andar bhk wala block:
  if (filters.bhk) {
    where.configurations = {
      some:
        filters.bhk === "5+"
          ? { value: { in: bhkFivePlusValues() } }
          : { value: filters.bhk }, // exact match, e.g. "2.5"
    };
  }

  if (filters.min_price || filters.max_price) {
    where.price = {
      ...(filters.min_price ? { gte: filters.min_price } : {}),
      ...(filters.max_price ? { lte: filters.max_price } : {}),
    };
  }

  // NOTE: `filters.status` here refers to a business field like
  // "Ready to Move" / "Under Construction" (Project.status), NOT
  // publishStatus. Don't confuse the two — publishStatus is always
  // forced to PUBLISHED above, regardless of this filter.
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
  return prisma.project.findFirst({
    where: {
      slug,
      ...publishedOnly,
    },
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
      ...publishedOnly,
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

// -----------------------------------------------------------------------
// getPropertyBySlugForAdmin — for an admin/preview page where you DO
// want to see a draft (e.g. to preview it before publishing). Use this
// instead of getPropertyBySlug when you intentionally need drafts.
// -----------------------------------------------------------------------
export async function getPropertyBySlugForAdmin(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
    include: propertyInclude,
  });
}
