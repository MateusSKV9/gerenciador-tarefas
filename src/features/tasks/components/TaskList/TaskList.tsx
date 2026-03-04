import styles from "./TaskList.module.css";
import { Task } from "../Task/Task";

export function TaskList() {
	return (
		<section className={styles.container}>
			<h1>Tarefas</h1>

			<h2>Minhas tarefas</h2>
			<article>
				<Task key="1" id="1" />
			</article>
		</section>
	);
}
