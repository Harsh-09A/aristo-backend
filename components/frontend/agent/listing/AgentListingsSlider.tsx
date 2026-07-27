"use client";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import AgentCardSlider from "@/components/frontend/agent/cards/AgentCardSlider";

type Props = {
  agents: {
    id: string;
    name: string;
    slug: string;
    specialization: string | null;
    photo: string | null;
    phone: string | null;
  }[];
};

const AgentListingsSlider = ({ agents }: Props) => {
  // Agar 1 ya 0 agent hai, toh slider/arrows/pagination ki zaroorat hi nahi —
  // wo sirf ek hi card ke liye bhi clickable arrows dikha dete the.
  const hasMultipleAgents = agents.length > 1;

  return (
    <div className="position-relative">
      <Swiper
        spaceBetween={20}
        modules={[Navigation, Pagination]}
        navigation={
          hasMultipleAgents
            ? {
                nextEl: ".top-next__active",
                prevEl: ".top-prev__active",
              }
            : false
        }
        pagination={
          hasMultipleAgents
            ? {
                el: ".top-pagination__active",
                clickable: true,
              }
            : false
        }
        allowTouchMove={hasMultipleAgents} // 1 card hone par swipe/drag bhi band
        slidesPerView={1}
        breakpoints={{
          300: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 1 },
          1200: { slidesPerView: 1 },
        }}
      >
        {agents.map((agent) => (
          <SwiperSlide key={agent.id}>
            <AgentCardSlider agent={agent} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Arrows aur pagination sirf tab dikhenge jab 1 se zyada agents hon */}
      {hasMultipleAgents && (
        <>
          {/* Prev arrow — left side, vertically centered on the slider */}
          <button
            className="top-prev__active swiper_button reels-nav-btn position-absolute top-50 start-0 translate-middle-y"
            style={{ zIndex: 10 }}
          >
            <i className="fa-solid fa-arrow-left-long" />
          </button>

          {/* Next arrow — right side, vertically centered on the slider */}
          <button
            className="top-next__active swiper_button reels-nav-btn position-absolute top-50 end-0 translate-middle-y"
            style={{ zIndex: 10 }}
          >
            <i className="fa-solid fa-arrow-right-long" />
          </button>

          {/* Pagination dots — niche center mein */}
          <div className="row align-items-center justify-content-center mt-4">
            <div className="col-auto">
              <div className="pagination swiper--pagination top-pagination__active" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AgentListingsSlider;
