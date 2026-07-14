// @ts-nocheck
"use client";
import { maxOptions } from "@/data/filterOptions";
import { useEffect, useState } from "react";
import Select from "react-select";

// @ts-ignore
const SelectMaxPrice = ({ customStyles, currentTab, filters, setFilters }) => {


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
              filters.max_price
                ? maxOptions.find((o) => o.value === filters.max_price)
                : null
            }
            onChange={(selected) => {
              setFilters((prev) => ({
                ...prev,
                max_price: selected?.value || null,
              }));
            }}
            // defaultValue={[bhkOptions[0]]}
            name="max_price"
            options={maxOptions}
            styles={customStyles}
            className="text-start select-borderless btn-light"
            classNamePrefix="select"
            placeholder="Max Price"
            required
            isSearchable={false}
          />
        )}
      </div>
    </>
  );
};

export default SelectMaxPrice;
