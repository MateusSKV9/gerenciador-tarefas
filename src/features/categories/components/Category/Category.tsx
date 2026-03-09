import styles from "./Category.module.css";

type CategoryProps = {
	name: string;
};

export function Category({ name }: CategoryProps) {
	return <li className={styles.category}>{name}</li>;
		<li className={styles.category}>
			<div className={styles.container_buttons}>
}
