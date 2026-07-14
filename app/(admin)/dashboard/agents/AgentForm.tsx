"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/dashboard/ImageUploader";
import { createAgent, updateAgent } from "./actions";

export default function AgentForm({
  agent,
}: {
  agent?: {
    id: string;
    name: string;
    email: string | null;
    specialization: string | null;
    phone: string | null;
    photo: string | null;
  };
}) {
  const router = useRouter();
  const isEditing = Boolean(agent);

  const [name, setName] = useState(agent?.name || "");
  const [email, setEmail] = useState(agent?.email || "");
  const [specialization, setSpecialization] = useState(
    agent?.specialization || "",
  );
  const [phone, setPhone] = useState(agent?.phone || "");
  const [photo, setPhoto] = useState<string[]>(
    agent?.photo ? [agent.photo] : [],
  );

  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorMessage("");
    setIsSaving(true);

    const formData = {
      name,
      email,
      specialization,
      phone,
      photo: photo[0] || "",
    };

    try {
      if (isEditing && agent) {
        await updateAgent(agent.id, formData);
      } else {
        await createAgent(formData);
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
        <label className="form-label">Agent Name *</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Specialization</label>
          <input
            type="text"
            className="form-control"
            value={specialization}
            onChange={(event) => setSpecialization(event.target.value)}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
      </div>

      <ImageUploader
        folder="agents"
        label="Photo"
        value={photo}
        onChange={(paths) => setPhoto(paths.slice(-1))}
      />

      <div className="d-flex gap-2 mt-3">
        <button type="submit" className="btn btn-primary" disabled={isSaving}>
          {isSaving ? "Saving..." : isEditing ? "Save Changes" : "Create Agent"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => router.push("/dashboard/agents")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
