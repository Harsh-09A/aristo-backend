import AmenityForm from "../AmenityForm";

export default function NewAmenityPage() {
  return (
    <div>
      <h1 className="h3 mb-4">Add Amenity</h1>
      <div className="card">
        <div className="card-body">
          <AmenityForm />
        </div>
      </div>
    </div>
  );
}
