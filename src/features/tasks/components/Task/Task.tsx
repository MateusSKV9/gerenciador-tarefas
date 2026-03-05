import styles from "./Task.module.css";
import Link from "next/link";

type TaskProps = {
	id: string;
	name: string;
};

export function Task({ id, name }: TaskProps) {
	return (
		<li className={styles.task}>
			<Link href={`/tasks/${id}`}>
				<h3>Tarefa - {name}</h3>
			</Link>
		</li>
	);
}
