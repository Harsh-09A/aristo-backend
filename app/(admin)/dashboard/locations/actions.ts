"use server";

import prisma from "@/lib/prisma";
import { makeSlug } from "@/lib/slugify";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type LocationFormData = {
  name: string;
  state: string;
  image: string;
};

export async function createLocation(data: LocationFormData) {
  const existingLocation = await prisma.location.findFirst({
    where: { name: data.name },
  });

  if (existingLocation) {
    throw new Error("A location with this name already exists.");
  }

  const slug = makeSlug(data.name);

  await prisma.location.create({
    data: {
      slug: slug,
      name: data.name,
      state: data.state || null,
      image: data.image || null,
    },
  });

  revalidatePath("/dashboard/locations");
  redirect("/dashboard/locations");
}

export async function updateLocation(id: string, data: LocationFormData) {
  const existingLocation = await prisma.location.findFirst({
    where: { name: data.name, NOT: { id } },
  });

  if (existingLocation) {
    throw new Error("A location with this name already exists.");
  }

  const slug = makeSlug(data.name);

  await prisma.location.update({
    where: { id },
    data: {
      name: data.name,
      slug: slug,
      state: data.state || null,
      image: data.image || null,
    },
  });

  revalidatePath("/dashboard/locations");
  redirect("/dashboard/locations");
}

export async function deleteLocation(id: string) {
  const projectCount = await prisma.project.count({
    where: { locationId: id },
  });

  if (projectCount > 0) {
    throw new Error(
      `Can't delete this location — ${projectCount} project${projectCount === 1 ? " is" : "s are"} still assigned to it. Reassign or delete ${projectCount === 1 ? "it" : "them"} first.`,
    );
  }

  await prisma.location.delete({ where: { id } });
  revalidatePath("/dashboard/locations");
}
