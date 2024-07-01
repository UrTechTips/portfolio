"use client";

import React, { useContext, useRef, useEffect } from "react";
import styles from "./project.module.scss";
import { IoMdArrowRoundBack } from "react-icons/io";
import useCursorAnimations from "@/hooks/useCursorAnimations";
import SideNav from "@/components/sideNav/sideNav.component";
import portfolioData from "../../../../public/portfolio.json";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Slider from "@/components/slider/slider.component";
import { gsapContext } from "@/app/context";

gsap.registerPlugin(ScrollToPlugin);

const findByTitle = (title: string, projects: typeof portfolioData.projects) => {
	return projects.find((project) => project.title === title);
};

const ProjectComponent = ({ title }: { title: string }) => {
	const { cursorRef } = useContext(gsapContext);
	const cursorAnims = useCursorAnimations(cursorRef);

	const descriptionRef = useRef<HTMLDivElement>(null);
	const overviewRef = useRef<HTMLDivElement>(null);
	const technologiesRef = useRef<HTMLDivElement>(null);
	const galleryRef = useRef<HTMLDivElement>(null);
	const backgroundRef = useRef<HTMLDivElement>(null);

	const projects = portfolioData.projects;
	const project = findByTitle(title, projects);

	const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
		if (ref.current && backgroundRef) {
			console.log("EHERE");
			gsap.to(backgroundRef.current, { duration: 1, scrollTo: ref.current, ease: "power2.inOut" });
		}
	};

	return (
		<div className={styles.blackBG} ref={backgroundRef}>
			<SideNav mouseEnter={cursorAnims.linkMouseEnter} mouseLeave={cursorAnims.linkMouseLeave} />
			<div className={styles.navbar}>
				<a href="/" onMouseEnter={cursorAnims.linkMouseEnter} onMouseLeave={cursorAnims.linkMouseLeave}>
					<IoMdArrowRoundBack className={styles.icon} />
					<h1>Back</h1>
				</a>
			</div>
			<div className={styles.body}>
				<div className={styles.navigation}>
					<h1>Navigation</h1>
					<h2 onClick={() => scrollToSection(descriptionRef)}>Description</h2>
					<h2 onClick={() => scrollToSection(overviewRef)}>Overview</h2>
					<h2 onClick={() => scrollToSection(technologiesRef)}>Technologies</h2>
					<h2 onClick={() => scrollToSection(galleryRef)}>Gallery</h2>
				</div>
				<div className={styles.main}>
					<div className={styles.header}>
						<h1 className={styles.projectName} ref={descriptionRef}>
							{project?.title}
						</h1>
						<h4 onMouseEnter={cursorAnims.linkMouseEnter} onMouseLeave={cursorAnims.linkMouseLeave}>
							<a href={project?.link} target="_blank">
								Try Now
							</a>
						</h4>
					</div>
					<p className={styles.description}>{project?.description}</p>
					<div className={styles.overview} ref={overviewRef}>
						<h1>Overview of the Project</h1>
						<div>
							<h2>Start Date</h2>
							<h3>{project?.overview.start}</h3>
						</div>
						<div>
							<h2>Finish Date</h2>
							<h3>{project?.overview.end}</h3>
						</div>
						<div>
							<h2>Duration Date</h2>
							<h3>{project?.overview.duration}</h3>
						</div>
					</div>
					<div className={styles.tech} ref={technologiesRef}>
						<h1>Technologies Used</h1>
						{/* <Slider list={project?.technologies!} options={{ grayscale: true, pause: true, reverse: true }} /> */}
						<div>
							{project?.technologies.map((tech, index) => (
								<Image className={styles.techImg} alt={tech} key={index} src={tech} width={300} height={200} />
							))}
						</div>
					</div>
					<div className={styles.gallery} ref={galleryRef}>
						<h1>Gallery</h1>
						<Slider className={styles.slide} list={project?.gallery!} options={{ grayscale: true, pause: true, reverse: false }} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectComponent;
