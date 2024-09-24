import { Dispatch, MutableRefObject, RefObject, SetStateAction, useState } from "react";

const useCursorAnimations = (cursorRef: RefObject<HTMLDivElement>, setCursorStuck: Dispatch<SetStateAction<boolean>> | null = null) => {
	const [isCursorStuck, setIsCursorStuck] = useState(false);

	const cursorMove = (e: MouseEvent, requestRef: MutableRefObject<number | null>) => {
		if (!isCursorStuck) {
			const updatePosition = () => {
				if (cursorRef.current) {
					cursorRef.current.style.left = `${e.pageX}px`;
					cursorRef.current.style.top = `${e.pageY}px`;
				}
			};

			if (requestRef.current) {
				cancelAnimationFrame(requestRef.current);
			}
			requestRef.current = requestAnimationFrame(updatePosition);
		} else {
			alert("Stuck");
		}
	};

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

	const buttonMouseEnter = (buttonRef: RefObject<HTMLInputElement>) => {
		if (cursorRef.current && buttonRef.current) {
			const buttonRect = buttonRef.current.getBoundingClientRect();
			const buttonWidth = buttonRef.current.offsetWidth;
			const buttonHeight = buttonRef.current.offsetHeight + 1;

			const scrolledTop = buttonRect.top + window.scrollY;

			const styles: React.CSSProperties = {
				width: `${buttonWidth}px`,
				height: `${buttonHeight}px`,
				top: `${scrolledTop}px`,
				left: `${buttonRect.left}px`,
				borderRadius: "0%",
				transform: "translate(0, 0)",
				background: "transparent",
				outline: "2px solid #fff",
				outlineOffset: "5px",
			};

			Object.assign(cursorRef.current.style, styles);

			setIsCursorStuck(true);
			if (setCursorStuck) {
				setCursorStuck(true);
			}
		}
	};

	const buttonMouseLeave = () => {
		if (cursorRef.current) {
			const cursorStyles: React.CSSProperties = {
				zIndex: 99999999999,
				width: "1.5rem",
				height: "1.5rem",
				borderRadius: "50%",
				position: "absolute",
				backgroundColor: "#fff",
				mixBlendMode: "difference",
				transform: "translate(-50%, -50%)",
				transition: "all 0.25s ease-out",
				pointerEvents: "none",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center center",
				padding: 0,
				outline: "none",
			};

			Object.assign(cursorRef.current.style, cursorStyles);

			setIsCursorStuck(false);
			if (setCursorStuck) {
				setCursorStuck(false);
			}
		}
	};

	const specialTextEntry = (e: EventTarget & HTMLSpanElement) => {
		if (cursorRef.current && e) {
			const buttonRect = e.getBoundingClientRect();
			const buttonWidth = e.offsetWidth;
			const buttonHeight = e.offsetHeight + 1;

			const scrolledTop = buttonRect.top + window.scrollY;

			const styles: React.CSSProperties = {
				width: `${buttonWidth}px`,
				height: `${buttonHeight}px`,
				top: `${scrolledTop}px`,
				left: `${buttonRect.left}px`,
				borderRadius: "0%",
				transform: "translate(0, 0)",
				// background: "transparent",
			};

			Object.assign(cursorRef.current.style, styles);

			setIsCursorStuck(true);
			if (setCursorStuck) {
				setCursorStuck(true);
			}
		}
	};

	return { linkMouseEnter, linkMouseLeave, projectMouseEnter, projectMouseLeave, buttonMouseEnter, buttonMouseLeave, cursorMove, isCursorStuck, specialTextEntry };
};

export default useCursorAnimations;
