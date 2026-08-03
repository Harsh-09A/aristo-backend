import { Project } from "@/types/property";

export function formatIndianDate(
  date: Date | string | null | undefined,
): string {
  if (date === null || date === undefined) return "";

  const d = new Date(date);
  if (isNaN(d.getTime())) return ""; // invalid date string bhi handle ho gaya

  return d.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    month: "short",
    year: "numeric",
  });
}

export function formatIndianFullDateParts(
  date: Date | string | null | undefined,
): { day: string; month: string; year: string } {
  if (date === null || date === undefined) {
    return { day: "", month: "", year: "" };
  }

  const d = new Date(date);
  if (isNaN(d.getTime())) {
    return { day: "", month: "", year: "" };
  }

  const formatter = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const parts = formatter.formatToParts(d);

  const day = parts.find((p) => p.type === "day")?.value || "";
  const month = parts.find((p) => p.type === "month")?.value || "";
  const year = parts.find((p) => p.type === "year")?.value || "";

  return { day, month, year };
}

export function formatIndianPrice(value: number | null | undefined): string {
  if (value === null || value === undefined || isNaN(value)) return "";

  if (value >= 10000000) {
    return `${(value / 10000000).toFixed(2).replace(/\.?0+$/, "")} Cr`;
  }

  if (value >= 100000) {
    return `${(value / 100000).toFixed(2).replace(/\.?0+$/, "")} Lakhs`;
  }

  if (value >= 1000) {
    return `${(value / 1000).toFixed(2).replace(/\.?0+$/, "")} K`;
  }

  return value.toString();
}

export const getConfigData = (data: Project) => {
  // Guard: If there are no configurations, return a fallback early
  if (!data.configurations || data.configurations.length === 0) {
    return `N/A`;
  }

  // Residential: Join the string values directly (e.g., "2, 3 BHK")
  if (data.category?.toLowerCase() === "residential") {
    return (
      data.configurations.map((config) => config.value).join(", ") +
      ` ${data.configurationUnit}`
    );
  }

  // Commercial: Clean, filter, and convert string values to numbers
  const numericValues = data.configurations
    .map((config) => Number(config.areaValue))
    .filter((num) => !isNaN(num)); // Remove anything that failed to parse into a number

  // Check if we successfully extracted any valid numbers
  if (numericValues.length > 0) {
    const min = Math.min(...numericValues);
    const max = Math.max(...numericValues);

    // If min and max are identical (e.g. only one config exists), don't show a range
    if (min === max) {
      // return `${min} ${data.configurationUnit}`;
      return `${min} Sq.Ft`;
    }

    // return `${min} - ${max} ${data.configurationUnit}`;
    return `${min} - ${max} Sq.Ft`;
  }

  // Fallback fallback if values couldn't be parsed into numbers
  return `Contact for Details`;
};

// Sirf area range nikalne ke liye - Residential aur Commercial dono ke liye kaam karta hai
export const getAreaRange = (data: Project) => {
  // Guard: agar configurations hi nahi hain
  if (!data.configurations || data.configurations.length === 0) {
    return "N/A";
  }

  // areaValue ko number mein convert karo, invalid/empty/0 values hata do
  const numericValues = data.configurations
    .map((config) => Number(config.areaValue))
    .filter((num) => !isNaN(num) && num > 0);

  // Agar koi valid area value nahi mili
  if (numericValues.length === 0) {
    return "N/A";
  }

  const min = Math.min(...numericValues);
  const max = Math.max(...numericValues);

  // Agar sirf ek hi config hai (ya sabka area same hai), range mat dikhao
  if (min === max) {
    return `${min} Sq.Ft`;
  }

  return `${min} - ${max} Sq.Ft`;
};
