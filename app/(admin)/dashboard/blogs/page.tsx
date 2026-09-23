import prisma from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import Link from "next/link";
import Pagination from "@/components/dashboard/Pagination";
import DeleteButton from "@/components/dashboard/DeleteButton";
import { deleteBlog } from "./actions";

const RECORDS_PER_PAGE = 10;

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page) || 1);
  const query = (params.q ?? "").trim();

  const where: Prisma.BlogWhereInput = query
    ? {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { slug: { contains: query, mode: "insensitive" } },
        ],
      }
    : {};

  const totalCount = await prisma.blog.count({ where });
  const totalPages = Math.max(1, Math.ceil(totalCount / RECORDS_PER_PAGE));

  const blogs = await prisma.blog.findMany({
    where,
    orderBy: { updatedAt: "desc" },
    skip: (currentPage - 1) * RECORDS_PER_PAGE,
    take: RECORDS_PER_PAGE,
  });

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Blog Posts</h1>
        <Link href="/dashboard/blogs/new" className="btn btn-primary">
          + Add Blog Post
        </Link>
      </div>

      <div className="card mb-3">
        <div className="card-body py-3">
          <form method="GET" className="d-flex gap-2">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search by title or slug..."
              className="form-control"
            />
            <button type="submit" className="btn btn-outline-primary">
              Search
            </button>
            {query && (
              <Link
                href="/dashboard/blogs"
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
                <th>Slug</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-4">
                    {query
                      ? `No blog posts found for "${query}".`
                      : "No blog posts yet."}
                  </td>
                </tr>
              )}
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  {/* <td>{blog.id}</td> */}
                  <td>
                    {blog.images ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={blog.images[0]}
                        alt={blog.title}
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
                  <td>{blog.title}</td>
                  <td className="text-muted">{blog.slug}</td>
                  <td>
                    <span
                      className={`badge ${
                        blog.publishStatus === "PUBLISHED"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {blog.publishStatus}
                    </span>
                  </td>
                  <td className="text-end">
                    <Link
                      href={`/blog/${blog.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary me-2"
                    >
                      View
                    </Link>
                    <Link
                      href={`/dashboard/blogs/${blog.id}/edit`}
                      className="btn btn-sm btn-outline-secondary me-2"
                    >
                      Edit
                    </Link>
                    <DeleteButton id={blog.id} deleteAction={deleteBlog} />
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
          basePath="/dashboard/blogs"
        />
      </div>
    </div>
  );
}
