// app/locations/map/page.tsx
import { getNaviMumbaiLocations } from "@/services/location-service";
import NaviMumbaiMap from "@/components/frontend/map/NaviMumbaiMap";
import SectionHeading from "@/components/frontend/common/sections/SectionHeading";

export default async function LocationMapPage() {
  const locations = await getNaviMumbaiLocations();

  return (
    <div className="container py-5">
      {/* <h2>Explore Navi Mumbai</h2> */}
      <SectionHeading
        heading={"Explore"}
        title={"Explore"}
        highlight={"Navi Mumbai"}
        subtitle={"Lorem ipsum dolor sit, amet consectetur"}
      />
      <p></p>
      <NaviMumbaiMap locations={locations} />
    </div>
  );
}
