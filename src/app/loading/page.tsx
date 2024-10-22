"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./loading.module.scss";

const Loading: React.FC = () => {
	const text1Ref = useRef<HTMLSpanElement>(null);
	const text2Ref = useRef<HTMLSpanElement>(null);
	const texts = ["Loading", "Please", "Wait."];
	const morphTime = 1;
	const cooldownTime = 0.25;
	let morph = 0;

	let textIndex = 0;
	let cooldown = cooldownTime;
	let time = new Date();

	function doMorph() {
		morph -= cooldown;
		cooldown = 0;

		let fraction = morph / morphTime;

		if (fraction > 1) {
			cooldown = cooldownTime;
			fraction = 1;
		}

		setMorphStyles(fraction);
	}

	function setMorphStyles(fraction: number) {
		if (text1Ref.current && text2Ref.current) {
			const adjustedFraction = Math.max(fraction, 0); // Prevent negative fraction

			text2Ref.current.style.filter = `blur(${Math.min(8 / adjustedFraction - 8, 100)}px)`;
			text2Ref.current.style.opacity = `${Math.pow(adjustedFraction, 0.4) * 100}%`;

			const inverseFraction = 1 - adjustedFraction;
			text1Ref.current.style.filter = `blur(${Math.min(8 / inverseFraction - 8, 100)}px)`;
			text1Ref.current.style.opacity = `${Math.pow(inverseFraction, 0.4) * 100}%`;

			text1Ref.current.textContent = texts[textIndex % texts.length];
			text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
		}
	}

	function doCooldown() {
		morph = 0;
		if (text1Ref.current && text2Ref.current) {
			text2Ref.current.style.filter = "";
			text2Ref.current.style.opacity = "100%";
			text1Ref.current.style.filter = "";
			text1Ref.current.style.opacity = "0%";
		}
	}

	const animate = () => {
		requestAnimationFrame(animate);

		const newTime = new Date();
		let shouldIncrementIndex = cooldown > 0;
		const dt = (newTime.getTime() - time.getTime()) / 1000;
		time = newTime;

		cooldown -= dt;

		if (cooldown <= 0) {
			if (shouldIncrementIndex) {
				textIndex++;
			}
			doMorph();
		} else {
			doCooldown();
		}
	};

	useEffect(() => {
		if (text1Ref.current && text2Ref.current) {
			text1Ref.current.textContent = texts[textIndex % texts.length];
			text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
		}

		animate();

		return () => {
			cooldown = 0;
		};
	}, []);

	return (
		<div id="loading" className={styles.loading}>
			<div id="container" className={styles.container}>
				<span ref={text1Ref} className={styles.text1}></span>
				<span ref={text2Ref} className={styles.text2}></span>
			</div>
			<svg id="filters">
				<defs>
					<filter id="threshold">
						<feColorMatrix
							in="SourceGraphic"
							type="matrix"
							values="1 0 0 0 0
                                    0 1 0 0 0
                                    0 0 1 0 0
                                    0 0 0 255 -140"
						/>
					</filter>
				</defs>
			</svg>
		</div>
	);
};

export default Loading;
