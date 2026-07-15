"use client";

import { useState } from "react";

// This component lets the user pick multiple images, shows a preview grid,
// uploads them to our /api/upload route, and reports the final list of
// saved image paths back to the parent form through onChange.
export default function ImageUploader({
  folder,
  value,
  onChange,
  label,
}: {
  folder:
    | "projects"
    | "developers"
    | "agents"
    | "blogs"
    | "configurations"
    | "locations";
  value: string[]; // current list of saved image paths
  onChange: (paths: string[]) => void;
  label?: string;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Called whenever the user picks new files from the file input
  async function handleFileSelection(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) {
      return;
    }

    setIsUploading(true);
    setErrorMessage("");

    // Build the form data to send to our upload API
    const formData = new FormData();
    formData.append("folder", folder);
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          // Simple internal check so only our own app can use this route
          "x-internal-api-key": process.env.NEXT_PUBLIC_INTERNAL_API_KEY || "",
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.error || "Upload failed");
      } else {
        // Add the newly uploaded image paths to our existing list
        onChange([...value, ...result.paths]);
      }
    } catch (error) {
      setErrorMessage("Something went wrong while uploading");
    } finally {
      setIsUploading(false);
      // Reset the input so the same file can be selected again later if needed
      event.target.value = "";
    }
  }

  // Called when the user clicks the "x" button on a preview image
  function handleRemoveImage(pathToRemove: string) {
    const updatedList = value.filter((path) => path !== pathToRemove);
    onChange(updatedList);
  }

  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}

      <input
        type="file"
        className="form-control"
        multiple
        accept="image/*"
        onChange={handleFileSelection}
        disabled={isUploading}
      />

      {isUploading && (
        <div className="form-text text-primary">Uploading, please wait...</div>
      )}
      {errorMessage && <div className="form-text text-danger">{errorMessage}</div>}

      {value.length > 0 && (
        <div className="image-preview-grid">
          {value.map((imagePath) => (
            <div key={imagePath} className="image-preview-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imagePath} alt="Uploaded preview" />
              <button
                type="button"
                className="btn btn-sm btn-danger image-preview-remove-btn"
                onClick={() => handleRemoveImage(imagePath)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
