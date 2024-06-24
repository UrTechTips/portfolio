"use client";
import Cursor from "@/components/cursor/cursor.component";
import useLoadAssets from "@/hooks/useLoadAssets";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Inter } from "next/font/google";
import Head from "next/head";
import React, { RefObject, createContext, useRef, useState } from "react";
import "./globals.css";

interface LayoutContextType {
	gsap: typeof gsap;
	cursorRef: RefObject<HTMLDivElement>;
}

export const gsapContext = createContext<LayoutContextType>({ gsap: gsap, cursorRef: null as unknown as RefObject<HTMLDivElement> });
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

const inter = Inter({ subsets: ["latin"] });

const assets = ["/next.svg", "/ScrollDownAnimation.json", "/vercel.svg"];

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const [isLoading, setIsLoading] = useState(true);
	const cursorRef = useRef<HTMLDivElement>(null);

	const onAssetsLoaded = () => {
		console.log("Hello");
	};

	const loading = useLoadAssets({ isLoading, setIsLoading, assets, onAssetsLoaded });

	return (
		<html lang="en">
			<Head>
				<title>STron - Portfolio</title>
			</Head>
			<body className={inter.className}>
				<Cursor cursorRef={cursorRef} />
				<gsapContext.Provider value={{ gsap: gsap, cursorRef: cursorRef }}>
					<div>{children}</div>
				</gsapContext.Provider>
			</body>
		</html>
	);
}
