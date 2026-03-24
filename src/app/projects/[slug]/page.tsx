import { projects } from "@/data/projects";
import type { Metadata } from "next";
import ProjectPageClient from "./ProjectPageClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | Othmane El Rhareg`,
      description: project.description,
      images: [{ url: project.thumbnail, width: 800, height: 600 }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Othmane El Rhareg`,
      description: project.description,
      images: [project.thumbnail],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <a href="/" className="text-accent hover:underline">
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return <ProjectPageClient project={project} />;
}
