import LocationForm from "../LocationForm";

export default function NewLocationPage() {
  return (
    <div>
      <h1 className="h3 mb-4">Add Location</h1>
      <div className="card">
        <div className="card-body">
          <LocationForm />
        </div>
      </div>
    </div>
  );
}
