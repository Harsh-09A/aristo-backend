import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import LocationForm from "../../LocationForm";

export default async function EditLocationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const location = await prisma.location.findUnique({
    where: { id: id },
  });

  if (!location) {
    notFound();
  }

  return (
    <div>
      <h1 className="h3 mb-4">Edit Location</h1>
      <div className="card">
        <div className="card-body">
          <LocationForm location={location} />
        </div>
      </div>
    </div>
  );
}
