import { RefObject } from "react";

const useCursorAnimations = (cursorRef: RefObject<HTMLDivElement>) => {
	const linkMouseEnter = () => {
		if (cursorRef.current) {
			cursorRef.current.style.width = "5rem";
			cursorRef.current.style.height = "5rem";
		}
	};

	const linkMouseLeave = () => {
		if (cursorRef.current) {
			cursorRef.current.style.width = "1.5rem";
			cursorRef.current.style.height = "1.5rem";
		}
	};

	const projectMouseEnter = (image: string) => {
		if (cursorRef.current) {
			cursorRef.current.style.borderRadius = "5px";
			cursorRef.current.style.border = "1px solid #fff";
			cursorRef.current.style.width = "20rem";
			cursorRef.current.style.height = `${(20 * 9) / 16}rem`;
			cursorRef.current.style.mixBlendMode = "normal";
			cursorRef.current.style.backgroundImage = `url(${image})`;
			cursorRef.current.style.backgroundSize = "cover";
			cursorRef.current.style.backgroundPosition = "center";
		}
	};

	const projectMouseLeave = () => {
		if (cursorRef.current) {
			cursorRef.current.style.borderRadius = "50%";
			cursorRef.current.style.border = "none";
			cursorRef.current.style.width = "1.5rem";
			cursorRef.current.style.height = "1.5rem";
			cursorRef.current.style.mixBlendMode = "difference";
			cursorRef.current.style.backgroundImage = "none";
		}
	};

	return { linkMouseEnter, linkMouseLeave, projectMouseEnter, projectMouseLeave };
};

export default useCursorAnimations;
