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
						<h2>
							<span>Hello! I’m Sai Sreenadh,</span> a passionate <span>Full-Stack Developer</span> currently pursuing a <span>B.Tech degree</span>. I specialize in creating intuitive and responsive user interfaces with tools like <span>Next.js</span> and <span>Figma</span>, while also ensuring seamless backend functionality using <span>Node.js</span> and <span>Express</span>. My focus is on building user-friendly, efficient web applications that merge both <span>technical proficiency</span> and <span>creative design</span>.
						</h2>
						<h2>
							I’m committed to continuously learning and evolving in the fast-paced world of technology, always seeking innovative solutions and staying up-to-date with the latest tools and trends in <span>web development</span>.
						</h2>
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
				<h1>Timeline</h1>
				<Timeline items={portfolio.timeline}></Timeline>
			</div>
		</div>
	);
};

export default About;
