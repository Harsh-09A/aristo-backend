// components/frontend/location/LocationSinglePage.tsx

import PropertyListingsGrid from "@/components/frontend/property/listing/PropertyListingsGrid";
import Pagination from "@/components/frontend/common/pagination/Pagination";
import type {
  getLocationBySlug,
  getLocationProjects,
} from "@/services/location-service";

type Location = NonNullable<Awaited<ReturnType<typeof getLocationBySlug>>>;
type Projects = Awaited<ReturnType<typeof getLocationProjects>>["projects"];

type LocationSinglePageProps = {
  location: Location;
  projects: Projects;
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string | string[] | undefined>;
};

const LocationSinglePage = ({
  location,
  projects,
  currentPage,
  totalPages,
  searchParams,
}: LocationSinglePageProps) => {
  const { name, slug, _count } = location;

  return (
    <>
      {/* Location Single Section Area */}
      <section className="agent-single pt60">
        <div className="cta-agent bgc-dark mx-auto maxw1600 pt60 pb60 bdrs12 position-relative mx20-lg">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-12">
                <div className="agent-single d-sm-flex align-items-center">
                  <div className="single-contant ml0-xs">
                    <h2 className="title mb-0 text-white">{name}</h2>
                    <p className="fz15 text-white">
                      Listed{" "}
                      <b>
                        {_count.projects}{" "}
                        {_count.projects === 1 ? "Project" : "Projects"}
                      </b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End cta-agent */}

        <div className="container">
          <div className="row wow fadeInUp" data-aos-delay="300">
            <div className="col-lg-12 pr40 pr20-lg">
              {/* Paginated project list */}
              {projects.length > 0 ? (
                <div className="row">
                  <div className="col-lg-12">
                    <h6 className="fz17 mb30 mt30">Projects in {name}</h6>
                    <PropertyListingsGrid listings={projects} />

                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      searchParams={searchParams}
                      basePath={`/locations/${slug}`}
                    />
                  </div>
                </div>
              ) : (
                <p className="text mt30">No projects listed yet.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LocationSinglePage;