import prisma from "@/lib/prisma";
import Link from "next/link";
import Pagination from "@/components/dashboard/Pagination";
import DeleteButton from "@/components/dashboard/DeleteButton";
import { deleteDeveloper } from "./actions";

const RECORDS_PER_PAGE = 10;

export default async function DevelopersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page) || 1);

  const totalCount = await prisma.developer.count();
  const totalPages = Math.max(1, Math.ceil(totalCount / RECORDS_PER_PAGE));

  const developers = await prisma.developer.findMany({
    orderBy: { name: "asc" },
    skip: (currentPage - 1) * RECORDS_PER_PAGE,
    take: RECORDS_PER_PAGE,
  });

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Developers</h1>
        <Link href="/dashboard/developers/new" className="btn btn-primary">
          + Add Developer
        </Link>
      </div>

      <div className="card">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>Logo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Website</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {developers.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-4">
                    No developers yet.
                  </td>
                </tr>
              )}
              {developers.map((developer) => (
                <tr key={developer.id}>
                  {/* <td>{developer.id}</td> */}
                  <td>
                    {developer.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={developer.logo}
                        alt={developer.name}
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
                  <td>{developer.name}</td>
                  <td>{developer.email || "-"}</td>
                  <td>{developer.phone || "-"}</td>
                  <td>{developer.website || "-"}</td>
                  <td className="text-end">
                    <Link
                      href={`/dashboard/developers/${developer.id}/edit`}
                      className="btn btn-sm btn-outline-secondary me-2"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      id={developer.id}
                      deleteAction={deleteDeveloper}
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
          basePath="/dashboard/developers"
        />
      </div>
    </div>
  );
}
