"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import { Gallery, Item } from "react-photoswipe-gallery";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "photoswipe/dist/photoswipe.css";

import { Project } from "@/types/property";
import { formatIndianPrice } from "@/utils/helper-functions";

interface Props {
  data: Project;
}

const PLACEHOLDER_IMAGE = "/assets/images/placeholder/floorPlanNoImage.jpg";

const PropertyFloorPlans = ({ data }: Props) => {
  const configurations = data.configurations ?? [];

  const [activeConfig, setActiveConfig] = useState(0);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setActiveImage(0);

    if (mainSwiper) {
      mainSwiper.slideTo(0);
    }
  }, [activeConfig]);

  // Configurations hi na ho to kuch render mat karo
  if (configurations.length === 0) {
    // return null;
    return <p>No Floor Plans</p>
    ;
  }

  const currentConfig = configurations[activeConfig];

  // Har config ke images empty ho to fallback placeholder use karo
  const currentImages =
    currentConfig.images && currentConfig.images.length > 0
      ? currentConfig.images
      : [PLACEHOLDER_IMAGE];

  return (
    <div className="floor-plans">
      {/* Config Tabs */}
      <div className="d-flex flex-wrap gap-2 mb20">
        {configurations.map((config, index) => (
          <button
            key={config.id}
            onClick={() => setActiveConfig(index)}
            className={`btn btn-sm ${
              activeConfig === index ? "btn-dark" : "btn-outline-secondary"
            }`}
          >
            {config.value} {data.configurationUnit}
          </button>
        ))}
      </div>

      {/* Info */}
      <div className="d-flex justify-content-between align-items-center mb15 flex-wrap gap-2">
        <div>
          <div className="fw600 fs-5">{currentConfig.areaValue} SqFt</div>
          <div className="text-muted">Carpet Area</div>
        </div>

        <div className="fw600 text-dark fs-5">
          {/* ₹{formatIndianPrice(currentConfig.price || 0)} */}
          Contact For Price
        </div>
      </div>

      <Gallery>
        {/* Main Slider */}
        <Swiper
          key={currentConfig.id}
          modules={[Navigation]}
          navigation={currentImages.length > 1}
          spaceBetween={15}
          onSwiper={setMainSwiper}
          onSlideChange={(swiper) => setActiveImage(swiper.activeIndex)}
          className="main-floor-slider"
        >
          {currentImages.map((img, index) => (
            <SwiperSlide key={index}>
              <Item
                original={img || PLACEHOLDER_IMAGE}
                thumbnail={img || PLACEHOLDER_IMAGE}
                width="1600"
                height="900"
              >
                {({ ref, open }) => (
                  <div
                    className="position-relative rounded-4 overflow-hidden bg-light cursor-pointer"
                    style={{
                      width: "100%",
                      aspectRatio: "16/9",
                    }}
                  >
                    <Image
                      src={img || PLACEHOLDER_IMAGE}
                      alt={`Floor Plan ${index + 1}`}
                      fill
                      className="object-fit-contain p-3"
                      sizes="100vw"
                    />
                  </div>
                )}
              </Item>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbnail Slider — sirf tab dikhao jab ek se zyada image ho */}
        {currentImages.length > 1 && (
          <Swiper
            spaceBetween={10}
            slidesPerView={4}
            watchSlidesProgress
            breakpoints={{
              0: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1200: {
                slidesPerView: 5,
              },
            }}
            className="mt15"
          >
            {currentImages.map((img, index) => (
              <SwiperSlide key={index}>
                <div
                  onClick={() => {
                    setActiveImage(index);
                    mainSwiper?.slideTo(index);
                  }}
                  className={`position-relative rounded-3 overflow-hidden border ${
                    activeImage === index ? "border-dark border-3" : ""
                  }`}
                  style={{
                    width: "100%",
                    aspectRatio: "1/1",
                    cursor: "pointer",
                  }}
                >
                  <Image
                    src={img || PLACEHOLDER_IMAGE}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-fit-cover"
                    sizes="200px"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Gallery>
    </div>
  );
};

export default PropertyFloorPlans;
