export const CATEGORY_OPTIONS = ["Residential", "Commercial"] as const;

export const TYPE_OPTIONS_BY_CATEGORY: Record<string, string[]> = {
  Residential: ["Apartment", "Studio", "Bungalow", "Villa"],
  Commercial: ["Office", "Shop", "Showroom", "Warehouses"],
};

export const STATUS_OPTIONS = [
  "RTMI",
  "Under-Construction",
  "New Launch",
] as const;
