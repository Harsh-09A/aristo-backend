"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Shape of the data we expect from the Developer form
type DeveloperFormData = {
  name: string;
  logo: string; // path to the uploaded logo, or empty string
  description: string;
  email: string;
  phone: string;
  website: string;
};

// Create a new Developer
export async function createDeveloper(data: DeveloperFormData) {
  // Basic duplicate check: don't allow two developers with the exact same name
  const existingDeveloper = await prisma.developer.findFirst({
    where: { name: data.name },
  });

  if (existingDeveloper) {
    throw new Error("A developer with this name already exists.");
  }

  await prisma.developer.create({
    data: {
      name: data.name,
      logo: data.logo || null,
      description: data.description || null,
      email: data.email || null,
      phone: data.phone || null,
      website: data.website || null,
    },
  });

  revalidatePath("/dashboard/developers");
  redirect("/dashboard/developers");
}

// Update an existing Developer
export async function updateDeveloper(id: string, data: DeveloperFormData) {
  // Duplicate check, but ignore the current record itself
  const existingDeveloper = await prisma.developer.findFirst({
    where: {
      name: data.name,
      NOT: { id: id },
    },
  });

  if (existingDeveloper) {
    throw new Error("A developer with this name already exists.");
  }

  await prisma.developer.update({
    where: { id },
    data: {
      name: data.name,
      logo: data.logo || null,
      description: data.description || null,
      email: data.email || null,
      phone: data.phone || null,
      website: data.website || null,
    },
  });

  revalidatePath("/dashboard/developers");
  redirect("/dashboard/developers");
}

// Delete a Developer
export async function deleteDeveloper(id: string) {
  await prisma.developer.delete({ where: { id } });
  revalidatePath("/dashboard/developers");
}
