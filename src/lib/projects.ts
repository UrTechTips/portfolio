// lib/projects.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type MetaField = { label: string; value: string };
export type ProjectLink = { label: string; href: string };

export type Visual =
	| { type: "board"; boardState: string[]; winLine?: boolean }
	| { type: "image"; src: string; alt: string }
	| { type: "none" };

export interface ProjectFrontmatter {
	title: string;
	order: number;
	tagline: string;
	meta: MetaField[];       // Role / Stack / Timeline / Status — same shape for fullstack & AI/ML
	highlights: string[];    // "What I built" bullets
	results?: MetaField[];   // OPTIONAL — accuracy/F1/latency etc, only AI/ML projects use this
	visual?: Visual;
	stack: string[];
	links: ProjectLink[];
	thumbnail?: string;
	mainLink?: string;
}

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

export function getAllProjectSlugs(): string[] {
	return fs.readdirSync(PROJECTS_DIR)
		.filter((f) => f.endsWith(".mdx"))
		.map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllProjectsMeta() {
	return getAllProjectSlugs()
		.map((slug) => {
			const raw = fs.readFileSync(path.join(PROJECTS_DIR, `${slug}.mdx`), "utf8");
			const { data } = matter(raw);
			return { slug, ...(data as ProjectFrontmatter) };
		})
		.sort((a, b) => a.order - b.order);
}

export function getProjectSource(slug: string) {
	const raw = fs.readFileSync(path.join(PROJECTS_DIR, `${slug.replaceAll(" ", "-")}.mdx`), "utf8");
	const { data, content } = matter(raw);
	return { frontmatter: data as ProjectFrontmatter, content, slug };
}