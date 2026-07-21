import { Project } from "@/types/property";
import { formatIndianDate, getConfigData } from "@/utils/helper-functions";
import React from "react";
interface Props {
  data: Project;
}

const PropertyDetails = ({ data }: Props) => {
  const possession = formatIndianDate(data.possessionDate || "");

  const propertyDetailsData = [
    {
      label: "RERA ID",
      value: data.reraNumber,
    },
    {
      label: "Category",
      value: data.category,
    },
    {
      label: "Type",
      value: data.type,
    },
    {
      label: "Configuration",
      value: getConfigData(data),
    },
    {
      label: "Possession",
      value: possession,
    },
    {
      label: "Status",
      value: data.status,
    },
    {
      label: "Area",
      value: data.area,
    },
    {
      label: "Year Built",
      value: data.yearBuilt,
    },
  ];
  return (
    <>
      {/* Main container ko row banaya aur niche se thoda gap diya */}
      <div className="row g-1 ">
        {propertyDetailsData.map((item, index) => (
          // col-6 lagane se har ek item 50% width lega, yani ek line me 2 items aayenge
          <div key={index} className="col-6">
            <div className="d-flex align-items-baseline gap-2">
              <div className="pd-list">
                <p className="fw600 mb-2 ff-heading dark-color text-nowrap">
                  {item.label} :
                </p>
              </div>
              <div className="pd-list">
                <p className="text mb-2 text-capitalize">
                  {item.value || "N/A"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PropertyDetails;
