"use client";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import TestimonialListingsCard from "./TestimonialListingsCard";
import Link from "next/link";

export interface Testimonial {
  id: number;
  quote: string;
  stars: number;
  name: string;
  photo: string;
  relativeTime: string;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
  googleReviewsUrl: string;
  rating: number;
  totalReviews: number;
}

const TestimonialListingsSlider = ({
  testimonials,
  googleReviewsUrl,
  rating,
  totalReviews,
}: TestimonialSliderProps) => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div className="d-flex align-items-center gap-3">
          <img
            src="https://cdn.trustindex.io/assets/platform/Google/icon.svg"
            alt="Google"
            width={36}
            height={36}
          />
          <div>
            <div className="d-flex align-items-center gap-2">
              <span className="fw-bold fs-5">{rating.toFixed(1)}</span>
              <i className="la la-star" style={{ color: "#FBBC04" }}></i>
            </div>
            <p className="mb-0 text-muted small">
              Based on {totalReviews} Google reviews
            </p>
          </div>
        </div>

        {/* <a
          href={googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-primary btn-sm"
        >
          View all Google reviews
        </a> */}
      </div>

      <Swiper
        className="overflow-hidden"
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".testimonial-next__active",
          prevEl: ".testimonial-prev__active",
        }}
        pagination={{
          el: ".testimonial_pagination__active",
          clickable: true,
        }}
        breakpoints={{
          300: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id} style={{ height: "auto" }}>
            <TestimonialListingsCard testimonial={testimonial} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="rounded-arrow arrowY-center-position" style={{"width": "102%"}}>
        <button className="testimonial-prev__active swiper_button _prev">
          <i className="fa-solid fa-chevron-left" />
        </button>
        {/* End prev */}

        <button className="testimonial-next__active swiper_button _next">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
        {/* End Next */}
      </div>
      {/* End .col for navigation  */}

      <div
        className="col-lg-12 mt-2 pt-2 text-center"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <Link
          className="ud-btn btn-white2"
          href={googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "16px",
            fontWeight: 600,
            width: "max-content",
          }}
        >
          View all Google reviews
        </Link>
      </div>
    </>
  );
};

export default TestimonialListingsSlider;
