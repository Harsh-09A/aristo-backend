import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import DeveloperForm from "../../DeveloperForm";

export default async function EditDeveloperPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const developer = await prisma.developer.findUnique({
    where: { id: id },
  });

  if (!developer) {
    notFound();
  }

  return (
    <div>
      <h1 className="h3 mb-4">Edit Developer</h1>
      <div className="card">
        <div className="card-body">
          <DeveloperForm developer={developer} />
        </div>
      </div>
    </div>
  );
}
