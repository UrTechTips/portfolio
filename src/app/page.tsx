"use client";
import SideNav from "@/components/sideNav/sideNav.component";
import { useGSAP } from "@gsap/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useContext, useRef, useState } from "react";
import { FaExternalLinkAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import SplitType from "split-type";
import portfolioData from "../../public/portfolio.json";
import styles from "./page.module.scss";
import useCursorAnim from "@/hooks/useCursorAnimations";
import { useRouter } from "next/navigation";
import { gsapContext } from "./context";
import Link from "next/link";
import MainAlert from "@/components/mainAlert/mainAlert.component";

export default function Home() {
	const router = useRouter();
	const heroTextsRef = useRef(null);
	const navItemsRef1 = useRef<HTMLAnchorElement>(null);
	const navItemsRef2 = useRef<HTMLAnchorElement>(null);
	const navItemsRef3 = useRef<HTMLAnchorElement>(null);
	const buttonRef = useRef<HTMLInputElement>(null);
	const gsap = useContext(gsapContext).gsap;
	const cursorRef = useContext(gsapContext).cursorRef;
	const isCursorStuck = useContext(gsapContext).isCursorStuck;
	const cursorAnims = useCursorAnim(cursorRef);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [isMainAlertVisible, setIsMainAlertVisible] = useState(true);

	useGSAP(() => {
		gsap.set([navItemsRef1.current, navItemsRef2.current, navItemsRef3.current], { x: "-101%", opacity: 0 });

		const typeSplit = SplitType.create(heroTextsRef.current!, {
			types: ["words"],
			tagName: "span",
		});

		const tl = gsap.timeline();
		tl.from(typeSplit.words, {
			y: "80%",
			opacity: 0,
			rotationZ: "6",
			duration: 0.4,
			ease: "Power.inOut",
			stagger: 0.15,
		});
		tl.to(
			[navItemsRef1.current, navItemsRef2.current, navItemsRef3.current],
			{
				opacity: 1,
				x: 0,
				duration: 1.5,
				stagger: 0.35,
				ease: "power.inOut",
			},
			"-=1"
		);
	});

	const submitContact = async (e: any) => {
		e.preventDefault();
		const response = await fetch("/api/contact", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, email, message }),
		});

		const data = await response.json();
		if (response.ok) {
			alert(data.message);
		} else {
			alert(data.error);
		}
	};

	const handleProjectClick = (name: string) => {
		cursorAnims.projectMouseLeave();
		router.push(`\\projects\\${name.toLowerCase()}`);
	};

	const handleMainAlertClose = () => {
		setIsMainAlertVisible(false);
	};

	return (
		<>
			<SideNav navRefs={[navItemsRef1, navItemsRef2, navItemsRef3]} mouseEnter={cursorAnims.linkMouseEnter} mouseLeave={cursorAnims.linkMouseLeave}></SideNav>
			<div className={styles.landing}>
				<nav>
					<h1>STron</h1>
				</nav>
				{isMainAlertVisible && (
					<MainAlert onClose={handleMainAlertClose}>
						<div>
							I&#39;m open to work.{" "}
							<a style={{ textDecoration: "underline", fontWeight: "bold" }} href="/Resume.pdf" target="_blank" download="sreenadh_cv">
								Download my CV
							</a>
						</div>
					</MainAlert>
				)}

				<div className={styles.hero}>
					<h1 className={styles.heroText} ref={heroTextsRef}>
						I am Sai Sreenadh.
						<br /> A Full-Stack <br /> Developer.
					</h1>
				</div>

				<div className={styles.scrollIndicator}>
					<DotLottieReact className={styles.scrollAnimation} src="https://lottie.host/e95aa212-67e4-4e38-8bc4-3e89157c4374/TNOAsPpHZO.json" backgroundColor="#FFFFFF00" speed={1} loop autoplay />
					<h5>Scroll Down</h5>
				</div>
			</div>
			<div className={styles.body}>
				<div className={styles.about} id="About">
					<div className={styles.mainSection}>
						<h1>About</h1>
						<p style={{ whiteSpace: "pre-line", lineHeight: "1.9rem" }}>{portfolioData.about}</p>
					</div>
					<div className={styles.bento}>
						{portfolioData.bento.map((bento, index) => {
							return (
								<div key={index} className={styles.section}>
									<h3>{bento}</h3>
								</div>
							);
						})}
					</div>
				</div>
				<div className={styles.bodyBlack}>
					<div className={styles.projects} id="Projects">
						<h1>Selected Projects</h1>
						{portfolioData.projects.map((project, index) => {
							return (
								<div key={index} className={styles.project} id="project">
									<div className={styles.left} onClick={() => handleProjectClick(project.title)} onMouseEnter={() => cursorAnims.projectMouseEnter(project.image)} onMouseLeave={() => cursorAnims.projectMouseLeave()}>
										<h2>
											<span>#{index + 1}</span> {project.title}
										</h2>
									</div>
									<div className={styles.right}>
										{project.link != "DNE" ? (
											<a href={project.link} target="_blank" onMouseEnter={() => cursorAnims.linkMouseEnter()} onMouseLeave={() => cursorAnims.linkMouseLeave()}>
												Visit <FaExternalLinkAlt />
											</a>
										) : (
											<a>In Progress</a>
										)}
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className={styles.bodyBlack}>
					<div className={styles.contact} id="Contact">
						<div className={styles.left}>
							<h1>Want to make a project together?</h1>
							<h3>Reach out to me.</h3>
							<div className={styles.icons}>
								<Link href={portfolioData.github} target="_blank">
									<FaGithub onMouseEnter={cursorAnims.linkMouseEnter} onMouseLeave={cursorAnims.linkMouseLeave} />
								</Link>
								<Link href={portfolioData.linkedin} target="_blank">
									<FaLinkedin onMouseEnter={cursorAnims.linkMouseEnter} onMouseLeave={cursorAnims.linkMouseLeave} />
								</Link>
							</div>
						</div>
						<div className={styles.right}>
							<div className={styles.smallInputs}>
								<input id="Name" type="text" required placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
								<input id="Email" type="text" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
							</div>
							<textarea className={styles.messageInput} id="Message" required placeholder="Message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
							<input id="btn-rect" type="button" value="Send" ref={buttonRef} onClick={(e) => submitContact(e)} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
