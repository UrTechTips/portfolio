import React, { useContext, useEffect, useRef } from "react";
import styles from "./timeline.module.scss";
import { gsapContext } from "@/app/context";

interface TimelineItem {
	duration: string;
	title: string;
	content: string;
}

interface TimelineProps {
	items: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
	const timelineRef = useRef<HTMLDivElement>(null);
	const gsap = useContext(gsapContext).gsap;

	useEffect(() => {
		if (timelineRef.current) {
			gsap.to(timelineRef.current, {
				"--timeline-height": "100%",
				scrollTrigger: {
					trigger: timelineRef.current,
					start: "top 50%",
					end: "bottom 70%",
					scrub: true,
				},
			});

			const containers = timelineRef.current.querySelectorAll(`.${styles.container}`);
			containers.forEach((container, index) => {
				gsap.fromTo(
					container,
					{ opacity: 0, y: 100 },
					{
						opacity: 1,
						y: 0,
						scrollTrigger: {
							trigger: container,
							start: "top 80%",
							end: "top 60%",
							scrub: true,
						},
						duration: 1.5,
						ease: "power2.out",
					}
				);
			});
		}
	}, [gsap]);

	return (
		<div ref={timelineRef} className={styles.timeline}>
			{items.map((item, index) => (
				<div key={index} className={`${styles.container} ${index % 2 === 0 ? styles.left : styles.right}`}>
					<img src="/images/amazon.png" alt="Amazon" />
					<div className={styles.textBox}>
						<h2>{item.title}</h2>
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
