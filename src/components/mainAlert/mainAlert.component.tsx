import React, { FC, ReactElement } from "react";
import styles from "./mainAlert.module.scss";
import { VscChromeClose } from "react-icons/vsc";

interface MainAlertType {
	children: ReactElement;
	onClose: () => void;
}

const MainAlert: FC<MainAlertType> = ({ children, onClose }) => {
	const handleClose = () => {
		onClose();
	};
	return (
		<>
			<div className={styles.container}>
				<div className={styles.left}>{children}</div>
				<div className={styles.right} onClick={handleClose}>
					X
				</div>
			</div>
		</>
	);
};

export default MainAlert;
