"use server";

import prisma from "@/lib/prisma";
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

  await prisma.location.create({
    data: {
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

  await prisma.location.update({
    where: { id },
    data: {
      name: data.name,
      state: data.state || null,
      image: data.image || null,
    },
  });

  revalidatePath("/dashboard/locations");
  redirect("/dashboard/locations");
}

export async function deleteLocation(id: string) {
  await prisma.location.delete({ where: { id } });
  revalidatePath("/dashboard/locations");
}
