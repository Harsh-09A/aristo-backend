// NO "use client" here — this runs on the server
import { getSimilarProperties } from "@/services/property-service";
import TopListingsSlider from "./TopListingsSlider";
import { Project } from "@/types/property";

interface Props {
  data: Project;
}

const SimilarListings = async ({ data }: Props) => {
  const currentProjectId = data.id;
  const locationId = data.location?.id; // Optional chaining to prevent runtime crashes if location is missing

  if (!locationId) return <h3>No Similar Properties</h3>;

  const similarProperties = await getSimilarProperties(
    currentProjectId,
    locationId,
  );

  // If the API fails or returns an empty list, handle it gracefully
  if (!similarProperties || similarProperties.length === 0) {
    return <h3>No Similar Properties</h3>;
  }

  return <TopListingsSlider properties={similarProperties} />;
};

export default SimilarListings;
