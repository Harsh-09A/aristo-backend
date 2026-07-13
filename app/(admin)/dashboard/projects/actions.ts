"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { makeSlug } from "@/lib/slugify";

// Shape of one Configuration row inside the Project form
export type ConfigurationFormData = {
  value: string;
  price: string; // kept as string from the form input, converted below
  areaValue: string;
  areaLabel: string;
  images: string[];
};

// Shape of the whole Project form
export type ProjectFormData = {
  title: string;
  category: string;
  type: string;
  status: string;
  images: string[];
  address: string;
  googleMapsEmbedUrl: string;
  configurationUnit: string;
  price: string;
  possessionDate: string; // yyyy-mm-dd from an <input type="date">
  area: string;
  reraNumber: string;
  tags: string[];
  highlights: string[];
  description: string;
  parking: string;
  yearBuilt: string;
  locationFeatures: string[];
  publishStatus: "DRAFT" | "PUBLISHED";
  developerId: string;
  locationId: string;
  amenityIds: string[];
  agentIds: string[];
  configurations: ConfigurationFormData[];
};

// Small helper: turn a text form value into a number, or null if it's empty
function toNumberOrNull(value: string): number | null {
  if (value === "" || value === undefined || value === null) {
    return null;
  }
  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
}

// Small helper: turn a yyyy-mm-dd string into a Date, or null if it's empty
function toDateOrNull(value: string): Date | null {
  if (!value) {
    return null;
  }
  return new Date(value);
}

// Builds the plain (non-relation) fields shared by create and update
function buildBaseData(data: ProjectFormData, slug: string) {
  return {
    title: data.title,
    slug,
    category: data.category || null,
    type: data.type || null,
    status: data.status || null,
    images: data.images,
    address: data.address || null,
    googleMapsEmbedUrl: data.googleMapsEmbedUrl || null,
    configurationUnit: data.configurationUnit || "BHK",
    price: toNumberOrNull(data.price),
    possessionDate: toDateOrNull(data.possessionDate),
    area: toNumberOrNull(data.area),
    reraNumber: data.reraNumber || null,
    tags: data.tags,
    highlights: data.highlights,
    description: data.description || null,
    parking: data.parking === "" ? null : Number(data.parking),
    yearBuilt: data.yearBuilt === "" ? null : Number(data.yearBuilt),
    locationFeatures: data.locationFeatures,
    publishStatus: data.publishStatus,
  };
}

export async function createProject(data: ProjectFormData) {
  const slug = makeSlug(data.title);

  // Duplicate check on both title and slug
  const existingProject = await prisma.project.findFirst({
    where: {
      OR: [{ title: data.title }, { slug }],
    },
  });

  if (existingProject) {
    throw new Error("A project with this title already exists.");
  }

  await prisma.project.create({
    data: {
      ...buildBaseData(data, slug),
      developer: { connect: { id: data.developerId } },
      location: { connect: { id: data.locationId } },
      amenities: { connect: data.amenityIds.map((id) => ({ id })) },
      agents: { connect: data.agentIds.map((id) => ({ id })) },
      configurations: {
        create: data.configurations.map((config) => ({
          value: config.value,
          price: toNumberOrNull(config.price),
          areaValue: toNumberOrNull(config.areaValue),
          areaLabel: config.areaLabel || null,
          images: config.images,
        })),
      },
    },
  });

  revalidatePath("/dashboard/projects");
  redirect("/dashboard/projects");
}

export async function updateProject(id: string, data: ProjectFormData) {
  const slug = makeSlug(data.title);

  const existingProject = await prisma.project.findFirst({
    where: {
      OR: [{ title: data.title }, { slug }],
      NOT: { id },
    },
  });

  if (existingProject) {
    throw new Error("A project with this title already exists.");
  }

  // Simplest approach for a beginner-friendly codebase: delete all existing
  // configurations and re-create them fresh every time the project is saved.
  await prisma.configuration.deleteMany({ where: { projectId: id } });

  await prisma.project.update({
    where: { id },
    data: {
      ...buildBaseData(data, slug),
      developer: { connect: { id: data.developerId } },
      location: { connect: { id: data.locationId } },
      // "set" replaces the whole list of connected amenities/agents with this new list
      amenities: { set: data.amenityIds.map((amenityId) => ({ id: amenityId })) },
      agents: { set: data.agentIds.map((agentId) => ({ id: agentId })) },
      configurations: {
        create: data.configurations.map((config) => ({
          value: config.value,
          price: toNumberOrNull(config.price),
          areaValue: toNumberOrNull(config.areaValue),
          areaLabel: config.areaLabel || null,
          images: config.images,
        })),
      },
    },
  });

  revalidatePath("/dashboard/projects");
  redirect("/dashboard/projects");
}

export async function deleteProject(id: string) {
  // Configurations are cleaned up automatically because of onDelete: Cascade
  // in the schema. Many-to-many links are cleaned up by Prisma/Postgres too.
  await prisma.project.delete({ where: { id } });
  revalidatePath("/dashboard/projects");
}
