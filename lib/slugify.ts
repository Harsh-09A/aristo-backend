import slugify from "slugify";

// Turns a title like "Green Valley Heights" into "green-valley-heights"
export function makeSlug(title: string): string {
  return slugify(title, {
    lower: true, // make it lowercase
    strict: true, // remove special characters
    trim: true,
  });
}
