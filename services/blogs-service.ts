// services/blogs-service.ts

import prisma from "@/lib/prisma";
import { PublishStatus } from "@/generated/prisma/client";

const BLOGS_PER_PAGE = 9; // 3-column grid hai, isliye 9 (3 rows) rakha — jo chahiye badal do

// -----------------------------------------------------------------------
// getBlogs — used on the Blog listing page (cards grid).
// Only shows PUBLISHED blogs, newest first. Drafts stay hidden from
// the public site. Ab pagination bhi karta hai — properties/agents/
// developers wale pattern jaisa hi (page number lo, skip+take lagao,
// totalPages wapas bhejo).
// -----------------------------------------------------------------------
export async function getBlogs(page: number = 1) {
  const pageSize = BLOGS_PER_PAGE;
  const skip = (page - 1) * pageSize;

  const where = {
    publishStatus: PublishStatus.PUBLISHED,
  };

  const [blogs, totalCount] = await Promise.all([
    prisma.blog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.blog.count({ where }),
  ]);

  return {
    blogs,
    totalPages: Math.ceil(totalCount / pageSize),
  };
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
  return prisma.blog.findFirst({
    where: {
      slug,
      publishStatus: PublishStatus.PUBLISHED,
    },
  });
}


// -----------------------------------------------------------------------
// getSimilarBlogs — single blog page ke "Related Posts" section ke liye.
// Same jaisa getSimilarProperties (property-service.ts) — sirf current
// blog ko exclude karke, latest blogs dikha do.
// -----------------------------------------------------------------------
export async function getSimilarBlogs(currentBlogId: string, limit: number = 3) {
  return prisma.blog.findMany({
    where: {
      publishStatus: PublishStatus.PUBLISHED,
      id: { not: currentBlogId }, // current blog khud na dikhe
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}