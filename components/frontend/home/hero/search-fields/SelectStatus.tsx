// @ts-nocheck
"use client";
import { statusOptions } from "@/data/filterOptions";
import { useEffect, useState } from "react";
import Select from "react-select";

// @ts-ignore
const SelectStatus = ({ customStyles, currentTab, filters, setFilters }) => {
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
              filters.status
                ? statusOptions.find((o) => o.value === filters.status)
                : null
            }
            onChange={(selected) => {
              setFilters((prev) => ({
                ...prev,
                status: selected?.value || null,
              }));
            }}
            // defaultValue={[bhkOptions[0]]}
            name="status"
            options={statusOptions}
            styles={customStyles}
            className="text-start select-borderless btn-light"
            classNamePrefix="select"
            placeholder="Select Status"
            required
            isSearchable={false}
          />
        )}
      </div>
    </>
  );
};

export default SelectStatus;
