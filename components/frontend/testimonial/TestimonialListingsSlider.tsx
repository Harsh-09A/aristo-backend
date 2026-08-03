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
          nextEl: ".testimonial_next__active",
          prevEl: ".testimonial_prev__active",
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

      <div className="row align-items-center justify-content-center mt-4">
        <div className="col-auto">
          <button className="testimonial_prev__active swiper_button reels-nav-btn">
            <i className="fa-solid fa-arrow-left-long" />
          </button>
        </div>
        <div className="col-auto">
          <div className="pagination swiper--pagination testimonial_pagination__active" />
        </div>
        <div className="col-auto">
          <button className="testimonial_next__active swiper_button reels-nav-btn">
            <i className="fa-solid fa-arrow-right-long" />
          </button>
        </div>
      </div>

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
