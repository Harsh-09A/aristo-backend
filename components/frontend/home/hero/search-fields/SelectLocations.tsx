// @ts-nocheck
"use client";
import { locationOptions } from "@/data/filterOptions";
import { useEffect, useState } from "react";
import Select from "react-select";

// @ts-ignore
const SelectLocations = ({ customStyles, currentTab, filters, setFilters }) => {
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
              filters.location
                ? locationOptions.find((o) => o.value === filters.location)
                : null
            }
            onChange={(selected) => {
              setFilters((prev) => ({
                ...prev,
                location: selected?.value || null,
              }));
            }}
            // onChange={(val) =>
            //   setFilters({
            //     ...filters,
            //     location: val?.value || null,
            //   })
            // }
            // defaultValue={[locationOptions[0]]}
            name="location"
            options={locationOptions}
            styles={customStyles}
            className="text-start select-borderless btn-light"
            classNamePrefix="select"
            placeholder="Select Location"
            required
            isSearchable={false}
          />
        )}
      </div>
    </>
  );
};

export default SelectLocations;
