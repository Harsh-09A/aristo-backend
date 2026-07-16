import { Project } from "@/types/property";

interface Props {
  data: Project;
}

const PropertyAddress = ({ data }: Props) => {
  const places = data.locationFeatures;
  const fullAddress = `${data.title} ${data.address} `;
  return (
    <>
      <div className={`col-md-12 col-xl-12 `}>
        <div className="d-flex ">
          <div className="pd-list pe-4">
            <p className="fw600 mb10 ff-heading dark-color">Address: </p>
            <p className="fw600 mb10 ff-heading dark-color">Location: </p>
            {/* <p className="fw600 mb-0 ff-heading dark-color">City: </p> */}
          </div>
          <div className="pd-list">
            <p className="text mb10">{data.address}</p>
            <p className="text mb10">{data.location.name}</p>
            {/* <p className="text mb-0">{data.location.state}</p> */}
          </div>
        </div>
      </div>

      <div className="col-md-12">
        <iframe
          className="position-relative bdrs12 mt30 h250"
          loading="lazy"
          src={`https://maps.google.com/maps?q=${fullAddress}&t=m&z=14&output=embed&iwloc=near`}
          title={data.location.name}
          aria-label={data.location.name}
        />
      </div>

      <div className="nearby-places mt-4">
        <h5 className="mb-3 fw-semibold">Nearby Places</h5>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 list-unstyled mb-0">
          {places.map((place, index) => (
            <li key={index} className="d-flex align-items-start">
              {/* Icon */}
              <span className="icon me-2">
                <i className="fas fa-building"></i>
              </span>

              {/* Text */}
              <span className="text">{place}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PropertyAddress;
