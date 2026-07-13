import BlogForm from "../BlogForm";

export default function NewBlogPage() {
  return (
    <div>
      <h1 className="h3 mb-4">Add Blog Post</h1>
      <div className="card">
        <div className="card-body">
          <BlogForm />
        </div>
      </div>
    </div>
  );
}
