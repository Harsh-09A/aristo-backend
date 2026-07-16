// services/blogs-service.ts

import prisma from "@/lib/prisma";
import { PublishStatus } from "@/generated/prisma/client";

// -----------------------------------------------------------------------
// getBlogs — used on the Blog listing page (cards grid).
// Only shows PUBLISHED blogs, newest first. Drafts stay hidden from
// the public site.
// -----------------------------------------------------------------------
export async function getBlogs() {
  return prisma.blog.findMany({
    where: {
      publishStatus: PublishStatus.PUBLISHED,
    },
    orderBy: { createdAt: "desc" },
  });
}

// -----------------------------------------------------------------------
// getFeaturedBlogs — optional helper if you want to limit how many
// cards show up, e.g. on the homepage ("Latest 3 blogs").
// -----------------------------------------------------------------------
export async function getFeaturedBlogs(limit: number = 3) {
  return prisma.blog.findMany({
    where: {
      publishStatus: PublishStatus.PUBLISHED,
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

// -----------------------------------------------------------------------
// getBlogBySlug — used on the single blog page.
// Fetches one blog by its unique slug (e.g. /blog/my-first-post).
// -----------------------------------------------------------------------
export async function getBlogBySlug(slug: string) {
  return prisma.blog.findUnique({
    where: { slug },
  });
}

// -----------------------------------------------------------------------
// getAllBlogsForAdmin — optional helper for an admin/dashboard page
// where you need to see DRAFT blogs too, not just published ones.
// -----------------------------------------------------------------------
export async function getAllBlogsForAdmin() {
  return prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });
}