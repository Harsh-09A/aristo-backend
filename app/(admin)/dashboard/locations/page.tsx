import prisma from "@/lib/prisma";
import Link from "next/link";
import Pagination from "@/components/dashboard/Pagination";
import DeleteButton from "@/components/dashboard/DeleteButton";
import { deleteLocation } from "./actions";

const RECORDS_PER_PAGE = 10;

export default async function LocationsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page) || 1);

  const totalCount = await prisma.location.count();
  const totalPages = Math.max(1, Math.ceil(totalCount / RECORDS_PER_PAGE));

  const locations = await prisma.location.findMany({
    orderBy: { name: "asc" },
    skip: (currentPage - 1) * RECORDS_PER_PAGE,
    take: RECORDS_PER_PAGE,
  });

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Locations</h1>
        <Link href="/dashboard/locations/new" className="btn btn-primary">
          + Add Location
        </Link>
      </div>

      <div className="card">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                {/* <th>ID</th> */}
                <th>Image</th>
                <th>Name</th>
                <th>State</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {locations.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-4">
                    No locations yet.
                  </td>
                </tr>
              )}
              {locations.map((location) => (
                <tr key={location.id}>
                  {/* <td>{location.id}</td> */}
                  <td>
                    {location.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={location.image}
                        alt={location.name}
                        style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 6 }}
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>{location.name}</td>
                  <td>{location.state || "-"}</td>
                  <td className="text-end">
                    <Link
                      href={`/dashboard/locations/${location.id}/edit`}
                      className="btn btn-sm btn-outline-secondary me-2"
                    >
                      Edit
                    </Link>
                    <DeleteButton id={location.id} deleteAction={deleteLocation} />
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
          basePath="/dashboard/locations"
        />
      </div>
    </div>
  );
}
