"use client";
import Cursor from "@/components/cursor/cursor.component";
import gsap from "gsap";
import { Inter } from "next/font/google";
import Head from "next/head";
import React, { useRef, useState } from "react";
import { gsapContext } from "./context";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Loading from "@/components/loading/loading.component";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const assets = ["/next.svg", "/ScrollDownAnimation.json", "/vercel.svg"];

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const [isCursorStuck, setIsCursorStuck] = useState(false);
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
					<div>
						{children}
						<Analytics />
					</div>
				</body>
			</html>
		</gsapContext.Provider>
	);
}
