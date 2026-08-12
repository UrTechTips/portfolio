export default interface portfolioDataType {
	about: string;
	aboutEloborate: string;
	linkedin: string;
	github: string;
	picture: string;
	bento: string[];
	timeline: Timeline[];
}

interface Timeline {
	title: string;
	content: string;
	duration: string;
	image: string;
}
