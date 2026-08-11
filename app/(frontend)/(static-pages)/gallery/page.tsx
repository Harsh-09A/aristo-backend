// app/gallery/page.tsx
import type { Metadata } from "next";
// import Breadcrumb from "@/components/common/Breadcrumb";
// import SectionHeading from "@/components/common/SectionHeading";

import { galleryImages, galleryVideos } from "@/data/gallery";
import PhotoGrid from "@/components/frontend/static-pages/gallery/PhotoGrid";
import VideoGrid from "@/components/frontend/static-pages/gallery/VideoGrid";
import SectionHeading from "@/components/frontend/common/sections/SectionHeading";

export const metadata: Metadata = {
  title: "Gallery | Aristo",
  description: "Photos and videos of our projects, site visits, and events.",
};

export default function GalleryPage() {
  return (
    <>
      {/* <Breadcrumb title="Gallery" subtitle="Explore our work" /> */}
            {/* Breadcrumb Section */}
      <section
        className="breadcumb-section2 p-0"
        style={{
          backgroundImage: 'url("/assets/images/innerpages/about-bg.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title text-white">Gallery</h2>
                <div className="breadcumb-list">
                  <a href="#">Home</a>
                  <a href="#">Gallery</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcrumb Section */}

      {/* ---------- Photos Section ---------- */}
      <section className="photo-gallery-section py-5">
        <div className="container">
          {/* <SectionHeading subtitle="Our Gallery" title="Photos" /> */}
            <SectionHeading
            heading={"Photos"}
            title={"Our "}
            highlight={"Gallery"}
            subtitle={""}
            />
          <PhotoGrid items={galleryImages} />
        </div>
      </section>

      {/* ---------- Videos Section ---------- */}
      <section className="video-gallery-section py-5">
        <div className="container">
          {/* <SectionHeading subtitle="Watch & Explore" title="Videos" /> */}
            <SectionHeading
            heading={"Videos"}
            title={"Watch &  "}
            highlight={"Explore"}
            subtitle={""}
            />
          <VideoGrid items={galleryVideos} />
        </div>
      </section>
    </>
  );
}