import prisma from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import Link from "next/link";
import Pagination from "@/components/dashboard/Pagination";
import DeleteButton from "@/components/dashboard/DeleteButton";
import { deleteProject } from "./actions";

const RECORDS_PER_PAGE = 10;

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page) || 1);
  const query = (params.q ?? "").trim();

  const where: Prisma.ProjectWhereInput = query
    ? {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { developer: { name: { contains: query, mode: "insensitive" } } },
          { location: { name: { contains: query, mode: "insensitive" } } },
        ],
      }
    : {};

  const totalCount = await prisma.project.count({ where });
  const totalPages = Math.max(1, Math.ceil(totalCount / RECORDS_PER_PAGE));

  const projects = await prisma.project.findMany({
    where,
    orderBy: { updatedAt: "desc" },
    skip: (currentPage - 1) * RECORDS_PER_PAGE,
    take: RECORDS_PER_PAGE,
    include: {
      developer: true,
      location: true,
    },
  });

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Projects</h1>
        <Link href="/dashboard/projects/new" className="btn btn-primary">
          + Add Project
        </Link>
      </div>

      <div className="card mb-3">
        <div className="card-body py-3">
          <form method="GET" className="d-flex gap-2">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search by title, developer, or location..."
              className="form-control"
            />
            <button type="submit" className="btn btn-outline-primary">
              Search
            </button>
            {query && (
              <Link
                href="/dashboard/projects"
                className="btn btn-outline-secondary"
              >
                Clear
              </Link>
            )}
          </form>
        </div>
      </div>

      <div className="card">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Developer</th>
                <th>Location</th>
                <th>Price</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-4">
                    {query
                      ? `No projects found for "${query}".`
                      : "No projects yet."}
                  </td>
                </tr>
              )}
              {projects.map((project) => (
                <tr key={project.id}>
                  {/* <td>{project.id}</td> */}
                  <td>
                    {project.images[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.images[0] }
                        alt={project.title}
                        style={{
                          width: 48,
                          height: 48,
                          objectFit: "cover",
                          borderRadius: 6,
                        }}
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>{project.title}</td>
                  <td>{project.developer.name}</td>
                  <td>{project.location.name}</td>
                  <td>{project.price ?? "-"}</td>
                  <td>
                    <span
                      className={`badge ${
                        project.publishStatus === "PUBLISHED"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {project.publishStatus}
                    </span>
                  </td>
                  <td className="text-end">
                    <Link
                      href={`/dashboard/projects/${project.id}/edit`}
                      className="btn btn-sm btn-outline-secondary me-2"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      id={project.id}
                      deleteAction={deleteProject}
                    />
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
          basePath="/dashboard/projects"
        />
      </div>
    </div>
  );
}
