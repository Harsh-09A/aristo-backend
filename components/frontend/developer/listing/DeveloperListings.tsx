// NO "use client" here — this runs on the server
import { getTopDevelopers } from "@/services/developer-service";
import DeveloperListingsSlider from "./DeveloperListingsSlider";

const DeveloperListings = async () => {
  
    const  developers  = await getTopDevelopers();
  // console.log(featuredProperties[0].amenities)
  // console.log(featuredProperties)

  return (
    <>
    {/* <h1> DeveloperListings</h1> */}
      <DeveloperListingsSlider developers={developers} />
    </>
  );
};

export default DeveloperListings;
