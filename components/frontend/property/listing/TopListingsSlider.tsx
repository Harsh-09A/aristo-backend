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
          nextEl: ".top-next__active",
          prevEl: ".top-prev__active",
        }}
        pagination={{
          el: ".top-pagination__active",
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

      <div className="row align-items-center justify-content-center mt-4">
        <div className="col-auto">
          <button className="top-prev__active swiper_button reels-nav-btn">
            <i className="fa-solid fa-arrow-left-long" />
          </button>
        </div>
        {/* End prev */}

        <div className="col-auto">
          <div className="pagination swiper--pagination top-pagination__active" />
        </div>
        {/* End pagination */}

        <div className="col-auto">
          <button className="top-next__active swiper_button reels-nav-btn">
            <i className="fa-solid fa-arrow-right-long" />
          </button>
        </div>
        {/* End Next */}
      </div>
      {/* End .col for navigation and pagination */}
    </>
  );
};

export default FeaturedListingsSlider;
