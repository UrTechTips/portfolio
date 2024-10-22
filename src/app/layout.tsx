"use client";
import Cursor from "@/components/cursor/cursor.component";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Inter } from "next/font/google";
import Head from "next/head";
import React, { RefObject, createContext, useRef, useState } from "react";
import "./globals.css";
import { gsapContext } from "./context";

const inter = Inter({ subsets: ["latin"] });

const assets = ["/next.svg", "/ScrollDownAnimation.json", "/vercel.svg"];

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const [isLoading, setIsLoading] = useState(true);
	const [isCursorStuck, setIsCursorStuck] = useState(false);
	const [loadedCount, setLoadedCount] = useState(0);
	const cursorRef = useRef<HTMLDivElement>(null);

	return (
		<gsapContext.Provider value={{ gsap: gsap, cursorRef: cursorRef, isCursorStuck: isCursorStuck, setIsCursorStuck: setIsCursorStuck }}>
			<html lang="en">
				<Head>
					<Head>
						<title>STron - Portfolio</title>
						<meta name="description" content="STron's Portfolio showcasing amazing projects and web development skills." />
						<meta name="keywords" content="portfolio, web developer, STron, projects, GSAP, animations, web design" />
						<meta property="og:title" content="STron - Portfolio" />
						<meta property="og:description" content="Check out STron's latest projects and web development work." />
						<meta property="og:image" content="/images/portfolio.png" />
						<meta property="og:url" content="https://portfolio-nine-nu-79.vercel.app/" />
						<meta name="twitter:card" content="summary_large_image" />
						<meta name="twitter:title" content="STron - Portfolio" />
						<meta name="twitter:description" content="STron's Portfolio showcasing amazing projects and web development skills." />
						<meta name="twitter:image" content="/images/portfolio.png" />
						<link rel="icon" href="icon.ico" type="image/ico" sizes="32x32" />
					</Head>
				</Head>
				<body className={inter.className}>
					<Cursor cursorRef={cursorRef} isCursorStuck={isCursorStuck} />
					<div>{children}</div>
				</body>
			</html>
		</gsapContext.Provider>
	);
}
