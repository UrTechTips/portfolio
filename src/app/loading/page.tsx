"use client";
import React, { useRef } from "react";
import styles from "./loading.module.scss";

const Loading: React.FC = () => {
	// const gsap = useContext(gsapContext).gsap;
	const headingRef = useRef<HTMLHeadingElement>(null);
	const count = useRef(0);

	return (
		<div id="loading" className={styles.loading}>
			<div className={styles.container} style={{ "--count": count.current } as React.CSSProperties}>
				<span style={{ "--nth": 1 } as React.CSSProperties}>S</span>
				<span style={{ "--nth": 2 } as React.CSSProperties}>T</span>
				<span style={{ "--nth": 3 } as React.CSSProperties}>r</span>
				<span style={{ "--nth": 4 } as React.CSSProperties}>o</span>
				<span style={{ "--nth": 5 } as React.CSSProperties}>n</span>
			</div>
		</div>
	);
};

export default Loading;
