"use client";
import { useGSAP } from "@gsap/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useContext, useEffect, useRef, useState } from "react";
import SplitType from "split-type";
import { gsapContext } from "./layout";
import styles from "./page.module.scss";
import { FaExternalLinkAlt } from "react-icons/fa";
import SideNav from "@/components/sideNav/sideNav.component";
import portfolioData from "../../public/portfolio.json";
import emailjs from "@emailjs/browser";

export default function Home() {
	const heroTextsRef = useRef(null);
	const navItemsRef1 = useRef<HTMLAnchorElement>(null);
	const navItemsRef2 = useRef<HTMLAnchorElement>(null);
	const navItemsRef3 = useRef<HTMLAnchorElement>(null);
	const gsap = useContext(gsapContext).gsap;
	const cursorRef = useContext(gsapContext).cursorRef;

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

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

	const cursor = cursorRef.current;
	const linkMouseEnter = () => {
		if (cursor) {
			cursor.style.width = "5rem";
			cursor.style.height = "5rem";
		}
	};

	const linkMouseLeave = () => {
		if (cursor) {
			cursor.style.width = "1.5rem";
			cursor.style.height = "1.5rem";
		}
	};

	const projectMouseEnter = (image: String) => {
		if (cursorRef.current) {
			cursorRef.current.style.borderRadius = "5px";
			cursorRef.current.style.border = "1px solid #fff";
			cursorRef.current.style.width = "20rem";
			cursorRef.current.style.height = `${(20 * 9) / 16}rem`;
			cursorRef.current.style.mixBlendMode = "normal";
			cursorRef.current.style.backgroundImage = `url(${image})`;
		}
	};

	const projectMouseLeave = () => {
		if (cursorRef.current) {
			cursorRef.current.style.borderRadius = "50%";
			cursorRef.current.style.border = "none";
			cursorRef.current.style.width = "1.5rem";
			cursorRef.current.style.height = "1.5rem";
			cursorRef.current.style.mixBlendMode = "difference";
			cursorRef.current.style.backgroundImage = `none`;
		}
	};

	const submitContact = (e: any) => {
		e.preventDefault();
		// alert(`${name}, ${email}m ${message}`);
		emailjs
			.send(process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID!, process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID!, { from_name: name, message: message, from_email: email }, process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY)
			.then((res) => {
				console.log(res);
			})
			.catch((err: string) => {
				console.log(err);
			});
	};

	return (
		<>
			<SideNav navRefs={[navItemsRef1, navItemsRef2, navItemsRef3]} mouseEnter={linkMouseEnter} mouseLeave={linkMouseLeave}></SideNav>
			<div className={styles.landing}>
				<nav>
					<h1>STron</h1>
				</nav>
				<div className={styles.hero}>
					<h1 className={styles.heroText} ref={heroTextsRef}>
						I am Sai Sreenadh. A Full-Stack Developer.
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
						<p style={{ whiteSpace: "pre-line" }}>{portfolioData.about}</p>
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
									<div className={styles.left} onMouseEnter={() => projectMouseEnter(project.Image)} onMouseLeave={() => projectMouseLeave()}>
										<h2>
											<span>#{index + 1}</span> {project.title}
										</h2>
									</div>
									<div className={styles.right} onMouseEnter={() => linkMouseEnter()} onMouseLeave={() => linkMouseLeave()}>
										<a href="#">
											Visit <FaExternalLinkAlt />
										</a>
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
							<h3>Rech out to me.</h3>
						</div>
						<div className={styles.right}>
							<div className={styles.smallInputs}>
								<input id="Name" type="text" required placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
								<input id="Email" type="text" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
							</div>
							<textarea className={styles.messageInput} id="Message" required placeholder="Message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
							<input type="button" value="Send" onClick={(e) => submitContact(e)} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
