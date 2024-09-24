import { Dispatch, RefObject, SetStateAction, createContext } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface LayoutContextType {
	gsap: typeof gsap;
	cursorRef: RefObject<HTMLDivElement>;
	isCursorStuck: boolean;
	setIsCursorStuck: Dispatch<SetStateAction<boolean>>;
}

export const gsapContext = createContext<LayoutContextType>({ gsap: gsap, cursorRef: null as unknown as RefObject<HTMLDivElement>, isCursorStuck: false, setIsCursorStuck: null as unknown as Dispatch<SetStateAction<boolean>> });
