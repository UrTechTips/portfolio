import React, { FC, RefObject } from "react";
import styles from "./sideNav.module.scss";

interface SideNavProps {
	navRefs: RefObject<HTMLAnchorElement>[];
	mouseEnter: () => void;
	mouseLeave: () => void;
}

const SideNav: FC<SideNavProps> = ({ navRefs, mouseEnter, mouseLeave }) => {
	return (
		<>
			<div className={styles.sideNav} style={{ overflowX: "hidden" }}>
				<a className={`${styles.navItems} ${styles.link}`} href="#About" ref={navRefs[0]} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
					About
				</a>
				<a className={`${styles.navItems} ${styles.link}`} href="#Projects" ref={navRefs[1]} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
					Projects
				</a>
				<a className={`${styles.navItems} ${styles.link}`} href="#Contact" ref={navRefs[2]} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
					Contact
				</a>
			</div>
		</>
	);
};

export default SideNav;
