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
		if (!isCursorStuck) {
			document.addEventListener("mousemove", cursorMove);
		} else {
			document.removeEventListener("mousemove", cursorMove);
		}
		return () => {
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
