import prisma from "@/lib/prisma";
import Link from "next/link";
import Pagination from "@/components/dashboard/Pagination";
import DeleteButton from "@/components/dashboard/DeleteButton";
import { deleteAmenity } from "./actions";

const RECORDS_PER_PAGE = 10;

export default async function AmenitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page) || 1);

  const totalCount = await prisma.amenity.count();
  const totalPages = Math.max(1, Math.ceil(totalCount / RECORDS_PER_PAGE));

  const amenities = await prisma.amenity.findMany({
    orderBy: { id: "desc" },
    skip: (currentPage - 1) * RECORDS_PER_PAGE,
    take: RECORDS_PER_PAGE,
  });

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Amenities</h1>
        <Link href="/dashboard/amenities/new" className="btn btn-primary">
          + Add Amenity
        </Link>
      </div>

      <div className="card">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                {/* <th>ID</th> */}
                <th>Name</th>
                <th>Icon</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {amenities.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-muted py-4">
                    No amenities yet.
                  </td>
                </tr>
              )}
              {amenities.map((amenity) => (
                <tr key={amenity.id}>
                  {/* <td>{amenity.id}</td> */}
                  <td>{amenity.name}</td>
                  <td>
                    {amenity.icon ? (
                      <i className={`bi ${amenity.icon}`}></i>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="text-end">
                    <Link
                      href={`/dashboard/amenities/${amenity.id}/edit`}
                      className="btn btn-sm btn-outline-secondary me-2"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      id={amenity.id}
                      deleteAction={deleteAmenity}
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
          basePath="/dashboard/amenities"
        />
      </div>
    </div>
  );
}
