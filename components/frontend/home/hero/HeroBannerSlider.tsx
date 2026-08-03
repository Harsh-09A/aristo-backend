"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

export type HeroBannerSlide = {
  id: string;
  image: string;
  alt: string;
  slug?: string;
};

const HeroBannerSlider = ({ slides }: { slides: HeroBannerSlide[] }) => {
  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop={slides.length > 1}
      className="hero-banner-slider"
    >
      {slides.map((slide) => {
        const img = (
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority
            sizes="100vw"
            className="hero-banner-slide-img"
          />
        );

        return (
          <SwiperSlide key={slide.id}>
            {slide.slug ? (
              // slug hai -> clickable, pointer cursor
              <Link
                href={`/property/${slide.slug}`}
                className="hero-banner-slide-link hero-banner-slide-link--clickable"
              >
                {img}
              </Link>
            ) : (
              // slug nahi hai -> sirf banner, default cursor
              <div className="hero-banner-slide-link">{img}</div>
            )}
            <div className="hero-banner-overlay" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default HeroBannerSlider;