"use client";
import SideNav from "@/components/sideNav/sideNav.component";
import React, { RefObject, useCallback, useContext, useEffect, useRef, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import styles from "../project.module.scss";
import { gsapContext } from "@/app/context";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useCursorAnimations from "@/hooks/useCursorAnimations";

const TicTacToe = () => {
	const { cursorRef, gsap } = useContext(gsapContext);
	const cursorAnims = useCursorAnimations(cursorRef);

	const descriptionRef = useRef<HTMLDivElement>(null);
	const problemRef = useRef<HTMLDivElement>(null);
	const approachRef = useRef<HTMLDivElement>(null);
	const technologiesRef = useRef<HTMLDivElement>(null);
	const challengesRef = useRef<HTMLDivElement>(null);
	const outcomesRef = useRef<HTMLDivElement>(null);
	const futureRef = useRef<HTMLDivElement>(null);
	const keyImpactsRef = useRef<HTMLDivElement>(null);
	const backgroundRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (gsap && ScrollTrigger) {
			gsap.registerPlugin(ScrollTrigger);
			const sections = [descriptionRef, problemRef, approachRef, technologiesRef, challengesRef, outcomesRef, futureRef, keyImpactsRef];

			sections.forEach((section) => {
				if (section.current) {
					gsap.to(section.current, {
						ease: "none",
						scrollTrigger: {
							scroller: backgroundRef.current,
							trigger: section.current,
							start: "top 10%",
							end: "bottom top",
							onEnter: () => setActiveClass(sections.indexOf(section), sections),
							onLeave: () => removeActiveClass(sections.indexOf(section)),
							onEnterBack: () => setActiveClass(sections.indexOf(section), sections),
							onLeaveBack: () => removeActiveClass(sections.indexOf(section)),
						},
					});
				}
			});

			return () => {
				ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
			};
		}
	}, [gsap]);

	const setActiveClass = useCallback((id: number, sections: React.RefObject<HTMLDivElement>[]) => {
		document.querySelector(`#nav${id + 1}`)?.classList.add(styles.navigationActive);
		sections.forEach((_, idx) => {
			if (idx !== id + 1) document.querySelector(`#nav${idx}`)?.classList.remove(styles.navigationActive);
		});
	}, []);

	const removeActiveClass = useCallback((id: number) => {
		document.querySelector(`#nav${id + 1}`)?.classList.remove(styles.navigationActive);
	}, []);

	const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
		if (ref.current) {
			ref.current.scrollIntoView({ behavior: "smooth" });
		}
	};
	const handleScrollToSection = useCallback((ref: React.RefObject<HTMLDivElement>) => {
		return () => scrollToSection(ref);
	}, []);

	return (
		<div className={styles.blackBG} ref={backgroundRef}>
			<SideNav mouseEnter={cursorAnims.linkMouseEnter} mouseLeave={cursorAnims.linkMouseLeave} />
			<div className={styles.navbar}>
				<a href="/" aria-label="Go back to homepage" onMouseEnter={cursorAnims.linkMouseEnter} onMouseLeave={cursorAnims.linkMouseLeave}>
					<IoMdArrowRoundBack className={styles.icon} />
					<h1>Back</h1>
				</a>
			</div>
			<div className={styles.body}>
				<div className={styles.navigation}>
					<h2 id="nav1" onClick={handleScrollToSection(descriptionRef)}>
						Description
					</h2>
					<h2 id="nav2" onClick={handleScrollToSection(problemRef)}>
						Problem
					</h2>
					<h2 id="nav3" onClick={handleScrollToSection(approachRef)}>
						Approach
					</h2>
					<h2 id="nav4" onClick={handleScrollToSection(technologiesRef)}>
						Technologies And Tools
					</h2>
					<h2 id="nav5" onClick={handleScrollToSection(challengesRef)}>
						Challenges and Solutions
					</h2>
					<h2 id="nav6" onClick={handleScrollToSection(outcomesRef)}>
						Outcome and Impacts
					</h2>
					<h2 id="nav7" onClick={handleScrollToSection(futureRef)}>
						Future Improvements
					</h2>
					<h2 id="nav8" onClick={handleScrollToSection(keyImpactsRef)}>
						Key Takeaways
					</h2>
				</div>
				<div className={styles.main}>
					<div className={styles.header}>
						<h1 className={styles.projectName} ref={descriptionRef}>
							TicTacToe
						</h1>
						<h4 onMouseEnter={cursorAnims.linkMouseEnter} onMouseLeave={cursorAnims.linkMouseLeave}>
							<a href="https://tictactoe-web-phi.vercel.app/" target="_blank">
								Try Now
							</a>
						</h4>
					</div>
					<p className={styles.description}>
						The <span id="span-highlight">&#39;TicTacToe Web&#39;</span> project is an interactive game where you can challenge your friends or an AI opponent to a classic match of TicTacToe. Built with Next.js, SCSS, and a touch of Node.js, this project combines modern design with seamless functionality. I implemented AI algorithms to create a challenging and dynamic gameplay experience, making each match unpredictable and exciting. The responsive design ensures the game looks and plays great on any device. This project not only boosts user engagement but also showcases how AI can be effectively integrated into simple web games.
					</p>
					<div className={styles.section} ref={problemRef}>
						<h2 className={styles.sectionHead}>Problem</h2>

						<div className={styles.sectionDesc}>
							<p className={styles.sectionLine}>The goal was to create an interactive and engaging TicTacToe game that users could enjoy during their free time, providing both single-player and multiplayer experiences. I wanted the game accessible across multiple devices, ensuring a seamless experience whether the users are on their desktop, tablet, or phone.</p>
							<p className={styles.sectionLine}>Additionally, I aimed to showcase the capabilities of Artificial Intelligence in a simple, fun context. By integrating AI into the game, I wanted to create a challenging opponent for solo players, where the AI could adapt and make the game more interesting rather than predictable. The AI would offer different difficulty levels to keep users engaged, highlighting how even a basic game can leverage AI to enhance the overall gameplay experience.</p>
						</div>
					</div>
					<div className={styles.section} ref={approachRef}>
						<h2 className={styles.sectionHead}>Approach</h2>

						<div className={styles.sectionDesc}>
							<p className={styles.sectionLine}>To achieve this goal, I chose the Next.js framework, built on top of React.js, to power the frontend, offering a modern, efficient, and scalable user interface. For handling the AI and backend logic, I used Node.js. We experimented with various user interface designs and colour schemes before finalizing a dark blue and yellow theme, which creates a visually appealing contrast and enhances the gaming experience.</p>
							<p className={styles.sectionLine}>A key focus during development was ensuring that the game was fully responsive, providing a seamless experience across all devices, including desktops, tablets, and smartphones. By utilizing responsive design principles and SCSS, I ensured that the game adapts to different screen sizes and orientations without sacrificing usability or visual appeal.</p>
							<p className={styles.sectionLine}>To enable multiplayer functionality, I integrated Firebase for real-time capabilities. Firestore is used to store ongoing games, while Firebase Authentication ensures secure user logins, safeguarding the platform from potential attacks or misuse by malicious sources.</p>
							<p className={styles.sectionLine}>For the Artificial Intelligence aspect, I implemented the Minimax algorithm, a well-suited approach for turn-based games like TicTacToe. However, to further optimize the AI&#39;s performance, I incorporated alpha-beta pruning, which reduces the search space and improves the algorithm&#39;s efficiency. While this introduces a slight trade-off in move accuracy, the accuracy remains more than adequate for a casual game like TicTacToe, ensuring the AI still provides a competitive and enjoyable challenge without compromising game speed.</p>
						</div>
					</div>
					<div className={styles.section} ref={technologiesRef}>
						<h2 className={styles.sectionHead}>Technologies And Tools</h2>

						<div className={styles.sectionDesc}>
							<div className={styles.keyVal}>
								<h3>Frontend:</h3>
								<h4>Next.js (built on React.js), SCSS</h4>
							</div>
							<div className={styles.keyVal}>
								<h3>Backend:</h3>
								<h4>Node.js</h4>
							</div>
							<div className={styles.keyVal}>
								<h3>Real-Time Database & Authentication:</h3>
								<h4>Firebase Firestore and Firebase Authentication</h4>
							</div>
							<div className={styles.keyVal}>
								<h3>Artificial Intelligence:</h3>
								<h4>Minimax algorithm with alpha-beta pruning</h4>
							</div>
						</div>
					</div>
					<div className={styles.section} ref={challengesRef}>
						<h2 className={styles.sectionHead}>Challenges and Solutions</h2>

						<div className={styles.sectionDesc}>
							<p className={styles.sectionLine}>One of the main challenges was balancing AI complexity with performance. While the Minimax algorithm is effective for small, turn-based games, it can become inefficient as the game progresses and the decision tree grows. To address this, I integrated alpha-beta pruning, which significantly reduced the search space, improving both speed and resource efficiency.</p>
							<p className={styles.sectionLine}>Another challenge was ensuring a smooth multiplayer experience with real-time updates and secure logins. Using Firebase allowed me to handle real-time interactions effortlessly, and Firestore ensured that game data remained synchronized across devices without lag. Firebase Authentication provided a robust layer of security, helping prevent unauthorized access.</p>
						</div>
					</div>
					<div className={styles.section} ref={outcomesRef}>
						<h2 className={styles.sectionHead}>Outcome and Impact</h2>

						<div className={styles.sectionDesc}>
							<p className={styles.sectionLine}>The result is a highly interactive and engaging TicTacToe game that works flawlessly across all devices. The integration of AI with varying difficulty levels creates a challenging single-player mode, while the multiplayer option adds a social component. The project highlights how modern web technologies can be used to create responsive, feature-rich web games.</p>
							<p className={styles.sectionLine}>Users have reported that the AI is challenging yet fun, while the responsive design allows them to play anytime, anywhere. The overall feedback suggests the game successfully balances ease of play with a competitive edge, leading to increased user engagement.</p>
						</div>
					</div>
					<div className={styles.section} ref={futureRef}>
						<h2 className={styles.sectionHead}>Future Improvements</h2>

						<div className={styles.sectionDesc}>
							<p className={styles.sectionLine}>To further enhance the gameplay experience, I plan to implement an AI that adjusts its difficulty based on the player&#39;s skill level. This would involve creating a more dynamic AI that learns from the player&#39;s moves and adapts, providing an evolving challenge as the player improves.</p>
							<p className={styles.sectionLine}>Other potential improvements include:</p>
							<li className={styles.sectionPoint}>Online leaderboards to encourage competition.</li>
							<li className={styles.sectionPoint}>More game themes to provide visual variety.</li>
							<li className={styles.sectionPoint}>Player statistics tracking, such as win/loss records and AI difficulty preferences.</li>
						</div>
					</div>
					<div className={styles.section} ref={keyImpactsRef}>
						<h2 className={styles.sectionHead}>Key Takeaways</h2>

						<div className={styles.sectionDesc}>
							<p className={styles.sectionLine}>This project allowed me to explore the integration of AI in web games, improving my skills in algorithm optimization through alpha-beta pruning. I also gained hands-on experience with Next.js, Firebase, and responsive design principles, enhancing both my frontend and backend development capabilities.</p>
							<p className={styles.sectionLine}>The biggest takeaway was the importance of balancing user experience with technical complexity, ensuring that AI-driven gameplay remains challenging without overwhelming system resources. The project underscored the value of clean, maintainable code that is scalable and adaptable for future enhancements.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TicTacToe;
