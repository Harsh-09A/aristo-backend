// NO "use client" here — this runs on the server
import { getTopDevelopers,getAllDevelopers } from "@/services/developer-service";
import DeveloperListingsSlider from "./DeveloperListingsSlider";

const DeveloperListings = async () => {
  
    // const  developers  = await getTopDevelopers();
    const topDevelopers = await getAllDevelopers(1, 10);
  // console.log(featuredProperties[0].amenities)
  // console.log(featuredProperties)

  return (
    <>
    {/* <h1> DeveloperListings</h1> */}
      <DeveloperListingsSlider developers={topDevelopers} />
    </>
  );
};

export default DeveloperListings;
