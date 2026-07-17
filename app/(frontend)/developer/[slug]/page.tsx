// app/developers/[slug]/page.tsx

import { notFound } from "next/navigation";
import { getDeveloperBySlug, getDeveloperProjects } from "@/services/developer-service";
import DeveloperSinglePage from "@/components/frontend/developer/DeveloperSinglePage";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const developer = await getDeveloperBySlug(slug);

  return {
    title: developer ? `${developer.name} | Developers` : "Developer Not Found",
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = await searchParams;

  // Read ?page=2 from the URL, default to page 1
  const currentPage = Math.max(1, Number(sp.page) || 1);

  const developer = await getDeveloperBySlug(slug);
  if (!developer) {
    notFound();
  }

  const { projects, totalPages } = await getDeveloperProjects(developer.id, currentPage);

  return (
    <DeveloperSinglePage
      developer={developer}
      projects={projects}
      currentPage={currentPage}
      totalPages={totalPages}
      searchParams={sp}
    />
  );
}