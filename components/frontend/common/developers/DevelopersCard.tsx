import Image from "next/image";
import Link from "next/link";
import { getAllDevelopers2 } from "@/services/developer-service";

const DevelopersCard = async () => {
  const developers = await getAllDevelopers2();
  return (
    <>
      {developers.map((developer) => (
        <div key={developer.id} className="col-md-6 col-lg-3">
          <div className="agency-style1 p30 bdrs12 bdr1 mb30">
            <div className="agency-img">
              <div
                style={{
                  position: "relative",
                  width: "220px",
                  height: "200px",
                }}
              >
                <Image
                  fill
                  src={
                    developer.logo ||
                    "/assets/images/placeholder/placeholder-image.jpg"
                  }
                  alt={developer.name}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="tag">{`${developer._count.projects} Properties`}</div>
            </div>
            <div className="agency-details pt10">
              <h6 className="agency-title mb-1 ">{developer.name}</h6>

              <div className="d-grid pt10">
                {/* <Link href={`/agency-single/${agent.id}`} className="ud-btn btn-white2"> */}
                <Link
                  href={`/developer/${developer.slug}`}
                  className="ud-btn btn-white2"
                >
                  View Listings
                  <i className="fal fa-arrow-right-long" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default DevelopersCard;
