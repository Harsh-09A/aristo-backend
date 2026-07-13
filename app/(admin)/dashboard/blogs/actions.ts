"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { makeSlug } from "@/lib/slugify";

type BlogFormData = {
  title: string;
  body: string;
  images: string[];
  publishStatus: "DRAFT" | "PUBLISHED";
};

export async function createBlog(data: BlogFormData) {
  const slug = makeSlug(data.title);

  // Duplicate check on both title and slug
  const existingBlog = await prisma.blog.findFirst({
    where: {
      OR: [{ title: data.title }, { slug }],
    },
  });

  if (existingBlog) {
    throw new Error("A blog post with this title already exists.");
  }

  await prisma.blog.create({
    data: {
      title: data.title,
      slug,
      body: data.body,
      images: data.images,
      publishStatus: data.publishStatus,
    },
  });

  revalidatePath("/dashboard/blogs");
  redirect("/dashboard/blogs");
}

export async function updateBlog(id: string, data: BlogFormData) {
  const slug = makeSlug(data.title);

  const existingBlog = await prisma.blog.findFirst({
    where: {
      OR: [{ title: data.title }, { slug }],
      NOT: { id },
    },
  });

  if (existingBlog) {
    throw new Error("A blog post with this title already exists.");
  }

  await prisma.blog.update({
    where: { id },
    data: {
      title: data.title,
      slug,
      body: data.body,
      images: data.images,
      publishStatus: data.publishStatus,
    },
  });

  revalidatePath("/dashboard/blogs");
  redirect("/dashboard/blogs");
}

export async function deleteBlog(id: string) {
  await prisma.blog.delete({ where: { id } });
  revalidatePath("/dashboard/blogs");
}
