"use server";
import { unstable_cache } from "next/cache";
import testimonials from "@/data/testimonials.json";

export async function getTestimonials() {
  return testimonials;
}

interface GoogleReview {
  name: string;
  relativePublishTimeDescription: string;
  rating: number;
  text?: { text: string; languageCode: string };
  authorAttribution: {
    displayName: string;
    uri: string;
    photoUri: string;
  };
  publishTime: string;
}

interface PlaceDetailsResponse {
  displayName?: { text: string; languageCode: string };
  reviews?: GoogleReview[];
}

export const getGoogleReviews = unstable_cache(
  async (placeId: string) => {
    if (!placeId) {
      return { success: false, error: "placeId missing", data: null };
    }
    try {
      const data = await fetchGoogleReviewsRaw(placeId);
      return { success: true, error: null, data };
    } catch (err) {
      console.error("getGoogleReviews failed:", err);
      return { success: false, error: "Fetch error", data: null };
    }
  },
  ["google-reviews"],
  { revalidate: 86400, tags: ["google-reviews"] },
);

async function fetchGoogleReviewsRaw(placeId: string) {
  const res = await fetch(
    `https://places.googleapis.com/v1/places/${placeId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.GOOGLE_PLACES_API_KEY as string,
        "X-Goog-FieldMask": "displayName,reviews",
        Referer: "https://www.varshagroup.in/",
      },
    },
  );

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  const data: PlaceDetailsResponse = await res.json();
  return {
    name: data.displayName?.text ?? "",
    reviews: data.reviews ?? [],
  };
}

// Google ke raw response ko UI ke liye clean shape mein convert karta hai
export async function getFormattedGoogleReviews(placeId: string) {
  const result = await getGoogleReviews(placeId);

  // API fail ho gaya ya reviews nahi mile — empty array return karo,
  // UI mein isse "no reviews" case handle ho jayega
  if (!result.success || !result.data) {
    return [];
  }

  return result.data.reviews.map((review, index) => ({
    id: index, // Google review ka apna stable unique id nahi hota
    quote: review.text?.text ?? "",
    stars: review.rating,
    name: review.authorAttribution?.displayName ?? "Anonymous",
    photo: review.authorAttribution?.photoUri ?? "",
    relativeTime: review.relativePublishTimeDescription ?? "",
  }));
}
