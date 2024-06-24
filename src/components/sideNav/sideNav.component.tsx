import React, { FC, RefObject } from "react";
import styles from "./sideNav.module.scss";

interface SideNavProps {
	navRefs: RefObject<HTMLAnchorElement>[];
}

const SideNav: FC<SideNavProps> = ({ navRefs }) => {
	return (
		<>
			<div className={styles.sideNav} style={{ overflowX: "hidden" }}>
				<a className={`${styles.navItems} ${styles.link}`} href="#About" ref={navRefs[0]}>
					About
				</a>
				<a className={`${styles.navItems} ${styles.link}`} href="#Portfolio" ref={navRefs[1]}>
					Projects
				</a>
				<a className={`${styles.navItems} ${styles.link}`} href="#Contact" ref={navRefs[2]}>
					Contact
				</a>
			</div>
		</>
	);
};

export default SideNav;
