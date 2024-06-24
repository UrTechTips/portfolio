import React from "react";

const linkMouseEnter = () => {
	if (cursor) {
		cursor.style.width = "5rem";
		cursor.style.height = "5rem";
	}
};

const linkMouseLeave = () => {
	if (cursor) {
		cursor.style.width = "1.5rem";
		cursor.style.height = "1.5rem";
	}
};

const projectMouseEnter = (image: String) => {
	if (cursorRef.current) {
		cursorRef.current.style.borderRadius = "5px";
		cursorRef.current.style.border = "1px solid #fff";
		cursorRef.current.style.width = "20rem";
		cursorRef.current.style.height = `${(20 * 9) / 16}rem`;
		cursorRef.current.style.mixBlendMode = "normal";
		cursorRef.current.style.backgroundImage = `url(${image})`;
	}
};

const projectMouseLeave = () => {
	if (cursorRef.current) {
		cursorRef.current.style.borderRadius = "50%";
		cursorRef.current.style.border = "none";
		cursorRef.current.style.width = "1.5rem";
		cursorRef.current.style.height = "1.5rem";
		cursorRef.current.style.mixBlendMode = "difference";
		cursorRef.current.style.backgroundImage = `none`;
	}
};
