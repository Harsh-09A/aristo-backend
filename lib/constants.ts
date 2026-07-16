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

// Pehle wala BHK_OPTIONS replace karo isse - ab decimal bhi allow hai
export const BHK_OPTIONS = [
  "1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5+",
] as const;

// Price dropdowns ke liye preset amounts (value hamesha rupees me, raw number)
export const PRICE_OPTIONS = [
  { label: "20 Lakh", value: 2000000 },
  { label: "30 Lakh", value: 3000000 },
  { label: "40 Lakh", value: 4000000 },
  { label: "50 Lakh", value: 5000000 },
  { label: "75 Lakh", value: 7500000 },
  { label: "1 Crore", value: 10000000 },
  { label: "1.5 Crore", value: 15000000 },
  { label: "2 Crore", value: 20000000 },
  { label: "3 Crore", value: 30000000 },
  { label: "5 Crore", value: 50000000 },
  { label: "7 Crore", value: 70000000 },
  { label: "10 Crore+", value: 100000000 },
] as const;

export const PROPERTIES_PER_PAGE = 1; // 30 chahiye toh bas ye number badal dena
