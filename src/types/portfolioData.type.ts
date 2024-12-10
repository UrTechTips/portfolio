export default interface portfolioDataType {
	about: string;
	aboutEloborate: string;
	linkedin: string;
	github: string;
	picture: string;
	bento: string[];
	projects: Project[];
	timeline: Timeline[];
}

interface Project {
	title: string;
	link: string;
	image: string;
	gallery?: {
		lines: string[];
	};
	technologies?: {
		lines: string[];
	};
	description?: {
		lines: string[];
	};
	problem?: {
		lines: string[];
	};
	approach?: {
		lines: string[];
	};
	technologies_tools?: {
		Frontend?: string;
		Backend?: string;
		"Real-Time Database & Authentication"?: string;
		"Artificial Intelligence"?: string;
	};
	challenges?: {
		lines: string[];
	};
	outcome?: {
		lines: string[];
	};
	future_improvements?: {
		lines: string[];
		bullet_points?: string[];
	};
	key_takeaways?: {
		lines: string[];
	};
}

interface Timeline {
	title: string;
	content: string;
	duration: string;
	image: string;
}
