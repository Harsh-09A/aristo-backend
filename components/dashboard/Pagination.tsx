import Link from "next/link";

// A simple, plain pagination control.
// basePath: the URL of the current list page, e.g. "/dashboard/projects"
export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
}) {
  if (totalPages <= 1) {
    // Nothing to paginate
    return null;
  }

  // Build a simple list of page numbers, e.g. [1, 2, 3, 4, 5]
  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className={`page-item ${currentPage <= 1 ? "disabled" : ""}`}>
          <Link
            className="page-link"
            href={`${basePath}?page=${currentPage - 1}`}
          >
            Previous
          </Link>
        </li>

        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={`page-item ${pageNumber === currentPage ? "active" : ""}`}
          >
            <Link className="page-link" href={`${basePath}?page=${pageNumber}`}>
              {pageNumber}
            </Link>
          </li>
        ))}

        <li
          className={`page-item ${currentPage >= totalPages ? "disabled" : ""}`}
        >
          <Link
            className="page-link"
            href={`${basePath}?page=${currentPage + 1}`}
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
}
