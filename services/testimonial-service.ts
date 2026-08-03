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


// services/testimonial-service.ts

const PLACES_API_BASE = "https://places.googleapis.com/v1/places";

export interface GooglePlaceRatingSummary {
  rating: number;          // e.g. 4.8
  totalReviews: number;    // e.g. 214 — ASLI total, sirf displayed reviews nahi
}

/**
 * Places API (New) ke "Place Details" endpoint se sirf rating + total
 * review count fetch karta hai. Yeh alag isliye rakha hai kyunki humein
 * poore review text nahi chahiye — sirf yeh do numbers, jo header mein
 * "4.8 ⭐ Based on 214 Google reviews" dikhane ke liye use honge.
 */
export async function getGooglePlaceRatingSummary(
  placeId: string,
): Promise<GooglePlaceRatingSummary> {
  try {
    const res = await fetch(`${PLACES_API_BASE}/${placeId}`, {
      headers: {
        // Naya Places API key-in-header tareeka use karta hai (query param nahi)
        "X-Goog-Api-Key": process.env.GOOGLE_PLACES_API_KEY as string,
        // Field mask zaroori hai — batata hai ki response mein kya-kya chahiye.
        // Ismein reviews nahi maanga, isliye response chhota aur sasta rahega.
        "X-Goog-FieldMask": "rating,userRatingCount",
        Referer: "https://www.varshagroup.in/",
      },
      // Rating har render pe fresh fetch na ho, 1 ghante tak cache rahe
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      // API fail ho jaye toh crash nahi, bas safe default return karo
      console.error("Google Place rating fetch failed:", await res.text());
      return { rating: 0, totalReviews: 0 };
    }

    const data = await res.json();

    return {
      rating: data.rating ?? 0,
      totalReviews: data.userRatingCount ?? 0,
    };
  } catch (error) {
    console.error("Google Place rating fetch error:", error);
    return { rating: 0, totalReviews: 0 };
  }
}