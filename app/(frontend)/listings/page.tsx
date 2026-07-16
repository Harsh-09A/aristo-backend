import PropertyListings from "@/components/frontend/property/listing/PropertyListings";
import Pagination from "@/components/frontend/property/listing/Pagination";
import { getFilteredProperties } from "@/services/property-service";
import { getAllLocations } from "@/services/location-service";
import PropertySearchFilters from "@/components/frontend/property-search/PropertySearchFilters";
import { parseListingSearchParams } from "@/lib/property-filters";
import { PROPERTIES_PER_PAGE } from "@/lib/constants";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const ListingsPage = async ({ searchParams }: Props) => {
  const rawParams = await searchParams; // Next 16 me searchParams Promise hota hai
  const filters = parseListingSearchParams(rawParams);

  const pageParam = Array.isArray(rawParams.page) ? rawParams.page[0] : rawParams.page;
  const page = pageParam ? Math.max(1, Number(pageParam)) : 1;

  const [{ properties, totalPages }, locations] = await Promise.all([
    getFilteredProperties({
      category: filters.category || undefined,
      type: filters.type || undefined,
      search: filters.search || undefined,
      location: filters.location || undefined,
      bhk: filters.bhk ? filters.bhk : undefined,
      status: filters.status || undefined,
      min_price: filters.minPrice ? Number(filters.minPrice) : undefined,
      max_price: filters.maxPrice ? Number(filters.maxPrice) : undefined,
      page,
      pageSize: PROPERTIES_PER_PAGE,
    }),
    getAllLocations(),
  ]);

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
                  <a href="#">{filters.category}</a>
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

      <section className="pt0 pb90 bgc-f7">
        <div className="container">
          <div className="row gx-xl-5">
            <div className="col-lg-4 d-none d-lg-block">
              <PropertySearchFilters
                locations={locations}
                variant="sidebar"
                initialValues={filters}
              />
            </div>
            {/* End .col-lg-4 */}

            {/* mobile filter sidebar */}
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
                <PropertySearchFilters
                  locations={locations}
                  variant="sidebar"
                  initialValues={filters}
                />
              </div>
            </div>
            {/* End mobile filter sidebar */}

            <div className="col-lg-8">
              <div className="row mt15">
                <PropertyListings listings={properties} />
              </div>
              {/* End .row */}

              <div className="row">
                <Pagination currentPage={page} totalPages={totalPages} searchParams={rawParams} />
              </div>
              {/* End .row */}
            </div>
            {/* End .col-lg-8 */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
    </>
  );
};

export default ListingsPage;