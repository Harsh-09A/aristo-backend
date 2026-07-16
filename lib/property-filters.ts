import { CATEGORY_OPTIONS } from "@/lib/constants";

export type PropertyFilterValues = {
  category: string;
  type: string;
  search: string;
  location: string;
  bhk: string;
  status: string; // naya
  minPrice: string;
  maxPrice: string;
};

export const DEFAULT_FILTER_VALUES: PropertyFilterValues = {
  category: CATEGORY_OPTIONS[0],
  type: "",
  search: "",
  location: "",
  bhk: "",
  status: "",
  minPrice: "",
  maxPrice: "",
};

export function buildListingQueryString(values: PropertyFilterValues) {
  const params = new URLSearchParams();

  if (values.category) params.set("category", values.category);
  if (values.type) params.set("type", values.type);
  if (values.search.trim()) params.set("search", values.search.trim());
  if (values.location) params.set("location", values.location);
  if (values.category === "Residential" && values.bhk) {
    params.set("bhk", values.bhk.replace("+", ""));
  }
  if (values.status) params.set("status", values.status);
  if (values.minPrice) params.set("min_price", values.minPrice);
  if (values.maxPrice) params.set("max_price", values.maxPrice);

  return params.toString();
}

export function parseListingSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
): PropertyFilterValues {
  const get = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
  };

  const categoryParam = get("category");
  const typeParam = get("type");

  return {
    // Agar URL me category nahi hai (fresh /listing visit) -> "Residential"
    category: categoryParam || DEFAULT_FILTER_VALUES.category,
    // Type sirf tab default "Apartment" hoga jab category bhi bilkul diya na ho.
    // Agar user ne khud category=Commercial choose kiya hai, toh type ko force nahi karenge.
    type: typeParam || (categoryParam ? "" : DEFAULT_FILTER_VALUES.type),
    search: get("search"),
    location: get("location"),
    bhk: get("bhk"),
    status: get("status"),
    minPrice: get("min_price"),
    maxPrice: get("max_price"),
  };
}
