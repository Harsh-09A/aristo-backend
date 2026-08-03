import {
  getFormattedGoogleReviews,
  getGooglePlaceRatingSummary,
} from "@/services/testimonial-service";
import TestimonialListingsSlider from "./TestimonialListingsSlider";

const TestimonialListings = async () => {
  const placeId = process.env.GOOGLE_PLACE_ID as string;

  // Dono API calls ek saath chalao — sequential karne se page slow hoga
  const [testimonials, ratingSummary] = await Promise.all([
    getFormattedGoogleReviews(placeId),
    getGooglePlaceRatingSummary(placeId),
  ]);

  if (testimonials.length === 0) return null;

  const googleReviewsUrl = `https://search.google.com/local/reviews?placeid=${placeId}`;

  return (
    <TestimonialListingsSlider
      testimonials={testimonials}
      googleReviewsUrl={googleReviewsUrl}
      rating={ratingSummary.rating}
      totalReviews={ratingSummary.totalReviews}
    />
  );
};

export default TestimonialListings;
