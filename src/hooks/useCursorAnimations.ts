import { gsapContext } from "@/app/context";
import { Dispatch, MutableRefObject, RefObject, SetStateAction, useContext, useState } from "react";

const useCursorAnimations = (cursorRef: RefObject<HTMLDivElement>) => {
	const [isCursorStuck, setIsCursorStuck] = useState(false);
	const setCursorStuck = useContext(gsapContext).setIsCursorStuck;

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

	const buttonMouseEnter = async (buttonRef: Element) => {
		if (cursorRef.current && buttonRef) {
			setIsCursorStuck(true);
			if (setCursorStuck) {
				setCursorStuck(true);
			}

			const buttonRect = buttonRef.getBoundingClientRect();
			const buttonWidth = buttonRef.clientWidth;
			const buttonHeight = buttonRef.clientHeight + 1;
			const scrolledTop = buttonRect.top + window.scrollY;

			const styles: React.CSSProperties = {
				position: "absolute",
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

			// Apply these styles and ensure the cursor stays there
			Object.assign(cursorRef.current.style, styles);
		}
	};

	const reset = () => {
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

	const specialTextEntry = (e: Element) => {
		if (cursorRef.current && e) {
			const buttonRect = e.getBoundingClientRect();
			const buttonWidth = buttonRect.width;
			const buttonHeight = buttonRect.height + 1;

			const scrolledTop = buttonRect.top + window.scrollY;

			const styles: React.CSSProperties = {
				width: `calc(${buttonWidth}px + 0.4rem)`,
				height: `${buttonHeight}px`,
				top: `${scrolledTop}px`,
				left: `calc(${buttonRect.left}px - 0.2rem)`,
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

	return { isCursorStuck, linkMouseEnter, linkMouseLeave, projectMouseEnter, projectMouseLeave, buttonMouseEnter, reset, cursorMove, specialTextEntry };
};

export default useCursorAnimations;
