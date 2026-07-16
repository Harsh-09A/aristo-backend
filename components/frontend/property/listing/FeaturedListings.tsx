// NO "use client" here — this runs on the server
import { getLatestProjects } from "@/services/property-service";
import FeaturedListingsSlider from "./FeaturedListingsSlider";

const FeaturedListings = async () => {
  const fetchedProperties = await getLatestProjects(8);
  // console.log(featuredProperties[0].amenities)
  // console.log(featuredProperties)

  return (
    <>
    {/* <h1> Featured Card</h1> */}
      <FeaturedListingsSlider properties={fetchedProperties} />
    </>
  );
};

export default FeaturedListings;
