import { Project } from "@/types/property";

interface Props {
  data: Project;
}

const PropertyAmenities = ({ data }: Props) => {
  const amenities = data.amenities;

  return (
    <>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-3 list-unstyled mb-0">
        {amenities.map((amenity, index) => (
          <li key={index} className="d-flex align-items-start">
            {/* Icon */}
            <span className="icon me-2 text-danger">
              <span className="me-2 d-inline-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ff3b30"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12l3 3 5-6" />
                </svg>
              </span>
            </span>

            {/* Text */}
            <span className="text">{amenity.name}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PropertyAmenities;
