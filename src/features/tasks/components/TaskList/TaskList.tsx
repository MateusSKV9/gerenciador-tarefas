import styles from "./TaskList.module.css";
import { Task } from "../Task/Task";
import { TaskType } from "../../schemas/task-schema";

type TaskListProps = {
	tasks: TaskType[];
};

export function TaskList({ tasks }: TaskListProps) {
	return (
		<section className={styles.container}>
			<h1>Tarefas</h1>

			<h2>Minhas tarefas</h2>
			<ul className={styles.list}>
				{tasks.map((task) => (
					<Task key={task.id} id={task.id} name={task.title} />
				))}
			</ul>
		</section>
	);
}
