// components/loading.component.tsx
import React from "react";
import styles from "./loading.module.scss";

const Loading: React.FC = () => {
	return (
		<div id="loading" className={styles.loading}>
			<h1 className={styles.loadingText}>Loading please Wait</h1>
			<div className={styles.progressbar}>
				<div id="progress" className={styles.progress}></div>
			</div>
			<div className={`${styles.bg1} ${styles.bg}`}></div>
			<div className={`${styles.bg2} ${styles.bg}`}></div>
		</div>
	);
};

export default Loading;
