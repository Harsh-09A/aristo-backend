export function formatIndianDate(date: Date | string | null | undefined): string {
  if (date === null || date === undefined) return "";

  const d = new Date(date);
  if (isNaN(d.getTime())) return ""; // invalid date string bhi handle ho gaya

  return d.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    month: "long",
    year: "numeric",
  });
}

export function formatIndianFullDateParts(
  date: Date | string | null | undefined
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

  const day = parts.find(p => p.type === "day")?.value || "";
  const month = parts.find(p => p.type === "month")?.value || "";
  const year = parts.find(p => p.type === "year")?.value || "";

  return { day, month, year };
}

export function formatIndianPrice(value: number | null | undefined): string {
  if (value === null || value === undefined || isNaN(value)) return "";

  if (value >= 10000000) {
    return `${(value / 10000000).toFixed(2).replace(/\.?0+$/, "")} Cr`;
  }

  if (value >= 100000) {
    return `${(value / 100000).toFixed(2).replace(/\.?0+$/, "")} Lac`;
  }

  if (value >= 1000) {
    return `${(value / 1000).toFixed(2).replace(/\.?0+$/, "")} K`;
  }

  return value.toString();
}