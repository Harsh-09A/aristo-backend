import React from "react";
import { agentsData } from "./agency";
import Image from "next/image";
import Link from "next/link";

const DevelopersCard = () => {
  const data = agentsData;
  return (
    <>
      {data.map((agent) => (
        <div key={agent.id} className="col-md-6 col-lg-3">
          <div className="agency-style1 p30 bdrs12 bdr1 mb30">
            <div className="agency-img">
              <Image
                width={324}
                height={209}
                className=" contain"
                src={agent.imgSrc}
                alt="agency"
              />
              <div className="tag">{agent.propertiesCount}</div>
            </div>
            <div className="agency-details pt10">
              <h6 className="agency-title mb-1 ">{agent.agencyTitle}</h6>

              <div className="d-grid pt10">
                {/* <Link href={`/agency-single/${agent.id}`} className="ud-btn btn-white2"> */}
                <Link href={`#`} className="ud-btn btn-white2">
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
