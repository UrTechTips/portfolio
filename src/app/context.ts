import { RefObject, createContext } from "react";
import { gsap } from "gsap";

interface LayoutContextType {
	gsap: typeof gsap;
	cursorRef: RefObject<HTMLDivElement>;
}
export const gsapContext = createContext<LayoutContextType>({ gsap: gsap, cursorRef: null as unknown as RefObject<HTMLDivElement> });
