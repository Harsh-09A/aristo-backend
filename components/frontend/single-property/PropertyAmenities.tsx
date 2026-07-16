import { Project } from "@/types/property";

interface Props {
  data: Project;
}

const PropertyAmenities = ({ data }: Props) => {
  const amenities = data.amenities;

  return (
    <>
      <ul className="row list-unstyled mb-0 g-x-5 g-y-3">
        {amenities.map((amenity, index) => (
          // col-6 (mobile pe 2 columns) aur col-md-4 (desktop pe 3 columns)
          <li key={index} className="col-6 col-md-4 d-flex align-items-start">
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
