import styles from "./HeaderSection.module.css";
import React from "react";

type HeaderSectionProps = {
	title: string;
	children: React.ReactNode;
};

export function HeaderSection({ title, children }: HeaderSectionProps) {
	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>{title}</h1>
			<div>{children}</div>
		</div>
	);
}
