"use client";

import { useState, useEffect, useImperativeHandle, forwardRef } from "react";

// Parent form ye "handle" use karke ImageUploader ko bolega:
// "ab jo bhi naya file pending hai, usko real upload kar do"
export type ImageUploaderHandle = {
  uploadPendingFiles: () => Promise<string[]>;
};

// Har image ya toh "existing" hai (pehle se DB/server pe saved path)
// ya "pending" hai (abhi sirf user ke browser me select hui hai, upload nahi hui)
type ImageItem =
  | { type: "existing"; path: string }
  | { type: "pending"; file: File; previewUrl: string };

type Props = {
  folder:
    | "projects"
    | "developers"
    | "agents"
    | "blogs"
    | "configurations"
    | "locations";
  initialValue?: string[]; // agar edit mode hai, pehle se saved paths
  label?: string;
  maxFiles?: number; // e.g. 1 = single photo (naya file select karne par purana replace ho)
};

const ImageUploader = forwardRef<ImageUploaderHandle, Props>(function ImageUploader(
  { folder, initialValue = [], label, maxFiles },
  ref,
) {
  // Component apna khud ka state rakhta hai — existing + pending dono ek hi list me
  const [items, setItems] = useState<ImageItem[]>(
    initialValue.map((path) => ({ type: "existing", path })),
  );
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Component unmount hone par blob preview URLs cleanup karo (memory leak se bachne ke liye)
  useEffect(() => {
    return () => {
      items.forEach((item) => {
        if (item.type === "pending") {
          URL.revokeObjectURL(item.previewUrl);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // User ne naya file(s) select kiya — bas local preview banao, server pe kuch mat bhejo abhi
  function handleFileSelection(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) {
      return;
    }

    const newItems: ImageItem[] = Array.from(selectedFiles).map((file) => ({
      type: "pending",
      file,
      previewUrl: URL.createObjectURL(file), // browser ke andar hi ek temporary preview URL
    }));

    setErrorMessage("");
    setItems((prev) => {
      if (maxFiles) {
        // Single-photo mode: purana replace kar do, naya rakh lo
        prev.forEach((item) => {
          if (item.type === "pending") URL.revokeObjectURL(item.previewUrl);
        });
        return newItems.slice(0, maxFiles);
      }
      return [...prev, ...newItems];
    });

    event.target.value = "";
  }

  // "x" button dabane par ek image list se hata do (pending ho ya existing, dono chalega)
  function handleRemoveImage(itemToRemove: ImageItem) {
    if (itemToRemove.type === "pending") {
      URL.revokeObjectURL(itemToRemove.previewUrl);
    }
    setItems((prev) => prev.filter((item) => item !== itemToRemove));
  }

  // Ye function parent form call karega apne handleSubmit ke andar, save karne se THIK PEHLE
  useImperativeHandle(
    ref,
    () => ({
      async uploadPendingFiles() {
        const pendingItems = items.filter(
          (item): item is Extract<ImageItem, { type: "pending" }> =>
            item.type === "pending",
        );

        const existingPaths = items
          .filter(
            (item): item is Extract<ImageItem, { type: "existing" }> =>
              item.type === "existing",
          )
          .map((item) => item.path);

        // Koi naya file select hi nahi hua — purane paths jaise the waise hi return karo,
        // koi upload call bhi nahi hogi
        if (pendingItems.length === 0) {
          return existingPaths;
        }

        setIsUploading(true);
        setErrorMessage("");

        try {
          const formData = new FormData();
          formData.append("folder", folder);
          pendingItems.forEach((item) => formData.append("files", item.file));

          const response = await fetch("/api/upload", {
            method: "POST",
            headers: {
              "x-internal-api-key":
                process.env.NEXT_PUBLIC_INTERNAL_API_KEY || "",
            },
            body: formData,
          });

          const result = await response.json();

          if (!response.ok) {
            setErrorMessage(result.error || "Upload failed");
            throw new Error(result.error || "Upload failed");
          }

          // Ab real files upload ho gayi, local blob previews ki zaroorat nahi
          pendingItems.forEach((item) => URL.revokeObjectURL(item.previewUrl));

          const finalPaths = [...existingPaths, ...result.paths];

          // State ko "sab kuch ab existing hai" wali state me update kar do
          setItems(finalPaths.map((path) => ({ type: "existing", path })));

          return finalPaths;
        } finally {
          setIsUploading(false);
        }
      },
    }),
    [items, folder],
  );

  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}

      <input
        type="file"
        className="form-control"
        multiple={!maxFiles || maxFiles > 1}
        accept="image/*"
        onChange={handleFileSelection}
        disabled={isUploading}
      />

      {isUploading && (
        <div className="form-text text-primary">Uploading, please wait...</div>
      )}
      {errorMessage && <div className="form-text text-danger">{errorMessage}</div>}

      {items.length > 0 && (
        <div className="image-preview-grid">
          {items.map((item) => (
            <div
              key={item.type === "existing" ? item.path : item.previewUrl}
              className="image-preview-item"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.type === "existing" ? item.path : item.previewUrl}
                alt="Preview"
              />
              <button
                type="button"
                className="btn btn-sm btn-danger image-preview-remove-btn"
                onClick={() => handleRemoveImage(item)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default ImageUploader;