import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import BlogForm from "../../BlogForm";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const blog = await prisma.blog.findUnique({
    where: { id: id },
  });

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <h1 className="h3 mb-4">Edit Blog Post</h1>
      <div className="card">
        <div className="card-body">
          <BlogForm blog={blog} />
        </div>
      </div>
    </div>
  );
}
