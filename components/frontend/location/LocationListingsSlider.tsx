"use client";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Location } from "@/types/property";


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
            <div className="item">
              <div className="feature-style1">
                {/* <div className="feature-img">
                  <Image
                    width={400}
                    height={400}
                    className="w-100 h-100 cover"
                    src={location.image}
                    alt="cities"
                  />
                </div> */}

                <div className="position-relative overflow-hidden rounded">
                  <div
                    style={{
                      width: "400px",
                      height: "400px",
                    }}
                  >
                    <Image
                      src={location.image || "/assets/images/placeholder/placeholder-image.jpg"}
                      alt="image"
                      fill
                      sizes="250px"
                      quality={100}
                      className="object-fit-cover"
                    />
                  </div>
                </div>
                <div className="feature-content">
                  <div className="top-area">
                    <h6 className="title mb-1">{location.name}</h6>
                    <p className="text">{location._count.projects} Properties</p>
                  </div>
                  <div className="bottom-area">
                    <Link
                      className="ud-btn2"
                      href={`/listings?location=${location.slug}`}
                    >
                      See All Projects
                      <i className="fal fa-arrow-right-long" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
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
