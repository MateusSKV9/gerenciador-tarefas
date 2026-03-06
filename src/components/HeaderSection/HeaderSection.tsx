import styles from "./HeaderSection.module.css";
import React from "react";

type HeaderSectionProps = {
	title: string;
	children: React.ReactNode;
};

export function HeaderSection({ title, children }: HeaderSectionProps) {
	return (
		<div className={styles.wrapper}>
			<h1 className="text-3xl font-bold">{title}</h1>
			<div>{children}</div>
		</div>
	);
}
