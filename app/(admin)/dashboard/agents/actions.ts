"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type AgentFormData = {
  name: string;
  email: string;
  phone: string;
  photo: string;
};

export async function createAgent(data: AgentFormData) {
  const existingAgent = await prisma.agent.findFirst({
    where: { name: data.name },
  });

  if (existingAgent) {
    throw new Error("An agent with this name already exists.");
  }

  await prisma.agent.create({
    data: {
      name: data.name,
      email: data.email || null,
      phone: data.phone || null,
      photo: data.photo || null,
    },
  });

  revalidatePath("/dashboard/agents");
  redirect("/dashboard/agents");
}

export async function updateAgent(id: string, data: AgentFormData) {
  const existingAgent = await prisma.agent.findFirst({
    where: { name: data.name, NOT: { id } },
  });

  if (existingAgent) {
    throw new Error("An agent with this name already exists.");
  }

  await prisma.agent.update({
    where: { id },
    data: {
      name: data.name,
      email: data.email || null,
      phone: data.phone || null,
      photo: data.photo || null,
    },
  });

  revalidatePath("/dashboard/agents");
  redirect("/dashboard/agents");
}

export async function deleteAgent(id: string) {
  await prisma.agent.delete({ where: { id } });
  revalidatePath("/dashboard/agents");
}
