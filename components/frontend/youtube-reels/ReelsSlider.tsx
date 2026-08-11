"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import ReelsCard from "./ReelsCard";
import VideoModal from "./VideoModal";
import type { Reel } from "@/data/reels";
import styles from "./ReelsSlider.module.css";

interface ReelsSliderProps {
  reels: Reel[];
}

const ReelsSlider = ({ reels }: ReelsSliderProps) => {
  // Kaunsa reel popup mein khula hai — null matlab koi nahi khula
  const [activeReel, setActiveReel] = useState<Reel | null>(null);

  return (
    <>
      <Swiper
        modules={[Navigation, FreeMode]}
        slidesPerView="auto"
        spaceBetween={16}
        freeMode={{ enabled: true, momentum: true }}
        navigation={{
          // NOTE: original code mein yeh do lines swapped thi — waisa hi rakha hai
          prevEl: ".reels-prev__active",
          nextEl: ".reels-next__active",
        }}
        slidesOffsetBefore={24}
        slidesOffsetAfter={24}
        className={styles.reelsSwiper}
      >
        {reels.map((reel) => (
          <SwiperSlide key={reel.id}>
            <ReelsCard reel={reel} onClick={() => setActiveReel(reel)} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="rounded-arrow arrowY-center-position">
        <button className="reels-prev__active swiper_button _prev">
          <i className="fa-solid fa-chevron-left" />
        </button>
        <button className="reels-next__active swiper_button _next">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      {/* Popup player — activeReel null hote hi unmount ho jayega */}
      {activeReel && (
        <VideoModal reel={activeReel} onClose={() => setActiveReel(null)} />
      )}
    </>
  );
};

export default ReelsSlider;