import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import AmenityForm from "../../AmenityForm";

export default async function EditAmenityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const amenity = await prisma.amenity.findUnique({
    where: { id: id },
  });

  if (!amenity) {
    notFound();
  }

  return (
    <div>
      <h1 className="h3 mb-4">Edit Amenity</h1>
      <div className="card">
        <div className="card-body">
          <AmenityForm amenity={amenity} />
        </div>
      </div>
    </div>
  );
}
