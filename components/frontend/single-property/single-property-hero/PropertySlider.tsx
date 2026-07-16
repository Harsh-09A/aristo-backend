"use client";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";

type Props = {
  images: string[];
};

const PropertySlider = ({ images }: Props) => {
  //   const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  return (
    <>
      <Gallery>
        <div className="ps-v6-slider  slider-1-grid owl-theme owl-carousel">
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={{
              prevEl: ".prev-btn",
              nextEl: ".next-btn",
            }}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
          >
            {images.map((item, i) => (
              <SwiperSlide key={i}>
                <Item original={item} thumbnail={item} width="500" height="500">
                  {({ ref, open }) => (
                    <div className="position-relative overflow-hidden rounded">
                      <div
                        style={{
                          width: "500px",
                        //   height: "500px",
                        aspectRatio:1
                        }}
                      >
                        <Image
                        //   ref={ref as any}
                        //   onClick={open}
                          src={item}
                          alt="image"
                          fill
                          sizes="500px"
                        
                          quality={100}
                          className="object-fit-cover"
                          placeholder="blur"
                          blurDataURL="/images/placeholder/blur-placeholder.jpg"
                        />
                      </div>
                    </div>
                  )}
                </Item>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="row">
            <div className="col-lg-12 col-md-12">
              <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper mt20"
              >
                {images.map((item, i) => (
                  <SwiperSlide key={i}>
                    <div className="position-relative overflow-hidden rounded">
                      <div
                        style={{
                          width: "100px",
                        //   height: "100px",
                           aspectRatio:1
                        }}
                      >
                        <Image
                          src={item}
                          alt="image"
                          fill
                          sizes="100px"
                          quality={100}
                          className="w-100 bdrs12 object-fit-cover pointer"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </Gallery>
    </>
  );
};

export default PropertySlider;
