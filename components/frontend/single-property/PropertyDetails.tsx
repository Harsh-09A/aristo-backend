import { Project } from "@/types/property";
import { formatIndianDate } from "@/utils/helper-functions";
import React from "react";
interface Props {
  data: Project;
}

const PropertyDetails = ({ data }: Props) => {
  const getConfigData = (data: Project) => {
    // Guard: If there are no configurations, return a fallback early
    if (!data.configurations || data.configurations.length === 0) {
      return `N/A`;
    }

    // Residential: Join the string values directly (e.g., "2, 3 BHK")
    if (data.category?.toLowerCase() === "residential") {
      return (
        data.configurations.map((config) => config.value).join(", ") +
        ` ${data.configurationUnit}`
      );
    }

    // Commercial: Clean, filter, and convert string values to numbers
    const numericValues = data.configurations
      .map((config) => Number(config.value))
      .filter((num) => !isNaN(num)); // Remove anything that failed to parse into a number

    // Check if we successfully extracted any valid numbers
    if (numericValues.length > 0) {
      const min = Math.min(...numericValues);
      const max = Math.max(...numericValues);

      // If min and max are identical (e.g. only one config exists), don't show a range
      if (min === max) {
        return `${min} ${data.configurationUnit}`;
      }

      return `${min} - ${max} ${data.configurationUnit}`;
    }

    // Fallback fallback if values couldn't be parsed into numbers
    return `Contact for Details`;
  };
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
  ];
  return (
    <>
      <div className="grid grid-cols-2 gap-x-10 ">
        {propertyDetailsData.map((item, index) => (
          <div key={index} className="d-flex gap-2  ">
            <div className="pd-list">
              <p className="fw600 mb10 ff-heading dark-color">
                {item.label} :{" "}
              </p>
            </div>
            <div className="pd-list">
              <p className="text mb10 text-capitalize">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PropertyDetails;
