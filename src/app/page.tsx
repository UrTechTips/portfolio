import { getAll } from "@vercel/edge-config";
import Landing from "@/components/Landing/landing.component";
import Data from "../../public/portfolio.json";
import portfolioDataType from "@/types/portfolioData.type";
import { Metadata } from "next";
import { getAllProjectsMeta } from "@/lib/projects";

export const metadata = {
  title: "Sai Sreenadh (STron) — CSE (AI & ML) Student & Developer",
  description:
    "Sai Sreenadh (STron) is a CSE (AI & ML) student at VIT-AP who builds full-stack applications, machine learning systems, and GenAI projects.",
  keywords: [
    "Sai Sreenadh",
    "STron",
    "Sai Sreenadh developer",
    "VIT-AP",
    "AI ML student",
    "full-stack developer",
    "machine learning",
    "GenAI",
    "Next.js",
    "Python",
  ],
  authors: [{ name: "Sai Sreenadh" }],
};

type Repo = {
	portfolioData: portfolioDataType;
	config: Record<string, any>;
};

const getStatics = async (): Promise<Repo> => {
	try {
		const config = await getAll();
		return { portfolioData: Data as portfolioDataType, config };
	} catch (err) {
		console.error("Error fetching edge config:", err);
		return { portfolioData: Data as portfolioDataType, config: {} };
	}
};

export default async function Home() {
	const { portfolioData, config } = await getStatics();
	const all = getAllProjectsMeta();

	return (
		<>
			<Landing portfolioData={portfolioData} projects={all} config={config} />
		</>
	);
}
