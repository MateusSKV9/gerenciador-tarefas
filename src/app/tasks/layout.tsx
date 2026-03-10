import React from "react";

type TasksLayoutProps = {
	children: React.ReactNode;
};

export default function TasksLayout({ children }: TasksLayoutProps) {
	return <section className="section__middle">{children}</section>;
}
