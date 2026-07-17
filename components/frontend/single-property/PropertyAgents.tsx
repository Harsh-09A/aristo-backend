"use client";

import Image from "next/image";
import { Project } from "@/types/property";

// Swiper ke liye zaroori imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Swiper ka base CSS + navigation arrows ka CSS
import "swiper/css";
import "swiper/css/navigation";

interface Props {
  data: Project;
}

const PropertyAgents = ({ data }: Props) => {
  // Agar is project ke saath koi agent assign nahi hai, toh widget hi mat dikhao
  if (!data.agents || data.agents.length === 0) {
    return null;
  }

  return (
    <div className="agen-personal-info position-relative bgc-white default-box-shadow1 bdrs12 p30 mt30">
      <div className="widget-wrapper mb-0">
        <h6 className="title fz17 mb30">Project Agents</h6>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={1}
          loop={data.agents.length > 1}
        >
          {data.agents.map((agent) => (
            <SwiperSlide key={agent.id}>
              <div className="agent-single d-sm-flex align-items-center pb10">
                <div className="single-img mb30-sm">
                  <Image
                    width={90}
                    height={90}
                    className="w90"
                    src={
                      agent.photo ||
                      "/assets/images/placeholder/placeholder-image.jpg"
                    }
                    alt={agent.name}
                  />
                </div>
                <div className="single-contant ml20 ml0-xs">
                  <h6 className="title mb-1">{agent.name}</h6>
                  {agent.specialization && (
                    <p className="text fz15 mb-1">{agent.specialization}</p>
                  )}
                  {agent.phone && (
                    <a
                      className="text fz15 d-block"
                      href={`tel:${agent.phone}`}
                    >
                      <i className="fa-solid fa-phone pe-1" />
                      {agent.phone}
                    </a>
                  )}
                  {agent.email && (
                    <a
                      className="text fz15 d-block"
                      href={`mailto:${agent.email}`}
                    >
                      <i className="fa-solid fa-envelope pe-1" />
                      {agent.email}
                    </a>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PropertyAgents;
