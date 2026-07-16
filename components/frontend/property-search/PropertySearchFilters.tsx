"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";
import {
  CATEGORY_OPTIONS,
  TYPE_OPTIONS_BY_CATEGORY,
  BHK_OPTIONS,
  STATUS_OPTIONS,
  PRICE_OPTIONS,
} from "@/lib/constants";
import {
  DEFAULT_FILTER_VALUES,
  buildListingQueryString,
  type PropertyFilterValues,
} from "@/lib/property-filters";
import { selectStyles } from "@/lib/react-select-styles";
import styles from "./PropertySearchFilters.module.css";

type LocationOption = { id: string; name: string; slug: string };
type Option = { value: string; label: string };
type PriceOption = { value: number; label: string };

type Props = {
  locations: LocationOption[];
  variant?: "hero" | "sidebar";
  initialValues?: Partial<PropertyFilterValues>;
};

// Chhota helper - string list ko react-select ke {value, label} format me badalta hai
const toOptions = (list: readonly string[]): Option[] =>
  list.map((item) => ({ value: item, label: item }));

export default function PropertySearchFilters({
  locations,
  variant = "hero",
  initialValues,
}: Props) {
  const router = useRouter();

  const [values, setValues] = useState<PropertyFilterValues>({
    ...DEFAULT_FILTER_VALUES,
    ...initialValues,
  });

  const isResidential = values.category === "Residential";
  const typeOptions = toOptions(
    TYPE_OPTIONS_BY_CATEGORY[values.category] ?? [],
  );
  // const bhkOptions = toOptions(BHK_OPTIONS);
  // Pehle wala object-array wala mapping hata ke ye rakho:
  const bhkOptions: Option[] = BHK_OPTIONS.map((b) => ({
    value: b,
    label: `${b} BHK`,
  }));
  const statusOptions = toOptions(STATUS_OPTIONS);
  const locationOptions: Option[] = locations.map((loc) => ({
    value: loc.name,
    label: loc.name,
  }));

  const handleCategoryChange = (category: string) => {
    setValues((prev) => ({ ...prev, category, type: "", bhk: "" }));
  };

  const handleChange = (field: keyof PropertyFilterValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const queryString = buildListingQueryString(values);
    router.push(`/listings${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <div className={variant === "hero" ? styles.heroWrapper : ""}>
      {/* Category tabs */}
      <div className={styles.tabsBar}>
        {CATEGORY_OPTIONS.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => handleCategoryChange(cat)}
            className={`${styles.tab} ${values.category === cat ? styles.tabActive : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className={`${styles.panel} ${variant === "sidebar" ? styles.sidebarPanel : ""}`}
      >
        {/* Row 1: Type + Search + Button */}
        <div className={styles.row1}>
          <div className={styles.typeCol}>
            <Select<Option, false>
              instanceId="type-select"
              options={typeOptions}
              styles={selectStyles}
              placeholder="Select Types"
              isSearchable={false}
              isClearable
              value={typeOptions.find((o) => o.value === values.type) ?? null}
              onChange={(opt) => handleChange("type", opt?.value ?? "")}
            />
          </div>

          <div className={styles.searchCol}>
            <svg
              className={styles.searchTagIcon}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M20 12.5L12.5 20a2 2 0 0 1-2.83 0l-6.67-6.67a2 2 0 0 1 0-2.83L10.5 3H20v9.5Z"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <circle cx="15" cy="8" r="1.4" fill="currentColor" />
            </svg>
            <input
              type="text"
              className={styles.searchInput}
              placeholder={`Search ${values.category} Property`}
              value={values.search}
              onChange={(e) => handleChange("search", e.target.value)}
            />
          </div>

          <button
            type="submit"
            className={styles.searchBtn}
            aria-label="Search"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2" />
              <path
                d="M21 21l-4.3-4.3"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Row 2: Location, BHK, Min, Max, Status */}
        <div className={styles.row2}>
          <Select<Option, false>
            instanceId="location-select"
            options={locationOptions}
            styles={selectStyles}
            placeholder="Select Location"
            isClearable
            value={
              locationOptions.find((o) => o.value === values.location) ?? null
            }
            onChange={(opt) => handleChange("location", opt?.value ?? "")}
          />

          {isResidential && (
            <Select<Option, false>
              instanceId="bhk-select"
              options={bhkOptions}
              styles={selectStyles}
              placeholder="Select BHK"
              isSearchable={false}
              isClearable
              value={bhkOptions.find((o) => o.value === values.bhk) ?? null}
              onChange={(opt) => handleChange("bhk", opt?.value ?? "")}
            />
          )}

          <Select<PriceOption, false>
            instanceId="min-price-select"
            options={[...PRICE_OPTIONS]}
            styles={selectStyles}
            placeholder="Min Price"
            isSearchable={false}
            isClearable
            value={
              PRICE_OPTIONS.find((o) => String(o.value) === values.minPrice) ??
              null
            }
            onChange={(opt) =>
              handleChange("minPrice", opt ? String(opt.value) : "")
            }
          />

          <Select<PriceOption, false>
            instanceId="max-price-select"
            options={[...PRICE_OPTIONS]}
            styles={selectStyles}
            placeholder="Max Price"
            isSearchable={false}
            isClearable
            value={
              PRICE_OPTIONS.find((o) => String(o.value) === values.maxPrice) ??
              null
            }
            onChange={(opt) =>
              handleChange("maxPrice", opt ? String(opt.value) : "")
            }
          />

          <Select<Option, false>
            instanceId="status-select"
            options={statusOptions}
            styles={selectStyles}
            placeholder="Select Status"
            isSearchable={false}
            isClearable
            value={statusOptions.find((o) => o.value === values.status) ?? null}
            onChange={(opt) => handleChange("status", opt?.value ?? "")}
          />

          {variant === "sidebar" && (
            <button type="submit" className={styles.sidebarApplyBtn}>
              Apply Filters
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
