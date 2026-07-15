"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import ImageUploader, {
  ImageUploaderHandle,
} from "@/components/dashboard/ImageUploader";
import { createLocation, updateLocation } from "./actions";

export default function LocationForm({
  location,
}: {
  location?: {
    id: string;
    name: string;
    state: string | null;
    image: string | null;
  };
}) {
  const router = useRouter();
  const isEditing = Boolean(location);

  const [name, setName] = useState(location?.name || "");
  const [state, setState] = useState(location?.state || "");

  const imageUploaderRef = useRef<ImageUploaderHandle>(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorMessage("");
    setIsSaving(true);

    try {
      const imagePaths =
        (await imageUploaderRef.current?.uploadPendingFiles()) || [];

      const formData = { name, state, image: imagePaths[0] || "" };

      if (isEditing && location) {
        await updateLocation(location.id, formData);
      } else {
        await createLocation(formData);
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
        <label className="form-label">Location Name *</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. Andheri West"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">State</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. Maharashtra"
          value={state}
          onChange={(event) => setState(event.target.value)}
        />
      </div>

      <ImageUploader
        ref={imageUploaderRef}
        folder="locations"
        label="Featured Image"
        initialValue={location?.image ? [location.image] : []}
        maxFiles={1}
      />

      <div className="d-flex gap-2 mt-3">
        <button type="submit" className="btn btn-primary" disabled={isSaving}>
          {isSaving ? "Saving..." : isEditing ? "Save Changes" : "Create Location"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => router.push("/dashboard/locations")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
