// @ts-nocheck
import React from "react";
// type Filters = {
//   category: string;
//   propertyType: string | null;
//   search: string | null;
//   location: string | null;
//   bhk: string | null;
//   min_price: number | null;
//   max_price: number | null;
//   status: string | null;
//   developer: string | null;
// };

// type SearchInputProps = {
//   currentTab: string;
//   filters: Filters;
//   setFilters: React.Dispatch<React.SetStateAction<Filters>>;
// };

// @ts-ignore
// const SearchInput = ({ currentTab, filters, setFilters }: SearchInputProps) => {
const SearchInput = ({ currentTab, filters, setFilters }) => {
  return (
    <>
      <div className="advance-search-field position-relative text-start">
        <form className="form-search position-relative">
          <div className="box-search">
            <span className="icon flaticon-home-1" />
            <input
              className="form-control bgc-f7 "
              type="text"
              name="search"
              value={filters.search || ""}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  search: e.target.value,
                }))
              }
              placeholder={`Search  ${currentTab[0].toUpperCase() + currentTab.slice(1)} Property`}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchInput;
