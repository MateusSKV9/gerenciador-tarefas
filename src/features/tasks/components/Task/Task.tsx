import styles from "./Task.module.css";
import Link from "next/link";

type TaskProps = {
	id: string;
};

export function Task({ id }: TaskProps) {
	return (
		<article className={styles.task}>
			<Link href={`/tasks/${id}`}>
				<h3>Tarefa - {id}</h3>
			</Link>
		</article>
	);
}
