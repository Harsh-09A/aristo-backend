import { Project } from "@/types/property";
import { formatIndianDate, getConfigData } from "@/utils/helper-functions";
import React from "react";
interface Props {
  data: Project;
}
const PropertyOverview = ({ data }: Props) => {
  const possession = formatIndianDate(data.possessionDate || "");

  const overviewData = [
    {
      icon: "flaticon-shower",
      label: "Category",
      value: data.category,
    },
    {
      icon: "flaticon-home-1",
      label: "Type",
      value: data.type,
    },
    {
      icon: "flaticon-expand",
      label: "RERA ID",
      value: data.reraNumber,
    },

    {
      icon: "flaticon-bed",
      label: "Configuration",
      value: getConfigData(data),
    },

    {
      icon: "flaticon-event",
      label: "Possession",
      value: possession,
    },
    {
      icon: "flaticon-garage",
      label: "Status",
      value: data.status,
    },
  ];
  return (
    <>
      <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
        <h4 className="title fz17 mb30">Overview</h4>
        <div className="row">
          {overviewData.map((item, index) => (
            <div key={index} className={`col-sm-6 col-lg-4 mb25 `}>
              <div className="overview-element d-flex align-items-center">
                <span className={`icon ${item.icon}`} />
                <div className="ml15">
                  <h6 className="mb-0">{item.label}</h6>
                  <p className="text mb-0 fz15 text-capitalize">{item.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* USP - Highlights */}
        <h4 className="title fz17 mb30">Property USP</h4>
        <ul className="list-unstyled mb-0">
          {data.highlights.map((highlight, index) => (
            <li key={index} className="d-flex align-items-start mb-3">
              {/* Icon */}
              <span className="icon me-3">
                <i className="fas fa-star"></i>
              </span>

              {/* Text */}
              <span className="text">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PropertyOverview;
