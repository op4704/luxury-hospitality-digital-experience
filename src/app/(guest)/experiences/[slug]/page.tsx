import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EXPERIENCES, getExperience } from "@/data/experiences";
import { ExperienceDetail } from "@/components/experiences/ExperienceDetail";

export function generateStaticParams() {
  return EXPERIENCES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const exp = getExperience((await params).slug);
  if (!exp) return {};
  return { title: exp.name, description: exp.summary };
}

export default async function ExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const exp = getExperience((await params).slug);
  if (!exp) notFound();
  return <ExperienceDetail exp={exp} />;
}
