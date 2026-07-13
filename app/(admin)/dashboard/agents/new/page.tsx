import AgentForm from "../AgentForm";

export default function NewAgentPage() {
  return (
    <div>
      <h1 className="h3 mb-4">Add Agent</h1>
      <div className="card">
        <div className="card-body">
          <AgentForm />
        </div>
      </div>
    </div>
  );
}
