// NO "use client" here — this runs on the server
import { getFeaturedProperties } from "@/services/property-service";
import TopListingsSlider from "./TopListingsSlider";

const TopListings = async () => {
  const featuredProperties = await getFeaturedProperties(8);
  // console.log(featuredProperties[0].amenities)
  // console.log(featuredProperties)

  return (
    <>
    {/* <h1> Featured Card</h1> */}
      <TopListingsSlider properties={featuredProperties} />
    </>
  );
};

export default TopListings;
