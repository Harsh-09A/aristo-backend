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
          nextEl: ".featured-next__active",
          prevEl: ".featured-prev__active",
        }}
        pagination={{
          el: ".featured-pagination__active",
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

      <div className="row align-items-center justify-content-center mt-4">
        <div className="col-auto">
          <button className="featured-prev__active swiper_button reels-nav-btn">
            <i className="fa-solid fa-arrow-left-long" />
          </button>
        </div>
        <div className="col-auto">
          <div className="pagination swiper--pagination featured-pagination__active" />
        </div>
        <div className="col-auto">
          <button className="featured-next__active swiper_button reels-nav-btn">
            <i className="fa-solid fa-arrow-right-long" />
          </button>
        </div>
      </div>
    </>
  );
};

export default FeaturedListingsSlider;
