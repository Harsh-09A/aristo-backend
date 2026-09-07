// app/developers/page.tsx

import { getAllDevelopers } from "@/services/developer-service";
import DeveloperListingsGrid from "@/components/frontend/developer/listing/DeveloperListingsGrid";
import Pagination from "@/components/frontend/common/pagination/Pagination";
import SectionHeading from "@/components/frontend/common/sections/SectionHeading";

export const metadata = {
  title: "All Developers",
};

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function DevelopersPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const currentPage = Math.max(1, Number(sp.page) || 1);

  // const { developers, totalPages } = await getAllDevelopers(currentPage);
  const { developers, totalPages } = await getAllDevelopers(currentPage);

  return (
    <div className="container pt60 pb60">
      {/* <h2 className="mb30">All Developers</h2> */}
      <SectionHeading
        heading={"Developers"}
        title={"All"}
        highlight={"Developers"}
        subtitle={"Explore leading developers and their latest projects."}
      />

      {developers.length > 0 ? (
        <>
          <DeveloperListingsGrid developers={developers} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchParams={sp}
            basePath="/developers"
          />
        </>
      ) : (
        <p className="text mt30">No developers found.</p>
      )}
    </div>
  );
}
