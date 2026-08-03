import { getFormattedGoogleReviews } from "@/services/testimonial-service";
import TestimonialListingsSlider from "./TestimonialListingsSlider";

const TestimonialListings = async () => {
  // .env mein GOOGLE_PLACE_ID daalna (GOOGLE_PLACES_API_KEY ke saath)
  const placeId = process.env.GOOGLE_PLACE_ID as string;
  const testimonials = await getFormattedGoogleReviews(placeId);

  // Reviews hi nahi mile toh poora section hide kar do (crash nahi hoga)
  if (testimonials.length === 0) return null;

  return <TestimonialListingsSlider testimonials={testimonials} />;
};

export default TestimonialListings;
