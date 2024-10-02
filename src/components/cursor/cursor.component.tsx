import { FC, RefObject, useEffect, useRef, useCallback, useState } from "react";
import styles from "./cursor.module.scss";
import useCursorAnimations from "@/hooks/useCursorAnimations";

interface CursorProps {
	cursorRef: RefObject<HTMLDivElement>;
	isCursorStuck: boolean;
}

const Cursor: FC<CursorProps> = ({ cursorRef, isCursorStuck }) => {
	const cursorAnims = useCursorAnimations(cursorRef);
	const requestRef = useRef<number | null>(null);

	const cursorMove = useCallback((e: MouseEvent) => cursorAnims.cursorMove(e, requestRef), [cursorRef]);
	useEffect(() => {
		const buttons = document.querySelectorAll("#btn-rect");
		const spans = document.querySelectorAll("#span-highlight");

		const handleMouseEnter = (btn: Element) => {
			document.removeEventListener("mousemove", cursorMove);
			cursorAnims.buttonMouseEnter(btn);
		};
		const handleMouseLeave = () => {
			document.addEventListener("mousemove", cursorMove);
			cursorAnims.reset();
		};
		const handleSpanEnter = (span: Element) => {
			document.removeEventListener("mousemove", cursorMove);
			cursorAnims.specialTextEntry(span);
		};
		const handleSpanLeave = () => {
			document.addEventListener("mousemove", cursorMove);
			cursorAnims.reset();
		};
		buttons.forEach((btn) => {
			btn.addEventListener("mouseenter", () => handleMouseEnter(btn));
			btn.addEventListener("mouseleave", handleMouseLeave);
		});
		spans.forEach((span) => {
			span.addEventListener("mouseenter", () => handleSpanEnter(span));
			span.addEventListener("mouseleave", handleSpanLeave);
		});

		if (!isCursorStuck) {
			document.addEventListener("mousemove", cursorMove);
		} else {
			document.removeEventListener("mousemove", cursorMove);
		}
		return () => {
			buttons.forEach((btn) => {
				btn.removeEventListener("mouseenter", () => handleMouseEnter(btn));
				btn.removeEventListener("mouseleave", handleMouseLeave);
			});
			spans.forEach((span) => {
				span.removeEventListener("mouseenter", () => handleSpanEnter(span));
				span.removeEventListener("mouseleave", handleSpanLeave);
			});

			document.removeEventListener("mousemove", cursorMove);
			if (requestRef.current) {
				cancelAnimationFrame(requestRef.current);
			}
		};
	}, [cursorMove, isCursorStuck]);

	return (
		<div className={styles.cursor} ref={cursorRef}>
			{/* <div className={styles.symbol}>A</div> */}
		</div>
	);
};

export default Cursor;
