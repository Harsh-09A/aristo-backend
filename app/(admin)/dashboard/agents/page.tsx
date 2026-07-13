import prisma from "@/lib/prisma";
import Link from "next/link";
import Pagination from "@/components/dashboard/Pagination";
import DeleteButton from "@/components/dashboard/DeleteButton";
import { deleteAgent } from "./actions";

const RECORDS_PER_PAGE = 10;

export default async function AgentsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page) || 1);

  const totalCount = await prisma.agent.count();
  const totalPages = Math.max(1, Math.ceil(totalCount / RECORDS_PER_PAGE));

  const agents = await prisma.agent.findMany({
    orderBy: { id: "desc" },
    skip: (currentPage - 1) * RECORDS_PER_PAGE,
    take: RECORDS_PER_PAGE,
  });

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Agents</h1>
        <Link href="/dashboard/agents/new" className="btn btn-primary">
          + Add Agent
        </Link>
      </div>

      <div className="card">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {agents.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-4">
                    No agents yet.
                  </td>
                </tr>
              )}
              {agents.map((agent) => (
                <tr key={agent.id}>
                  <td>{agent.id}</td>
                  <td>{agent.name}</td>
                  <td>{agent.email || "-"}</td>
                  <td>{agent.phone || "-"}</td>
                  <td className="text-end">
                    <Link
                      href={`/dashboard/agents/${agent.id}/edit`}
                      className="btn btn-sm btn-outline-secondary me-2"
                    >
                      Edit
                    </Link>
                    <DeleteButton id={agent.id} deleteAction={deleteAgent} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-3">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/dashboard/agents"
        />
      </div>
    </div>
  );
}
