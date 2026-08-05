// components/frontend/developer/DeveloperSinglePage.tsx

import Image from "next/image";
import PropertyListingsGrid from "@/components/frontend/property/listing/PropertyListingsGrid";
import Pagination from "@/components/frontend/common/pagination/Pagination";
import type {
  getDeveloperBySlug,
  getDeveloperProjects,
} from "@/services/developer-service";

type Developer = NonNullable<Awaited<ReturnType<typeof getDeveloperBySlug>>>;
type Projects = Awaited<ReturnType<typeof getDeveloperProjects>>["projects"];

type DeveloperSinglePageProps = {
  developer: Developer;
  projects: Projects;
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string | string[] | undefined>;
};

const DeveloperSinglePage = ({
  developer,
  projects,
  currentPage,
  totalPages,
  searchParams,
}: DeveloperSinglePageProps) => {
  const { name, logo, description, email, phone, website, slug, _count } =
    developer;

  return (
    <>
      {/* Developer Single Section Area */}
      <section className="agent-single pt60">
        <div className="cta-agent bgc-dark mx-auto maxw1600 pt60 pb60 bdrs12 position-relative mx20-lg">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-12">
                <div className="agent-single d-sm-flex align-items-center">
                  <div className="single-img mb30-sm">
                    <div
                      style={{
                        width: 172,
                        height: 172,
                        borderRadius: "50%",
                        background: "#fff",
                        padding: 20, // <- breathing room so logo doesn't touch the edge
                        boxSizing: "border-box",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <Image
                        src={
                          logo ||
                          "/assets/images/placeholder/placeholder-image.jpg"
                        }
                        alt={name}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  </div>
                  <div className="single-contant ml30 ml0-xs">
                    <h2 className="title mb-0 text-white">{name}</h2>
                    <p className="fz15 text-white">
                      Listed{" "}
                      <b>
                        {_count.projects}{" "}
                        {_count.projects === 1 ? "Project" : "Projects"}
                      </b>
                    </p>
                    <div className="agent-meta mb15 d-md-flex align-items-center">
                      {phone && (
                        <a
                          className="text fz15 pe-2 bdrr1 text-white"
                          href={`tel:${phone}`}
                        >
                          <i className="flaticon-call pe-1" />
                          {phone}
                        </a>
                      )}
                      {email && (
                        <a
                          className="text fz15 ps-2 pe-2 bdrr1 text-white"
                          href={`mailto:${email}`}
                        >
                          <i className="flaticon-smartphone pe-1" />
                          {email}
                        </a>
                      )}{" "}
                      {website && (
                        <a
                          className="text fz15 ps-2 text-white"
                          href={website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit Website
                        </a>
                      )}
                      {description && (
                      <p className="text fz15 ps-2 text-white">
                        {description }
                      </p>
                      )}

                    </div>
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
              {/* <div className="row">
                <div className="col-lg-12">
                  <div className="agent-single-details mt30 pb30 bdrb1">
                    <h6 className="fz17 mb30">About {name}</h6>
                    <p className="text">
                      {description ||
                        "No description available for this developer yet."}
                    </p>
                  </div>
                </div>
              </div> */}

              {/* Paginated project list */}
              {projects.length > 0 ? (
                <div className="row">
                  <div className="col-lg-12">
                    <h6 className="fz17 mb30 mt30">Projects by {name}</h6>
                    <PropertyListingsGrid listings={projects} />

                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      searchParams={searchParams}
                      basePath={`/developer/${slug}`}
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

export default DeveloperSinglePage;
