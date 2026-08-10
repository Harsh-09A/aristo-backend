import PropertySearchFilters from "@/components/frontend/property-search/PropertySearchFilters";
import { getAllLocations } from "@/services/location-service"

const Hero = async() => {
  const locations = await getAllLocations();

  return (
    <>
      <div className="inner-banner-style1 text-center">
        {/* <h6 className="hero-sub-title animate-up-1">THE BEST WAY TO</h6> */}
        <h2 className="hero-title animate-up-2">Turning Dreams Into Addresses</h2>
        {/* <p className="hero-text fz15 animate-up-3">
          We’ve more than 745,000 apartments, place &amp; plot.
        </p> */}
        {/* Hero Tab Content */}
        {/* <PropertySearchPanel /> */}
        <PropertySearchFilters locations={locations} variant="hero" />
      </div>
      {/* End Hero content */}
    </>
  );
};

export default Hero;
