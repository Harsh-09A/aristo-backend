"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAmenity, updateAmenity } from "./actions";

export default function AmenityForm({
  amenity,
}: {
  amenity?: { id: string; name: string; icon: string | null };
}) {
  const router = useRouter();
  const isEditing = Boolean(amenity);

  const [name, setName] = useState(amenity?.name || "");
  const [icon, setIcon] = useState(amenity?.icon || "");

  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorMessage("");
    setIsSaving(true);

    const formData = { name, icon };

    try {
      if (isEditing && amenity) {
        await updateAmenity(amenity.id, formData);
      } else {
        await createAmenity(formData);
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
        <label className="form-label">Amenity Name *</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. Swimming Pool"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Icon (Bootstrap Icon class name)</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. bi-water"
          value={icon}
          onChange={(event) => setIcon(event.target.value)}
        />
        <div className="form-text">
          Browse icon names at{" "}
          <a href="https://icons.getbootstrap.com" target="_blank" rel="noreferrer">
            icons.getbootstrap.com
          </a>
        </div>
      </div>

      <div className="d-flex gap-2 mt-3">
        <button type="submit" className="btn btn-primary" disabled={isSaving}>
          {isSaving ? "Saving..." : isEditing ? "Save Changes" : "Create Amenity"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => router.push("/dashboard/amenities")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
