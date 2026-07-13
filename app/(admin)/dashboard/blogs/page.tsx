import prisma from "@/lib/prisma";
import Link from "next/link";
import Pagination from "@/components/dashboard/Pagination";
import DeleteButton from "@/components/dashboard/DeleteButton";
import { deleteBlog } from "./actions";

const RECORDS_PER_PAGE = 10;

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page) || 1);

  const totalCount = await prisma.blog.count();
  const totalPages = Math.max(1, Math.ceil(totalCount / RECORDS_PER_PAGE));

  const blogs = await prisma.blog.findMany({
    orderBy: { id: "desc" },
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

      <div className="card">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
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
                    No blog posts yet.
                  </td>
                </tr>
              )}
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td>{blog.id}</td>
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
