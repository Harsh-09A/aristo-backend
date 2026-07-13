"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/dashboard/ImageUploader";
import GooglePlacesPlaceholder from "@/components/dashboard/GooglePlacesPlaceholder";
import {
  createProject,
  updateProject,
  type ConfigurationFormData,
} from "./actions";

import {
  CATEGORY_OPTIONS,
  TYPE_OPTIONS_BY_CATEGORY,
  STATUS_OPTIONS,
} from "@/lib/constants/project";

// Simple dropdown option shapes
type Option = { id: string; name: string };

// One configuration row in the UI. It has a local "key" just so React can
// track each row in the list (this key is never saved to the database).
type ConfigurationRow = ConfigurationFormData & { key: string };

function makeEmptyConfigurationRow(): ConfigurationRow {
  return {
    key: `new-${Date.now()}-${Math.random()}`,
    value: "",
    price: "",
    areaValue: "",
    areaLabel: "",
    images: [],
  };
}

// Turns a comma separated string like "Pool, Gym, Garden" into ["Pool", "Gym", "Garden"]
function textToList(text: string): string[] {
  return text
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

// Turns ["Pool", "Gym"] back into "Pool, Gym" for showing inside a text input
function listToText(list: string[]): string {
  return list.join(", ");
}

export default function ProjectForm({
  project,
  developers,
  locations,
  amenities,
  agents,
}: {
  project?: {
    id: string;
    title: string;
    category: string | null;
    type: string | null;
    status: string | null;
    images: string[];
    address: string | null;
    googleMapsEmbedUrl: string | null;
    configurationUnit: string;
    price: number | null;
    possessionDate: Date | null;
    area: number | null;
    reraNumber: string | null;
    tags: string[];
    highlights: string[];
    description: string | null;
    parking: number | null;
    yearBuilt: number | null;
    locationFeatures: string[];
    publishStatus: "DRAFT" | "PUBLISHED";
    developerId: string;
    locationId: string;
    amenities: { id: string }[];
    agents: { id: string }[];
    configurations: {
      id: string;
      value: string;
      price: number | null;
      areaValue: number | null;
      areaLabel: string | null;
      images: string[];
    }[];
  };
  developers: Option[];
  locations: Option[];
  amenities: Option[];
  agents: Option[];
}) {
  const router = useRouter();
  const isEditing = Boolean(project);

  // --- Basic fields ---
  const [title, setTitle] = useState(project?.title || "");
  const [category, setCategory] = useState(project?.category || "");
  const [type, setType] = useState(project?.type || "");
  const [status, setStatus] = useState(project?.status || "");
  const [images, setImages] = useState<string[]>(project?.images || []);
  const [address, setAddress] = useState(project?.address || "");
  const [googleMapsEmbedUrl, setGoogleMapsEmbedUrl] = useState(
    project?.googleMapsEmbedUrl || "",
  );
  const [configurationUnit, setConfigurationUnit] = useState(
    project?.configurationUnit || "BHK",
  );
  const [price, setPrice] = useState(project?.price?.toString() || "");
  const [possessionDate, setPossessionDate] = useState(
    project?.possessionDate
      ? new Date(project.possessionDate).toISOString().slice(0, 10)
      : "",
  );
  const [area, setArea] = useState(project?.area?.toString() || "");
  const [reraNumber, setReraNumber] = useState(project?.reraNumber || "");
  const [tagsText, setTagsText] = useState(listToText(project?.tags || []));
  const [highlightsText, setHighlightsText] = useState(
    listToText(project?.highlights || []),
  );
  const [description, setDescription] = useState(project?.description || "");
  const [parking, setParking] = useState(project?.parking?.toString() || "");
  const [yearBuilt, setYearBuilt] = useState(
    project?.yearBuilt?.toString() || "",
  );
  const [locationFeaturesText, setLocationFeaturesText] = useState(
    listToText(project?.locationFeatures || []),
  );
  const [publishStatus, setPublishStatus] = useState<"DRAFT" | "PUBLISHED">(
    project?.publishStatus || "DRAFT",
  );

  // --- Relationships ---
  const [developerId, setDeveloperId] = useState(
    project?.developerId?.toString() || "",
  );
  const [locationId, setLocationId] = useState(
    project?.locationId?.toString() || "",
  );
  const [selectedAmenityIds, setSelectedAmenityIds] = useState<string[]>(
    project?.amenities.map((a) => a.id) || [],
  );
  const [selectedAgentIds, setSelectedAgentIds] = useState<string[]>(
    project?.agents.map((a) => a.id) || [],
  );

  // --- Configurations (e.g. 2 BHK, 3 BHK) ---
  const [configurations, setConfigurations] = useState<ConfigurationRow[]>(
    project?.configurations && project.configurations.length > 0
      ? project.configurations.map((config) => ({
          key: `existing-${config.id}`,
          value: config.value,
          price: config.price?.toString() || "",
          areaValue: config.areaValue?.toString() || "",
          areaLabel: config.areaLabel || "",
          images: config.images,
        }))
      : [makeEmptyConfigurationRow()],
  );

  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Toggle a checkbox value inside an array of numbers (used for amenities/agents)
  function toggleIdInList(
    list: string[],
    id: string,
    setList: (list: string[]) => void,
  ) {
    if (list.includes(id)) {
      setList(list.filter((existingId) => existingId !== id));
    } else {
      setList([...list, id]);
    }
  }

  function updateConfigurationRow(
    key: string,
    field: keyof ConfigurationFormData,
    value: string | string[],
  ) {
    setConfigurations((currentRows) =>
      currentRows.map((row) =>
        row.key === key ? { ...row, [field]: value } : row,
      ),
    );
  }

  function addConfigurationRow() {
    setConfigurations((currentRows) => [
      ...currentRows,
      makeEmptyConfigurationRow(),
    ]);
  }

  function removeConfigurationRow(key: string) {
    setConfigurations((currentRows) =>
      currentRows.filter((row) => row.key !== key),
    );
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorMessage("");

    if (!developerId || !locationId) {
      setErrorMessage("Please select a Developer and a Location.");
      return;
    }

    setIsSaving(true);

    const formData = {
      title,
      category,
      type,
      status,
      images,
      address,
      googleMapsEmbedUrl,
      configurationUnit,
      price,
      possessionDate,
      area,
      reraNumber,
      tags: textToList(tagsText),
      highlights: textToList(highlightsText),
      description,
      parking,
      yearBuilt,
      locationFeatures: textToList(locationFeaturesText),
      publishStatus,
      developerId,
      locationId,
      amenityIds: selectedAmenityIds,
      agentIds: selectedAgentIds,
      configurations: configurations
        // Ignore totally empty rows (user added one but never filled it in)
        .filter((row) => row.value.trim() !== "")
        .map(({ key, ...rest }) => rest),
    };

    try {
      if (isEditing && project) {
        await updateProject(project.id, formData);
      } else {
        await createProject(formData);
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

      {/* --- Basic Info --- */}
      <div className="card mb-3">
        <div className="card-header fw-bold">Basic Info</div>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Project Title *</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>

          {/* <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Category</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Residential"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Type</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Apartment"
                value={type}
                onChange={(event) => setType(event.target.value)}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Status</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Under Construction"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              />
            </div>
          </div> */}

          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Category *</label>
              <select
                className="form-select"
                value={category}
                onChange={(event) => {
                  const newCategory = event.target.value;
                  setCategory(newCategory);
                  // Jab category badle, purana Type reset karo agar wo naye
                  // category ki list me valid nahi hai (e.g. Apartment -> Commercial select karne pe)
                  const validTypes =
                    TYPE_OPTIONS_BY_CATEGORY[newCategory] || [];
                  if (!validTypes.includes(type)) {
                    setType("");
                  }
                }}
                required
              >
                <option value="">Select category...</option>
                {CATEGORY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Type</label>
              <select
                className="form-select"
                value={type}
                onChange={(event) => setType(event.target.value)}
                disabled={!category}
              >
                <option value="">
                  {category ? "Select type..." : "Select a category first"}
                </option>
                {(TYPE_OPTIONS_BY_CATEGORY[category] || []).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option value="">Select status...</option>
                {STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
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
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows={4}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <ImageUploader
            folder="projects"
            label="Project Images"
            value={images}
            onChange={setImages}
          />
        </div>
      </div>

      {/* --- Relationships --- */}
      <div className="card mb-3">
        <div className="card-header fw-bold">Developer & Location</div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Developer *</label>
              <select
                className="form-select"
                value={developerId}
                onChange={(event) => setDeveloperId(event.target.value)}
                required
              >
                <option value="">Select a developer...</option>
                {developers.map((developer) => (
                  <option key={developer.id} value={developer.id}>
                    {developer.name}
                  </option>
                ))}
              </select>
              {developers.length === 0 && (
                <div className="form-text text-warning">
                  No developers yet — add one first from the Developers page.
                </div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Location *</label>
              <select
                className="form-select"
                value={locationId}
                onChange={(event) => setLocationId(event.target.value)}
                required
              >
                <option value="">Select a location...</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
              {locations.length === 0 && (
                <div className="form-text text-warning">
                  No locations yet — add one first from the Locations page.
                </div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </div>

          <GooglePlacesPlaceholder />

          <div className="mb-3">
            <label className="form-label">Google Maps Embed URL</label>
            <input
              type="text"
              className="form-control"
              placeholder="https://www.google.com/maps/embed?..."
              value={googleMapsEmbedUrl}
              onChange={(event) => setGoogleMapsEmbedUrl(event.target.value)}
            />
          </div>
        </div>
      </div>

      {/* --- Pricing & Details --- */}
      <div className="card mb-3">
        <div className="card-header fw-bold">Pricing & Details</div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3 mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Area</label>
              <input
                type="number"
                className="form-control"
                value={area}
                onChange={(event) => setArea(event.target.value)}
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Possession Date</label>
              <input
                type="date"
                className="form-control"
                value={possessionDate}
                onChange={(event) => setPossessionDate(event.target.value)}
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Configuration Unit</label>
              <input
                type="text"
                className="form-control"
                value={configurationUnit}
                onChange={(event) => setConfigurationUnit(event.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-3 mb-3">
              <label className="form-label">Parking (spots)</label>
              <input
                type="number"
                className="form-control"
                value={parking}
                onChange={(event) => setParking(event.target.value)}
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Year Built</label>
              <input
                type="number"
                className="form-control"
                value={yearBuilt}
                onChange={(event) => setYearBuilt(event.target.value)}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">RERA Number</label>
              <input
                type="text"
                className="form-control"
                value={reraNumber}
                onChange={(event) => setReraNumber(event.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Tags (comma separated)</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Luxury, Sea View, New Launch"
              value={tagsText}
              onChange={(event) => setTagsText(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Highlights (comma separated)</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Clubhouse, Rooftop Pool, EV Charging"
              value={highlightsText}
              onChange={(event) => setHighlightsText(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Location Features (comma separated)
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Near Metro, Close to School"
              value={locationFeaturesText}
              onChange={(event) => setLocationFeaturesText(event.target.value)}
            />
          </div>
        </div>
      </div>

      {/* --- Amenities (many-to-many checkboxes) --- */}
      <div className="card mb-3">
        <div className="card-header fw-bold">Amenities</div>
        <div className="card-body">
          {amenities.length === 0 && (
            <p className="text-muted mb-0">
              No amenities yet — add some from the Amenities page.
            </p>
          )}
          <div className="row">
            {amenities.map((amenity) => (
              <div key={amenity.id} className="col-md-3 col-sm-4 col-6 mb-2">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`amenity-${amenity.id}`}
                    checked={selectedAmenityIds.includes(amenity.id)}
                    onChange={() =>
                      toggleIdInList(
                        selectedAmenityIds,
                        amenity.id,
                        setSelectedAmenityIds,
                      )
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`amenity-${amenity.id}`}
                  >
                    {amenity.name}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Agents (many-to-many checkboxes) --- */}
      <div className="card mb-3">
        <div className="card-header fw-bold">Agents</div>
        <div className="card-body">
          {agents.length === 0 && (
            <p className="text-muted mb-0">
              No agents yet — add some from the Agents page.
            </p>
          )}
          <div className="row">
            {agents.map((agent) => (
              <div key={agent.id} className="col-md-3 col-sm-4 col-6 mb-2">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`agent-${agent.id}`}
                    checked={selectedAgentIds.includes(agent.id)}
                    onChange={() =>
                      toggleIdInList(
                        selectedAgentIds,
                        agent.id,
                        setSelectedAgentIds,
                      )
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`agent-${agent.id}`}
                  >
                    {agent.name}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Configurations (one-to-many) --- */}
      <div className="card mb-3">
        <div className="card-header fw-bold d-flex justify-content-between align-items-center">
          <span>Configurations ({configurationUnit || "BHK"} Units)</span>
          <button
            type="button"
            className="btn btn-sm btn-outline-primary"
            onClick={addConfigurationRow}
          >
            + Add Configuration
          </button>
        </div>
        <div className="card-body">
          {configurations.map((row, index) => (
            <div key={row.key} className="border rounded p-3 mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <strong>Configuration #{index + 1}</strong>
                {configurations.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeConfigurationRow(row.key)}
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="row">
                <div className="col-md-3 mb-2">
                  <label className="form-label">
                    Value ({configurationUnit || "BHK"})
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. 2"
                    value={row.value}
                    onChange={(event) =>
                      updateConfigurationRow(
                        row.key,
                        "value",
                        event.target.value,
                      )
                    }
                  />
                </div>
                <div className="col-md-3 mb-2">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={row.price}
                    onChange={(event) =>
                      updateConfigurationRow(
                        row.key,
                        "price",
                        event.target.value,
                      )
                    }
                  />
                </div>
                <div className="col-md-3 mb-2">
                  <label className="form-label">Area Value</label>
                  <input
                    type="number"
                    className="form-control"
                    value={row.areaValue}
                    onChange={(event) =>
                      updateConfigurationRow(
                        row.key,
                        "areaValue",
                        event.target.value,
                      )
                    }
                  />
                </div>
                <div className="col-md-3 mb-2">
                  <label className="form-label">Area Label</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. sq.ft"
                    value={row.areaLabel}
                    onChange={(event) =>
                      updateConfigurationRow(
                        row.key,
                        "areaLabel",
                        event.target.value,
                      )
                    }
                  />
                </div>
              </div>

              <ImageUploader
                folder="configurations"
                label="Floor Plan Images"
                value={row.images}
                onChange={(paths) =>
                  updateConfigurationRow(row.key, "images", paths)
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex gap-2 mb-5">
        <button type="submit" className="btn btn-primary" disabled={isSaving}>
          {isSaving
            ? "Saving..."
            : isEditing
              ? "Save Changes"
              : "Create Project"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => router.push("/dashboard/projects")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
