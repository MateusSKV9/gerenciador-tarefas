import styles from "./CategoryBadge.module.css";

type CategoryBadgeProps = {
	name?: string;
};

export function CategoryBadge({ name }: CategoryBadgeProps) {
	return <span className={styles.category}>{name}</span>;
}
