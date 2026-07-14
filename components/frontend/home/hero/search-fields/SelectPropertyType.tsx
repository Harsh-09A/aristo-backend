// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import Select from "react-select";
import { commercialOptions, residentialOptions } from "@/data/filterOptions";


// @ts-ignore
const SelectPropertyType = ({ customStyles, currentTab ,filters, setFilters}) => {
  // const residentialOptions = [
  //   { value: "apartment", label: "Apartment" },
  //   { value: "studio", label: "Studio" },
  //   { value: "bungalow", label: "Bungalow" },
  //   { value: "villa", label: "Villa" },
  // ];

  // const commercialOptions = [
  //   { value: "office", label: "Office" },
  //   { value: "shop", label: "Shop" },
  //   { value: "showroom", label: "Showroom" },
  //   { value: "warehouse", label: "Warehouse" },
  // ];

  const options =
    currentTab === "residential" ? residentialOptions : commercialOptions;

  const [showSelect, setShowSelect] = useState(false);
  useEffect(() => {
    setShowSelect(true);
  }, []);

  return (
    <>
      <div className="bootselect-multiselect">
        {showSelect && (
          <Select
            value={
              filters.type
                ? options.find((o) => o.value === filters.type)
                : null
            }
            onChange={(selected) => {
              setFilters((prev) => ({
                ...prev,
                type: selected?.value || null,
              }));
            }}
            // defaultValue={[bhkOptions[0]]}
            name="property_type"
            options={options}
            styles={customStyles}
            className="text-start select-borderless btn-light"
            classNamePrefix="select"
            placeholder="Select Types"
            required
            isSearchable={false}
          />
        )}
      </div>
    </>
  );
};

export default SelectPropertyType;
