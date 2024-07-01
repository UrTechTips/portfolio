import ProjectComponent from ".";
import portfolioData from "../../../../public/portfolio.json";

export const generateStaticParams = () => {
	return portfolioData.projects.map((project) => ({
		project: project.title,
	}));
};

const Project = ({ params }: { params: { project: string } }) => {
	return <ProjectComponent title={params.project} />;
};

export default Project;
