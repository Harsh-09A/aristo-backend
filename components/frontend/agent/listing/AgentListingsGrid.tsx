// components/frontend/agent/listing/AgentListingsGrid.tsx

import AgentCard from "@/components/frontend/agent/cards/AgentCard";
import type { getAllAgents } from "@/services/agents-service";

// getAllAgents() ab { agents, totalPages } return karta hai,
// isliye sirf "agents" key ka type nikal rahe hain — poora object nahi.
type Agents = Awaited<ReturnType<typeof getAllAgents>>["agents"];

type Props = {
  agents: Agents;
};

const AgentListingsGrid = ({ agents }: Props) => {
  return (
    <div className="row mt15">
      {agents.map((agent) => (
        <div
          className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4"
          key={agent.id}
        >
          <AgentCard agent={agent} />
        </div>
      ))}
    </div>
  );
};

export default AgentListingsGrid;