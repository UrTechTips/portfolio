"use client";
import React, { useContext } from "react";
import styles from "./about.module.scss";
import Timeline from "@/components/timeline/timeline.component";
import portfolio from "../../../public/portfolio.json";
import useCursorAnimations from "@/hooks/useCursorAnimations";
import { IoMdArrowRoundBack } from "react-icons/io";

import { gsapContext } from "../context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const About = () => {
	const router = useRouter();
	const cursorRef = useContext(gsapContext).cursorRef;
	const cursorAnims = useCursorAnimations(cursorRef);

	const homepageNavigate = () => {
		cursorAnims.linkMouseLeave();
		router.push("/");
	};
	return (
		<div className={styles.container}>
			<div className={styles.navbar} onMouseEnter={cursorAnims.linkMouseEnter} onMouseLeave={cursorAnims.linkMouseLeave} onClick={homepageNavigate}>
				<IoMdArrowRoundBack className={styles.icon} />
				<h1 className={styles.h1}>Back</h1>
			</div>
			<div className={styles.bio}>
				<h1>About</h1>
				<div>
					<h2>
						{portfolio.about.substring(0, 24)}
						<span>{portfolio.about.substring(24)}</span>
					</h2>
					<Image className={styles.image} src={portfolio.picture} alt="Picture" width={500} height={500} />
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
