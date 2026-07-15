export interface Developer {
  id: string;
  name: string;
  slug: string;
  logo: string;
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
  value: string;
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
  specialization: string;
  email: string;
  phone: string;
  photo: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string; // e.g., 'Residential'
  type: string; // e.g., 'Apartment'
  status: string; // e.g., 'RTMI' (Ready To Move In)
  images: string[];
  address: string;
  googleMapsEmbedUrl: string;
  configurationUnit: string; // e.g., 'BHK'
  price: number;
  possessionDate: Date | string;
  area: number;
  reraNumber: string;
  tags: string[];
  highlights: string[];
  description: string;
  parking: string | null; // Nullable based on your sample
  yearBuilt: number;
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
