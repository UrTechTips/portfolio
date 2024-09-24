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
					<title>STron - Portfolio</title>
				</Head>
				<body className={inter.className}>
					<Cursor cursorRef={cursorRef} isCursorStuck={isCursorStuck} />
					<div>{children}</div>
				</body>
			</html>
		</gsapContext.Provider>
	);
}
