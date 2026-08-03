import StarRating from "./StarRating"; // path apne project ke hisaab se adjust karo

export interface Testimonial {
  id: number;
  quote: string;
  stars: number;
  name: string;
  photo: string;
  relativeTime: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialListingsCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className="item">
      <div className="testimonial-style1 position-relative">
        <div className="testimonial-content">
          <span className="icon fas fa-quote-left" />
          <p className="text">{testimonial.quote}</p>
          <StarRating rating={testimonial.stars} />
        </div>
        <div className="thumb d-flex align-items-center">
          {testimonial.photo && (
            <img
              src={testimonial.photo}
              alt={testimonial.name}
              width={50}
              height={50}
              className="rounded-circle"
            />
          )}
          <div className="flex-grow-1 ms-3">
            <h6 className="mb-0">{testimonial.name}</h6>
            <p className="mb-0">{testimonial.relativeTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialListingsCard;
