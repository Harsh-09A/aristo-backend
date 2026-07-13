"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// A small reusable delete button used on every list page.
// It asks for confirmation, then calls whatever server action was passed in.
export default function DeleteButton({
  id,
  deleteAction,
}: {
  id: string;
  deleteAction: (id: string) => Promise<void>;
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleDelete() {
    const confirmed = window.confirm("Are you sure you want to delete this record?");
    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    setErrorMessage("");

    try {
      await deleteAction(id);
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Could not delete this record"
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-sm btn-outline-danger"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
      {errorMessage && (
        <div className="text-danger small mt-1">{errorMessage}</div>
      )}
    </>
  );
}
