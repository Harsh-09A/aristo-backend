export function formatIndianDate(date: Date | string) {
  const d = new Date(date); // works whether it's a Date object or ISO string

  return d.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata", // forces Indian time, no matter server location
    // day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
export function formatIndianFullDateParts(date: Date | string) {
  const d = new Date(date);

  // Set up the formatter with your exact locale and timezone
  const formatter = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Break the formatted date into its individual parts
  const parts = formatter.formatToParts(d);

  // Extract the specific pieces we need
  const day = parts.find(p => p.type === "day")?.value || "";
  const month = parts.find(p => p.type === "month")?.value || "";
  const year = parts.find(p => p.type === "year")?.value || "";

  return { day, month, year };
}



export function formatIndianPrice(value: number): string {
  if (value >= 1000000000) {
    // 100 Cr+
    return `${(value / 10000000).toFixed(0)} Cr`;
  }

  if (value >= 10000000) {
    // 1 Cr+
    return `${(value / 10000000).toFixed(1).replace(/\.0$/, "")} Cr`;
  }

  if (value >= 100000) {
    // 1 Lakh+
    return `${(value / 100000).toFixed(1).replace(/\.0$/, "")} Lac`;
  }

  if (value >= 1000) {
    // 1 Thousand+
    return `${(value / 1000).toFixed(1).replace(/\.0$/, "")} K`;
  }

  return value.toString();
}
