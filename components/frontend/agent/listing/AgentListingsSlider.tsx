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

  }[];
};

const AgentListingsSlider = ({ agents }: Props) => {
  return (
    <>
      <Swiper
        spaceBetween={20}
        modules={[Navigation, Pagination]}
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

export default AgentListingsSlider;
