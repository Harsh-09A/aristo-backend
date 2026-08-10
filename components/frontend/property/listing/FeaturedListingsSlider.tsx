"use client";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PropertyCardFeatured from "../cards/PropertyCardFeatured";

const FeaturedListingsSlider = ({ properties }: { properties: any[] }) => {
  return (
    <>
      <Swiper
        spaceBetween={20}
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{
          delay: 2500, // Time between transitions (in ms)
          disableOnInteraction: false, // Keeps playing after user drags/clicks arrows
          pauseOnMouseEnter: true, // Pauses scroll when hovering over the slider
        }}
        navigation={{
          nextEl: ".featured-listings-next__active",
          prevEl: ".featured-listings-prev__active",
        }}
        pagination={{
          el: ".featured-listings-pagination__active",
          clickable: true,
        }}
        slidesPerView={1.2}
        breakpoints={{
          300: { slidesPerView: 1 },
          768: { slidesPerView: 1.2 },
          1024: { slidesPerView: 1 },
          1200: { slidesPerView: 1.4 },
        }}
      >
        {properties.map((listing) => (
          <SwiperSlide key={listing.id}>
            <PropertyCardFeatured listing={listing} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="rounded-arrow arrowY-center-position">
        <button className="featured-listings-prev__active swiper_button _prev">
          <i className="fa-solid fa-chevron-left" />
        </button>
        {/* End prev */}

        <button className="featured-listings-next__active swiper_button _next">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
        {/* End Next */}
      </div>
      {/* End .col for navigation  */}

      <div className="row align-items-center justify-content-center mt-4">
        <div className="col-auto">
          <div className="featured-listings-pagination__active pagination swiper--pagination " />
        </div>
      </div>
    </>
  );
};

export default FeaturedListingsSlider;
