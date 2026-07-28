// app/locations/map/page.tsx
import { getNaviMumbaiLocations } from "@/services/location-service";
import NaviMumbaiMap from "@/components/frontend/map/NaviMumbaiMap";

export default async function LocationMapPage() {
  const locations = await getNaviMumbaiLocations();

  return (
    <div className="container py-5">
      <h2>Explore Navi Mumbai</h2>
      <p>Map pe pin click karke uss location ke projects dekhein</p>
      <NaviMumbaiMap locations={locations} />
    </div>
  );
}