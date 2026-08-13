import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getAllProjectSlugs, getAllProjectsMeta, getProjectSource } from "@/lib/projects";
import ProjectView from "@/components/projectView/projectView.component";

export async function generateStaticParams() {
	return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
	const { frontmatter } = getProjectSource(params.slug);
	return {
		title: `${frontmatter.title} — Project | STron`,
		description: frontmatter.tagline,
	};
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
	if (!getAllProjectSlugs().includes(params.slug)) notFound();

	const { frontmatter, content, slug } = getProjectSource(params.slug);
	const { content: overview } = await compileMDX({ source: content });

	const all = getAllProjectsMeta();
	const currentIndex = all.findIndex((p) => p.slug === slug);
	const next = all[(currentIndex + 1) % all.length];

	return (
		<ProjectView
			frontmatter={frontmatter}
			overview={overview}
			next={{ slug: next.slug, title: next.title }}
		/>
	);
}