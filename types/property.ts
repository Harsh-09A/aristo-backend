export interface Developer {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  description: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  createdAt: Date | string; // Use Date if parsed, string if kept as ISO string from JSON
  updatedAt: Date | string;
}

export interface Location {
  id: string;
  name: string;
  slug: string;
  state: string | null; // Changed from 'string' to 'string | null'
  image: string | null; // Changed from 'string' to 'string | null'
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Configuration {
  id: string;
  images: string[];
  price: number | null;
  value: string | null;
  areaValue: number | null;
  areaLabel: string | null;
  projectId: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Agent {
  id: string;
  name: string;
  slug: string;
  specialization: string | null;
  email: string | null;
  phone: string | null;
  photo: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string | null; // e.g., 'Residential'
  type: string | null; // e.g., 'Apartment'
  status: string | null; // e.g., 'RTMI' (Ready To Move In)
  images: string[];
  address: string | null;
  googleMapsEmbedUrl: string | null;
  configurationUnit: string | null; // e.g., 'BHK'
  price: number | null;
  possessionDate: Date | string | null;
  area: number | null;
  reraNumber: string | null;
  tags: string[];
  highlights: string[];
  description: string | null;
  parking: string | number | null; // Nullable based on your sample
  yearBuilt: number | null;
  locationFeatures: string[];
  publishStatus: "PUBLISHED" | "DRAFT"; // Typed strictly if status options are known
  createdAt: Date | string;
  updatedAt: Date | string;
  developerId: string;
  locationId: string;

  // Relations
  developer: Developer;
  location: Location;
  configurations: Configuration[];
  amenities: Amenity[];
  agents: Agent[];
}
