import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import AgentForm from "../../AgentForm";

export default async function EditAgentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const agent = await prisma.agent.findUnique({
    where: { id: id },
  });

  if (!agent) {
    notFound();
  }

  return (
    <div>
      <h1 className="h3 mb-4">Edit Agent</h1>
      <div className="card">
        <div className="card-body">
          <AgentForm agent={agent} />
        </div>
      </div>
    </div>
  );
}
