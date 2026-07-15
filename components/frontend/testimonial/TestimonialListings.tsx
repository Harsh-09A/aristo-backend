import { getTestimonials } from '@/services/testimonial-service';
import TestimonialListingsSlider from './TestimonialListingsSlider';


const TestimonialListings = async() => {
    const testimonials = await getTestimonials();
  return (
    <>
      <TestimonialListingsSlider testimonials = {testimonials} />
    </>
  )
}

export default TestimonialListings
