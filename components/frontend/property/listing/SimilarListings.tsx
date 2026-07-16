// NO "use client" here — this runs on the server
import { getSimilarProperties } from "@/services/property-service";
import TopListingsSlider from "./TopListingsSlider";
import { Project } from "@/types/property";



interface Props {
  data: Project;
}
const SimilarListings = async ({data}:Props) => {
  const currentProjectId =data.id
  const locationId = data.location.id
  const similarProperties = await getSimilarProperties(currentProjectId,locationId);

console.log(similarProperties)
  if(!similarProperties) {
    return <>
    <h3>No Similar Properties</h3>
    </>
  }

  return (
    <>
    {/* <h1> Featured Card</h1> */}
      <TopListingsSlider properties={similarProperties} />
    </>
  );
};

export default SimilarListings;
