// components/frontend/developer/listing/DeveloperListingsGrid.tsx
import DeveloperCard from "@/components/frontend/developer/cards/DeveloperCard";
import type { getAllDevelopers } from "@/services/developer-service";

type Developers = Awaited<ReturnType<typeof getAllDevelopers>>["developers"];

type Props = {
  developers: Developers;
};

const DeveloperListingsGrid = ({ developers }: Props) => {
  return (
    <div className="row mt15">
      {developers.map((developer) => (
        <div
          className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4"
          key={developer.id}
        >
          <DeveloperCard developer={developer} />
        </div>
      ))}
    </div>
  );
};

export default DeveloperListingsGrid;