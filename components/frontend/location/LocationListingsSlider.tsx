"use client";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Location } from "@/types/property";
import LocationListingCard from "./LocationListingCard";


// 1. Create a new type that extends the base Location
export interface LocationWithCount extends Location {
  _count: {
    projects: number;
  };
}

// 2. Use the new type in your component props
interface LocationListingsSliderProps {
  locations: LocationWithCount[];
}
const LocationListingsSlider = ({ locations }: LocationListingsSliderProps) => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        modules={[Navigation]}
        navigation={{
          nextEl: ".property-by-location-next__active",
          prevEl: ".property-by-location-prev__active",
        }}
        slidesPerView={1}
        breakpoints={{
          300: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {locations.map((location) => (
          <SwiperSlide key={location.id}>
            <LocationListingCard location = {location} />

          </SwiperSlide>
        ))}
      </Swiper>

      <div className="rounded-arrow arrowY-center-position">
        <button className="property-by-location-prev__active swiper_button _prev">
          <i className="far fa-chevron-left" />
        </button>
        {/* End prev */}

        <button className="property-by-location-next__active swiper_button _next">
          <i className="far fa-chevron-right" />
        </button>
        {/* End Next */}
      </div>
      {/* End .col for navigation  */}
    </>
  );
};

export default LocationListingsSlider;
