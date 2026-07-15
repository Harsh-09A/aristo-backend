// NO "use client" here — this runs on the server
import { getFeaturedProperties } from "@/services/property-service";
import FeaturedListingsSlider from "./FeaturedListingsSlider";

const FeaturedListings = async () => {
  const featuredProperties = await getFeaturedProperties(5);
  // console.log(featuredProperties[0].amenities)
  // console.log(featuredProperties)

  return (
    <>
    {/* <h1> Featured Card</h1> */}
      <FeaturedListingsSlider properties={featuredProperties} />
    </>
  );
};

export default FeaturedListings;
