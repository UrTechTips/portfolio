import React from "react";
import styles from "./timeline.module.scss";

interface TimelineItem {
	duration: string;
	title: string;
	content: string;
	image: string;
}

interface TimelineProps {
	items: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {

	return (
		<div className={styles.timeline}>
			{items.map((item, index) => (
				<div key={index} className={`${styles.container} ${index % 2 === 0 ? styles.left : styles.right}`}>
					<img src={item.image} alt="Amazon" />
					<div className={styles.textBox}>
						<h3>{item.title}</h3>
						<small>{item.duration}</small>
						<p>{item.content}</p>
						<span className={index % 2 === 0 ? styles.leftContainerArrow : styles.rightContainerArrow}></span>
					</div>
				</div>
			))}
		</div>
	);
};

export default Timeline;
