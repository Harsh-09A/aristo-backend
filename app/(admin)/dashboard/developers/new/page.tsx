import DeveloperForm from "../DeveloperForm";

export default function NewDeveloperPage() {
  return (
    <div>
      <h1 className="h3 mb-4">Add Developer</h1>
      <div className="card">
        <div className="card-body">
          <DeveloperForm />
        </div>
      </div>
    </div>
  );
}
