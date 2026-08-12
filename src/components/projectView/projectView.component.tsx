// components/projectView/projectView.component.tsx
"use client";
import { gsapContext } from "@/app/context";
import SideNav from "@/components/sideNav/sideNav.component";
import useCursorAnimations from "@/hooks/useCursorAnimations";
import { useContext, useEffect, useRef, type ReactNode } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import gsap from "gsap";
import type { ProjectFrontmatter } from "@/lib/projects";
import styles from "@/app/project.module.scss";

interface Props {
	frontmatter: ProjectFrontmatter;
	overview: ReactNode;
	next: { slug: string; title: string };
}

const ProjectView = ({ frontmatter: f, overview, next }: Props) => {
	const { cursorRef } = useContext(gsapContext);
	const cursorAnims = useCursorAnimations(cursorRef);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.to(".fadeUp", {
				opacity: 1,
				y: 0,
				duration: 0.6,
				stagger: 0.1,
				ease: "power2.out",
				from: { opacity: 0, y: 20 } as any, // or use gsap.fromTo if you prefer explicit start state
			});
		}, containerRef);
		return () => ctx.revert();
	}, [f]); // re-runs cleanly when navigating between projects

	return (
		<div className={styles.blackBG} ref={containerRef}>
			<SideNav mouseEnter={cursorAnims.linkMouseEnter} mouseLeave={cursorAnims.linkMouseLeave} />
			<div className={styles.navbar}>
				<a href="/" aria-label="Go back to homepage" onMouseEnter={cursorAnims.linkMouseEnter} onMouseLeave={cursorAnims.linkMouseLeave}>
					<IoMdArrowRoundBack className={styles.icon} />
					<h1>Back</h1>
				</a>
			</div>

			<div className={styles.body}>
				<main className={styles.main}>
					<header className={styles.hero}>
						<div className={`${styles.eyebrow} ${styles.fadeUp}`}>Project</div>
						<h1 className={styles.fadeUp}>{f.title}</h1>
						<p className={`${styles.tagline} ${styles.fadeUp}`}>{f.tagline}</p>
					</header>

					<section className={styles.metaGrid}>
						{f.meta.map((m) => (
							<div className={styles.metaCell} key={m.label}>
								<div className={styles.label}>{m.label}</div>
								<div className={styles.value}>{m.value}</div>
							</div>
						))}
					</section>

					{f.visual?.type === "board" && (
						<section className={styles.visual} aria-label="Screenshot of the board">
							<div className={styles.board}>
								{f.visual.boardState.map((v, i) => (
									<div className={styles.cell} key={i}>{v}</div>
								))}
								{f.visual.winLine && <div className={styles.winLine} />}
							</div>
						</section>
					)}

					<section className={styles.overview}>
						<h2>Overview</h2>
						{overview}
					</section>

					<section className={styles.features}>
						<h2>What I built</h2>
						<ul>{f.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
					</section>

					{f.results && f.results.length > 0 && (
						<section className={styles.features}>
							<h2>Results</h2>
							<div className={styles.metaGrid}>
								{f.results.map((r) => (
									<div className={styles.metaCell} key={r.label}>
										<div className={styles.label}>{r.label}</div>
										<div className={styles.value}>{r.value}</div>
									</div>
								))}
							</div>
						</section>
					)}

					<section className={styles.stackSection}>
						<h2>Tech stack</h2>
						<div className={styles.pills}>
							{f.stack.map((s) => <span className={styles.pill} key={s}>{s}</span>)}
						</div>
					</section>

					<section className={styles.linksSection}>
						{f.links.map((l) => (
							<a
								key={l.href}
								href={l.href}
								target="_blank"
								rel="noopener"
								className={styles.linkRow}
								onMouseEnter={cursorAnims.linkMouseEnter}
								onMouseLeave={cursorAnims.linkMouseLeave}
							>
								<span>{l.label}</span>
								<span className={styles.arrow}>↗</span>
							</a>
						))}
					</section>

					<Link
						href={`/projects/${next.slug}`}
						className={styles.nextRow}
						onMouseEnter={cursorAnims.linkMouseEnter}
						onMouseLeave={cursorAnims.linkMouseLeave}
					>
						<div>
							<span className={styles.nextLabel}>Next project</span>
							<span className={styles.nextTitle}>{next.title}</span>
						</div>
						<span className={styles.nextArrow}>→</span>
					</Link>
				</main>
			</div>
		</div>
	);
};

export default ProjectView;