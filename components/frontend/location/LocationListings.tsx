// NO "use client" here — this runs on the server
import LocationListingsSlider from "./LocationListingsSlider";
import { getLocations } from "@/services/location-service";


const LocationListings = async () => {
  const fetchedLocations = await getLocations(6);
  // console.log(featuredProperties[0].amenities)
  // console.log(fetchedLocations)
  /*
    {
    id: 'cmrksdn6q0001j49r4ge5lvny',
    name: 'Airoli',
    slug: 'airoli',
    state: 'Navi Mumbai',
    image: '/api/files/locations/1784110348715-839212820-Airoli.jpg',
    createdAt: 2026-07-14T15:08:42.530Z,
    updatedAt: 2026-07-15T10:12:29.275Z,
    _count: { projects: 1 }
  }
  */

  return (
    <>
    {/* <h1> Featured Card</h1> */}
      <LocationListingsSlider locations ={fetchedLocations}  />
    </>
  );
};

export default LocationListings;