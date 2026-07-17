// app/agent/page.tsx

import { getAllAgents } from "@/services/agents-service";
import AgentListingsGrid from "@/components/frontend/agent/listing/AgentListingsGrid";
import Pagination from "@/components/frontend/common/pagination/Pagination";
import SectionHeading from "@/components/frontend/common/sections/SectionHeading";

export const metadata = {
  title: "All Agents",
};

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function AgentsPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const currentPage = Math.max(1, Number(sp.page) || 1);

  const { agents, totalPages } = await getAllAgents(currentPage);

  return (
    <div className="container pt60 pb60">
      {/* <h2 className="mb30">All Agents</h2> */}
      <SectionHeading
        heading={"Agents"}
        title={"All"}
        highlight={"Agents"}
        subtitle={"Lorem ipsum dolor sit, amet consectetur"}
      />

      {agents.length > 0 ? (
        <>
          <AgentListingsGrid agents={agents} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchParams={sp}
            basePath="/agent"
          />
        </>
      ) : (
        <p className="text mt30">No agents found.</p>
      )}
    </div>
  );
}
