import React, { FC } from "react";
import styles from "./slider.module.scss";
import ProjectData from "../../../public/portfolio.json";

interface SliderProps {
	sliderRef?: React.RefObject<HTMLDivElement>;
	list: string[];
	options: {
		grayscale: boolean;
		pause: boolean;
		reverse: boolean;
	};

	className?: string;
}

const Slider: FC<SliderProps> = ({ className, sliderRef, list, options }) => {
	return (
		<div className={`${styles.slider} ${className}`} data-grayscale={options.grayscale} data-pause={options.pause} data-reverse={options.reverse} ref={sliderRef} style={{ "--height": "16.875rem", "--width": "30rem", "--quantity": `${list.length}` } as React.CSSProperties}>
			<div className={styles.list}>
				{list.map((item, index) => (
					<img className={styles.item} key={index} src={item} style={{ "--position": index + 1 } as React.CSSProperties}></img>
				))}
			</div>
		</div>
	);
};

export default Slider;
