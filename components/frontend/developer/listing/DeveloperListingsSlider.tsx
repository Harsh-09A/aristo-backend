"use client";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import DeveloperCard from "../cards/DeveloperCard";

const DeveloperListingsSlider = ({ developers }: { developers: any[] }) => {
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
          nextEl: ".top-developers-next__active",
          prevEl: ".top-developers-prev__active",
        }}
        pagination={{
          el: ".top-developers-pagination__active",
          clickable: true,
        }}
        slidesPerView={1}
        breakpoints={{
          300: { slidesPerView: 1 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 3 },
          1200: { slidesPerView: 5 },
        }}
      >
        {developers.map((listing) => (
          <SwiperSlide key={listing.id}>
            <DeveloperCard developer={listing} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="rounded-arrow arrowY-center-position">
        <button className="top-developers-prev__active swiper_button _prev">
          <i className="fa-solid fa-chevron-left" />
        </button>
        {/* End prev */}

        <button className="top-developers-next__active swiper_button _next">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
        {/* End Next */}
      </div>
      {/* End .col for navigation  */}
    </>
  );
};

export default DeveloperListingsSlider;
