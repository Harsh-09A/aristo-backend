
// "use client";

import PropertyListings from "@/components/frontend/property/listing/PropertyListings";
import { getFilteredProperties } from "@/services/property-service";

// type Props = {
//   searchParams: Promise<{
//     category?: string;
//     type?: string;
//     search?: string;
//     location?: string;
//     bhk?: string;
//     min_price?: string;
//     max_price?: string;
//     status?: string;
//     developer?: string;
//   }>;
// };

type Props = {
  searchParams: Promise<{
    category?: string;
    type?: string;
    search?: string;
    location?: string;
    bhk?: number;
    min_price?: string;
    max_price?: string;
    status?: string;
    developer?: string;
  }>;
};
const ListingsPage =  async({ searchParams }: Props) => {

   const params = await searchParams;

//   const [filters, setFilters] = useState({
//   category: params.get("category") || "residential",
//   propertyType: params.get("type"),
//   search: params.get("search"),
//   location: params.get("location"),
//   bhk: params.get("bhk"),
//   min_price: params.get("min_price"),
//   max_price: searchParams.get("max_price"),
//   status: params.get("status"),
//   developer: params.get("developer"),
// });

  const properties = await getFilteredProperties({
    category: params.category,
    type: params.type,
    search: params.search,
    location: params.location,
    // bhk: params.bhk,
    bhk: params.bhk ? Number(params.bhk) : undefined,
    min_price: params.min_price ? Number(params.min_price) : undefined,
    max_price: params.max_price ? Number(params.max_price) : undefined,
    status: params.status,
    developer: params.developer,
  });



  return (
    <>
      {/* Breadcumb Sections */}
      <section className="breadcumb-section bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title">Property Listing</h2>
                <div className="breadcumb-list text-capitalize">
                  <a href="#">Home</a>
                  <a href="#">{(params.category) ? params.category :"Listing"}</a>
                  {/* <a href="#">{params.category}</a> */}
                </div>
                <a
                  className="filter-btn-left mobile-filter-btn d-block d-lg-none"
                  data-bs-toggle="offcanvas"
                  href="#listingSidebarFilter"
                  role="button"
                  aria-controls="listingSidebarFilter"
                >
                  <span className="flaticon-settings" /> Filter
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcumb Sections */}

      {/*  */}
      <section className="pt0 pb90 bgc-f7">
        <div className="container">
          <div className="row gx-xl-5">
            <div className="col-lg-4 d-none d-lg-block">
              {/* <ListingSidebar /> */}
              {/* <h1>ListingSidebar</h1> */}

            </div>
            {/* End .col-lg-4 */}

            {/* start mobile filter sidebar */}
            <div
              className="offcanvas offcanvas-start p-0"
              tabIndex={-1}
              id="listingSidebarFilter"
              aria-labelledby="listingSidebarFilterLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="listingSidebarFilterLabel">
                  Listing Filter
                </h5>
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body p-0">
              {/* <ListingSidebar  /> */}
                {/* <h1>ListingSidebar</h1> */}
              </div>
            </div>
            {/* End mobile filter sidebar */}

            <div className="col-lg-8">
              <div className="row align-items-center mb20">
                {/* <TopFilterBar
                  pageContentTrac={pageContentTrac}
                  colstyle={colstyle}
                  setColstyle={setColstyle}
                  setCurrentSortingOption={setCurrentSortingOption}
                /> */}
              </div>
              {/* End TopFilterBar */}

              <div className="row mt15">
                <PropertyListings listings ={properties}  />
              </div>
              {/* End .row */}

              {/* Pagination */}
              <div className="row">
                {/* <PaginationTwo
                  pageCapacity={6}
                  data={sortedFilteredData}
                  pageNumber={pageNumber}
                  setPageNumber={setPageNumber}
                /> */}
              </div>
              {/* End .row */}
            </div>
            {/* End .col-lg-8 */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/*  */}
    </>
  );
};

export default ListingsPage;
