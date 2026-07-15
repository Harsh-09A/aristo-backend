"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import ImageUploader, {
  ImageUploaderHandle,
} from "@/components/dashboard/ImageUploader";
import { createDeveloper, updateDeveloper } from "./actions";

// This same form component is used for both "Add Developer" and "Edit Developer".
// If `developer` is passed in, we're editing. Otherwise we're creating a new one.
export default function DeveloperForm({
  developer,
}: {
  developer?: {
    id: string;
    name: string;
    logo: string | null;
    description: string | null;
    email: string | null;
    phone: string | null;
    website: string | null;
  };
}) {
  const router = useRouter();
  const isEditing = Boolean(developer);

  const [name, setName] = useState(developer?.name || "");
  const [description, setDescription] = useState(developer?.description || "");
  const [email, setEmail] = useState(developer?.email || "");
  const [phone, setPhone] = useState(developer?.phone || "");
  const [website, setWebsite] = useState(developer?.website || "");

  // logo ka state ab nahi chahiye — ImageUploader khud manage karta hai
  const logoUploaderRef = useRef<ImageUploaderHandle>(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorMessage("");
    setIsSaving(true);

    try {
      // Submit dabate hi naya logo (agar select hua ho) yahan upload hota hai
      const logoPaths =
        (await logoUploaderRef.current?.uploadPendingFiles()) || [];

      const formData = {
        name,
        logo: logoPaths[0] || "",
        description,
        email,
        phone,
        website,
      };

      if (isEditing && developer) {
        await updateDeveloper(developer.id, formData);
      } else {
        await createDeveloper(formData);
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong",
      );
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <div className="mb-3">
        <label className="form-label">Developer Name *</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          rows={3}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Website</label>
          <input
            type="text"
            className="form-control"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </div>
      </div>

      <ImageUploader
        ref={logoUploaderRef}
        folder="developers"
        label="Logo"
        initialValue={developer?.logo ? [developer.logo] : []}
        maxFiles={1}
      />

      <div className="d-flex gap-2 mt-3">
        <button type="submit" className="btn btn-primary" disabled={isSaving}>
          {isSaving
            ? "Saving..."
            : isEditing
              ? "Save Changes"
              : "Create Developer"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => router.push("/dashboard/developers")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
