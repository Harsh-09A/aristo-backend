// app/agent/[slug]/page.tsx

import { notFound } from "next/navigation";
import { getAgentBySlug, getAgentProjects } from "@/services/agents-service";
import AgentSinglePage from "@/components/frontend/developer/AgentSinglePage";


type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const agent = await getAgentBySlug(slug);

  return {
    title: agent ? `${agent.name} | Agents` : "Agent Not Found",
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = await searchParams;

  // Read ?page=2 from the URL, default to page 1
  const currentPage = Math.max(1, Number(sp.page) || 1);

  const agent = await getAgentBySlug(slug);
  if (!agent) {
    notFound();
  }

  const { projects, totalPages } = await getAgentProjects(agent.id, currentPage);

  return (
    <AgentSinglePage
      agent={agent}
      projects={projects}
      currentPage={currentPage}
      totalPages={totalPages}
      searchParams={sp}
    />
  );
}