import styles from "./Category.module.css";

type CategoryProps = {
	name: string;
};

export function Category({ name }: CategoryProps) {
	return <li className={styles.category}>{name}</li>;
}
