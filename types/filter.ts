export interface Option<T = string> {
  label: string;
  value: T;
}

export type Filters = {
  category: string;
  type: string | null;
  search: string | null;
  location: string | null;
  bhk: number | null;
  min_price: number | null;
  max_price: number | null;
  status: string | null;
  developer: string | null;
};

export const defaultFilters: Filters = {
  category: "residential",
  type: null,
  search: null,
  location: null,
  bhk: null,
  min_price: null,
  max_price: null,
  status: null,
  developer: null,
};