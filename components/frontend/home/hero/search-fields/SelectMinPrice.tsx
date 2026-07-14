// @ts-nocheck
"use client";
import { minOptions } from "@/data/filterOptions";
import { useEffect, useState } from "react";
import Select from "react-select";

// @ts-ignore
const SelectMinPrice = ({ customStyles, currentTab, filters, setFilters }) => {
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
              filters.min_price
                ? minOptions.find((o) => o.value === filters.min_price)
                : null
            }
            onChange={(selected) => {
              setFilters((prev) => ({
                ...prev,
                min_price: selected?.value || null,
              }));
            }}
            // defaultValue={[bhkOptions[0]]}
            name="min_price"
            options={minOptions}
            styles={customStyles}
            className="text-start select-borderless btn-light"
            classNamePrefix="select"
            placeholder="Min Price"
            required
            isSearchable={false}
          />
        )}
      </div>
    </>
  );
};

export default SelectMinPrice;
