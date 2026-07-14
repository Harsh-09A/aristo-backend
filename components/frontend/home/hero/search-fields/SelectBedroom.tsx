// @ts-nocheck
"use client";
import { bhkOptions } from "@/data/filterOptions";
import { useEffect, useState } from "react";
import Select from "react-select";

// @ts-ignore
const SelectBedrooms = ({ customStyles, currentTab, filters, setFilters }) => {
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
              filters.bhk
                ? bhkOptions.find((o) => o.value === filters.bhk)
                : null
            }
            onChange={(selected) => {
              setFilters((prev) => ({
                ...prev,
                bhk: selected?.value || null,
              }));
            }}
            // defaultValue={[bhkOptions[0]]}
            name="bhk"
            options={bhkOptions}
            styles={customStyles}
            className="text-start select-borderless btn-light"
            classNamePrefix="select"
            placeholder="Select BHK"
            required
            isSearchable={false}
          />
        )}
      </div>
    </>
  );
};

export default SelectBedrooms;
