"use client";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PropertyCardTop from "../cards/PropertyCardTop";

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
          nextEl: ".top-listings-next__active",
          prevEl: ".top-listings-prev__active",
        }}
        pagination={{
          el: ".top-listings-pagination__active",
          clickable: true,
        }}
        slidesPerView={1}
        breakpoints={{
          300: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        }}
      >
        {properties.map((listing) => (
          <SwiperSlide key={listing.id}>
            <PropertyCardTop listing={listing} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="rounded-arrow arrowY-center-position">
        <button className="top-listings-prev__active swiper_button _prev">
          <i className="fa-solid fa-chevron-left" />
        </button>
        {/* End prev */}

        <button className="top-listings-next__active swiper_button _next">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
        {/* End Next */}
      </div>
      {/* End .col for navigation  */}

      <div className="row align-items-center justify-content-center mt-4">
        <div className="col-auto">
          <div className="top-listings-pagination__active pagination swiper--pagination " />
        </div>
      </div>
    </>
  );
};

export default FeaturedListingsSlider;
