"use client";
import React, { useContext } from 'react'
import styles from "./backLink.module.scss";
import { gsapContext } from '@/app/context';
import useCursorAnimations from '@/hooks/useCursorAnimations';
import { IoMdArrowRoundBack } from "react-icons/io";


const Back = () => {
    const { cursorRef } = useContext(gsapContext);
	const cursorAnims = useCursorAnimations(cursorRef);

    const handleBackClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        history.back();
    }
    
    return (
        <div className={styles.navbar}>
            <a href="#" onClick={handleBackClick} aria-label="Go back to homepage" onMouseEnter={cursorAnims.linkMouseEnter} onMouseLeave={cursorAnims.linkMouseLeave}>
                <IoMdArrowRoundBack className={styles.icon} />
                <h1>Back</h1>
            </a>
        </div>
    )
}

export default Back