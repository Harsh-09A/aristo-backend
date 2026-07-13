"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/dashboard/ImageUploader";
import { createBlog, updateBlog } from "./actions";

export default function BlogForm({
  blog,
}: {
  blog?: {
    id: string;
    title: string;
    body: string;
    images: string[];
    publishStatus: "DRAFT" | "PUBLISHED";
  };
}) {
  const router = useRouter();
  const isEditing = Boolean(blog);

  const [title, setTitle] = useState(blog?.title || "");
  const [body, setBody] = useState(blog?.body || "");
  const [images, setImages] = useState<string[]>(blog?.images || []);
  const [publishStatus, setPublishStatus] = useState<"DRAFT" | "PUBLISHED">(
    blog?.publishStatus || "DRAFT"
  );

  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorMessage("");
    setIsSaving(true);

    const formData = { title, body, images, publishStatus };

    try {
      if (isEditing && blog) {
        await updateBlog(blog.id, formData);
      } else {
        await createBlog(formData);
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <div className="mb-3">
        <label className="form-label">Title *</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Body Content *</label>
        <textarea
          className="form-control"
          rows={8}
          value={body}
          onChange={(event) => setBody(event.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Publish Status</label>
        <select
          className="form-select"
          value={publishStatus}
          onChange={(event) =>
            setPublishStatus(event.target.value as "DRAFT" | "PUBLISHED")
          }
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
        </select>
      </div>

      <ImageUploader
        folder="blogs"
        label="Images"
        value={images}
        onChange={setImages}
      />

      <div className="d-flex gap-2 mt-3">
        <button type="submit" className="btn btn-primary" disabled={isSaving}>
          {isSaving ? "Saving..." : isEditing ? "Save Changes" : "Create Blog Post"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => router.push("/dashboard/blogs")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
