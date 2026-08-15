"use client";
import Timeline from "@/components/timeline/timeline.component";
import useCursorAnimations from "@/hooks/useCursorAnimations";
import { useContext } from "react";
import portfolio from "../../../public/portfolio.json";
import styles from "./about.module.scss";

import Back from "@/components/backLink/backLink.component";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { gsapContext } from "../context";

const About = () => {
	const cursorRef = useContext(gsapContext).cursorRef;
	const cursorAnims = useCursorAnimations(cursorRef);

	return (
		<div className={styles.container}>
			<Back />
			<div className={styles.bio}>
				<h1>About</h1>
				<div>
					<div>
						<p>I'm Sai Sreenadh, though you'll probably find me online as <span>STron</span>. I'm a CSE (AI & ML) student at VIT-AP, interested in building software across the stack — from thoughtful interfaces and full-stack applications to machine learning and GenAI systems.</p>
						<p>I started with web development and UI design before gradually moving into backend development, machine learning, computer vision, NLP, and GenAI. I've worked with technologies like Next.js, React, Node.js, MongoDB, Python, FastAPI, and PyTorch, building projects ranging from RAG systems and deepfake detection to ML-based applications.</p>
						<p>What interests me most is solving interesting problems rather than simply using new technology. I like understanding how things work, experimenting with different approaches, and turning ideas into practical software that people can actually use.</p>
						<p>Outside of tech, I'm usually playing video games, reading, or exploring something new. I'm still figuring out where this path will take me, but I know I want to keep building, learning, and working on things that make me curious..</p>
						<div className={styles.icons}>
							<Link href={portfolio.github} target="_blank">
								<FaGithub onMouseEnter={cursorAnims.linkMouseEnter} onMouseLeave={cursorAnims.linkMouseLeave} />
							</Link>
							<Link href={portfolio.linkedin} target="_blank">
								<FaLinkedin onMouseEnter={cursorAnims.linkMouseEnter} onMouseLeave={cursorAnims.linkMouseLeave} />
							</Link>
						</div>
					</div>
					<Image id="btn-rect" className={styles.image} src={portfolio.picture} alt="Picture" width={500} height={500} />
				</div>
			</div>
			<div className={styles.timeline}>
				<h2>Timeline</h2>
				<Timeline items={portfolio.timeline}></Timeline>
			</div>
		</div>
	);
};

export default About;
