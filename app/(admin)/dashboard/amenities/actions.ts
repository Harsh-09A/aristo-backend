"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type AmenityFormData = {
  name: string;
  icon: string;
};

export async function createAmenity(data: AmenityFormData) {
  const existingAmenity = await prisma.amenity.findFirst({
    where: { name: data.name },
  });

  if (existingAmenity) {
    throw new Error("An amenity with this name already exists.");
  }

  await prisma.amenity.create({
    data: {
      name: data.name,
      icon: data.icon || null,
    },
  });

  revalidatePath("/dashboard/amenities");
  redirect("/dashboard/amenities");
}

export async function updateAmenity(id: string, data: AmenityFormData) {
  const existingAmenity = await prisma.amenity.findFirst({
    where: { name: data.name, NOT: { id } },
  });

  if (existingAmenity) {
    throw new Error("An amenity with this name already exists.");
  }

  await prisma.amenity.update({
    where: { id },
    data: {
      name: data.name,
      icon: data.icon || null,
    },
  });

  revalidatePath("/dashboard/amenities");
  redirect("/dashboard/amenities");
}

export async function deleteAmenity(id: string) {
  await prisma.amenity.delete({ where: { id } });
  revalidatePath("/dashboard/amenities");
}
