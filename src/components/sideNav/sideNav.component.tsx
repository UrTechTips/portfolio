import React, { FC, RefObject } from "react";
import styles from "./sideNav.module.scss";

interface SideNavProps {
	navRefs?: RefObject<HTMLAnchorElement>[];
	mouseEnter: () => void;
	mouseLeave: () => void;
}

const SideNav: FC<SideNavProps> = ({ navRefs, mouseEnter, mouseLeave }) => {
	return (
		<>
			<div className={styles.sideNav} style={{ overflowX: "hidden" }}>
				<a className={`${styles.navItems} ${styles.link}`} href="#About" ref={navRefs ? navRefs[0] : null} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
					About
				</a>
				<a className={`${styles.navItems} ${styles.link}`} href="#Projects" ref={navRefs ? navRefs[1] : null} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
					Projects
				</a>
				<a className={`${styles.navItems} ${styles.link}`} href="#Contact" ref={navRefs ? navRefs[2] : null} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
					Contact
				</a>
			</div>
		</>
	);
};

export default SideNav;
