// @ts-nocheck
"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SelectPropertyType from "./search-fields/SelectPropertyType";
import { StylesConfig } from "react-select";
import SearchInput from "./search-fields/SearchInput";
import SelectLocations from "./search-fields/SelectLocations";
import SelectBedrooms from "./search-fields/SelectBedroom";
import SelectMinPrice from "./search-fields/SelectMinPrice";
import SelectMaxPrice from "./search-fields/SelectMaxPrice";
import SelectStatus from "./search-fields/SelectStatus";
import { Filters, defaultFilters } from "@/types/filter";

type Tab = {
  id: "residential" | "commercial";
  label: string;
};

const customStyles = {
  // @ts-ignore
  option: (styles, { isFocused, isSelected, isHovered }) => {
    return {
      ...styles,
      backgroundColor: isSelected
        ? "#eb6753"
        : isHovered
          ? "#eb675312"
          : isFocused
            ? "#eb675312"
            : undefined,
    };
  },
};

const PropertySearchPanel: React.FC = () => {
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab["id"]>("residential");

  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const handleReset = () => {
    setFilters(defaultFilters);
  };

  const handleTabClick = (tab: Tab["id"]) => {
    setActiveTab(tab);
    setFilters({
      ...defaultFilters,
      category: tab || null,
    });
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (filters.category) params.set("category", filters.category);
    if (filters.type) params.set("type", filters.type);
    if (filters.search) params.set("search", filters.search);
    if (filters.location) params.set("location", filters.location);
    if (filters.bhk) params.set("bhk", filters.bhk);
    if (filters.min_price)
      params.set("min_price", filters.min_price.toString());
    if (filters.max_price)
      params.set("max_price", filters.max_price.toString());
    if (filters.status) params.set("status", filters.status);
    if (filters.developer) params.set("developer", filters.developer);

    router.push(`/listings?${params.toString()}`);
    // router.push(`/testpage?${params.toString()}`);
  };

  const tabs: Tab[] = [
    { id: "residential", label: "Residential" },
    { id: "commercial", label: "Commercial" },
  ];

  // useEffect(() => {
  //   const handlePageShow = () => {
  //     setActiveTab("residential");
  //   };

  //   window.addEventListener("pageshow", handlePageShow);

  //   return () => {
  //     window.removeEventListener("pageshow", handlePageShow);
  //   };
  // }, []);
  // const activeTab = filters.category;

  return (
    <div className="advance-search-tab mt70 mt30-md mx-auto animate-up-3">
      <ul className="nav nav-tabs p-0 m-0">
        {tabs.map((tab) => (
          <li className="nav-item" key={tab.id}>
            <button
              type="button"
              className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="tab-content">
        <div className="">
          <div className="advance-content-style3">
            {/* SHOW ON DESKTOP */}
            <div className="d-none d-lg-block">
              <div className="row g-3 align-items-stretch">
                {/* Search Input */}
                <div className="col-12 col-lg-8 order-1 order-lg-2">
                  <SearchInput
                    currentTab={activeTab}
                    filters={filters}
                    setFilters={setFilters}
                  />
                </div>

                {/* Property Type */}
                <div className="col-12 col-sm-6 col-lg-3 order-2 order-lg-1">
                  <SelectPropertyType
                    customStyles={customStyles}
                    currentTab={activeTab}
                    filters={filters}
                    setFilters={setFilters}
                  />
                </div>

                {/* Location */}
                <div className="col-12 col-sm-6 col-lg-3 order-3">
                  <SelectLocations
                    customStyles={customStyles}
                    currentTab={activeTab}
                    filters={filters}
                    setFilters={setFilters}
                  />
                </div>

                {/* Bedrooms */}
                {activeTab !== "commercial" && (
                  <div className="col-12 col-sm-6 col-lg-2 order-4">
                    <SelectBedrooms
                      customStyles={customStyles}
                      currentTab={activeTab}
                      filters={filters}
                      setFilters={setFilters}
                    />
                  </div>
                )}

                {/* Min Price */}
                <div className="col-12 col-sm-6 col-lg-2 order-5">
                  <SelectMinPrice
                    customStyles={customStyles}
                    currentTab={activeTab}
                    filters={filters}
                    setFilters={setFilters}
                  />
                </div>

                {/* Max Price */}
                <div className="col-12 col-sm-6 col-lg-2 order-6">
                  <SelectMaxPrice
                    customStyles={customStyles}
                    currentTab={activeTab}
                    filters={filters}
                    setFilters={setFilters}
                  />
                </div>

                {/* Status */}
                <div className="col-12 col-sm-6 col-lg-3 order-7">
                  <SelectStatus
                    customStyles={customStyles}
                    currentTab={activeTab}
                    filters={filters}
                    setFilters={setFilters}
                  />
                </div>

                {/* Search Button */}
                <div className="col-12 col-lg-1 order-8 order-lg-2">
                  <button
                    className="advance-search-icon ud-btn btn-thm w-100 h-100"
                    // onClick={() => router.push("/searchpages")}
                    onClick={handleSearch}
                    type="button"
                  >
                    <span className="flaticon-search" />
                  </button>
                </div>
              </div>
            </div>
            {/* SHOW ON MOBILE */}
            <div className="d-block d-lg-none">
              <div className="row g-3">
                <div className="col-12">
                  <SearchInput
                    currentTab={activeTab}
                    filters={filters}
                    setFilters={setFilters}
                  />
                </div>

                <div className="col-12">
                  <SelectPropertyType
                    customStyles={customStyles}
                    currentTab={activeTab}
                    filters={filters}
                    setFilters={setFilters}
                  />
                </div>

                <div className="col-12">
                  <SelectLocations
                    customStyles={customStyles}
                    currentTab={activeTab}
                    filters={filters}
                    setFilters={setFilters}
                  />
                </div>
              </div>

              {showMore && (
                <div className="row g-3 mt-1">
                  <div className="col-12">
                    <SelectBedrooms
                      customStyles={customStyles}
                      currentTab={activeTab}
                      filters={filters}
                      setFilters={setFilters}
                    />
                  </div>

                  <div className="col-12">
                    <SelectMinPrice
                      customStyles={customStyles}
                      currentTab={activeTab}
                      filters={filters}
                      setFilters={setFilters}
                    />
                  </div>

                  <div className="col-12">
                    <SelectMaxPrice
                      customStyles={customStyles}
                      currentTab={activeTab}
                      filters={filters}
                      setFilters={setFilters}
                    />
                  </div>

                  <div className="col-12">
                    <SelectStatus
                      customStyles={customStyles}
                      currentTab={activeTab}
                      filters={filters}
                      setFilters={setFilters}
                    />
                  </div>
                </div>
              )}

              <div className="mt-3">
                <button
                  className="btn btn-link p-0"
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? "Less Filters" : "More Filters"}
                </button>
              </div>

              <div className="mt-4">
                <button
                  className="advance-search-icon ud-btn btn-thm w-100"
                  type="button"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertySearchPanel;
