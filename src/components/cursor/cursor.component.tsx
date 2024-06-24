import { FC, RefObject, useEffect, useRef, useCallback } from "react";
import styles from "./cursor.module.scss";

interface CursorProps {
	cursorRef: RefObject<HTMLDivElement>;
}

const Cursor: FC<CursorProps> = ({ cursorRef }) => {
	const requestRef = useRef<number | null>(null);

	const cursorMove = useCallback(
		(e: MouseEvent) => {
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
		},
		[cursorRef]
	);

	useEffect(() => {
		document.addEventListener("mousemove", cursorMove);
		return () => {
			document.removeEventListener("mousemove", cursorMove);
			if (requestRef.current) {
				cancelAnimationFrame(requestRef.current);
			}
		};
	}, [cursorMove]);

	return (
		<div className={styles.cursor} ref={cursorRef}>
			{/* <div className={styles.symbol}>A</div> */}
		</div>
	);
};

export default Cursor;
