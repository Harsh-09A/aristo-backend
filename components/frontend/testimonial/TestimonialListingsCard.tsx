"use client";
import { useState } from "react";
import StarRating from "./StarRating";

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

const TRUNCATE_LENGTH = 180;

const TestimonialListingsCard = ({ testimonial }: TestimonialCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = testimonial.quote.length > TRUNCATE_LENGTH;

  return (
    <div className="item h-100">
      <div className="testimonial-style1 position-relative h-100 d-flex flex-column">
        <img
          src="https://cdn.trustindex.io/assets/platform/Google/icon.svg"
          alt="Google"
          width={22}
          height={22}
          style={{ position: "absolute", top: 16, right: 16 }}
        />

        <div className="testimonial-content flex-grow-1 mt-2">
          <span className="icon fas fa-quote-left" />

          <p className="text mb-1" style={expanded ? undefined : clampStyle}>
            {testimonial.quote}
          </p>

          {isLong && (
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className="btn btn-link p-0 mb-2"
              style={{ fontSize: "0.9rem", textDecoration: "none" }}
            >
              {expanded ? "Read less" : "Read more"}
            </button>
          )}

          
        </div>

        <div className="thumb d-flex align-items-center mt-3">
          {testimonial.photo ? (
            <img
              src={testimonial.photo || "/assets/images/placeholder/placeholder-image.jpg"}
              alt={testimonial.name}
              width={50}
              height={50}
              className="rounded-circle"
            />
          ) : (
            <div
              className="rounded-circle d-flex align-items-center justify-content-center bg-secondary text-white fw-bold"
              style={{ width: 50, height: 50 }}
            >
              {testimonial.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex-grow-1 ms-3">
            <h6 className="mb-0">{testimonial.name}</h6>
            <p className="mb-0 text-muted small">{testimonial.relativeTime}</p>
            <StarRating rating={testimonial.stars} />
          </div>
        </div>
      </div>
    </div>
  );
};

const clampStyle: React.CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 4,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

export default TestimonialListingsCard;
