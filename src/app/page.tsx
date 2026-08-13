import { getAll } from "@vercel/edge-config";
import Landing from "@/components/Landing/landing.component";
import Data from "../../public/portfolio.json";
import portfolioDataType from "@/types/portfolioData.type";
import { Metadata } from "next";
import { getAllProjectsMeta } from "@/lib/projects";

export const metadata: Metadata = {
	title: "STron",
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
