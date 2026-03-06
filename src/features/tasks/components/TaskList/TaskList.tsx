import styles from "./TaskList.module.css";
import { Task } from "../Task/Task";
import { TaskType } from "../../schemas/task-schema";
import { HeaderSection } from "@/components/HeaderSection/HeaderSection";
import { Button } from "@/components";
import Link from "next/link";

type TaskListProps = {
	tasks: TaskType[];
};

export function TaskList({ tasks }: TaskListProps) {
	return (
		<section className={styles.container}>
			<HeaderSection title="Tarefas">
				<Link href="/tasks/new/">
					<Button variant="default">Adicionar</Button>
				</Link>
			</HeaderSection>

			<h2>Lista</h2>
			<ul className={styles.list}>
				{tasks.map((task) => (
					<Task key={task.id} id={task.id} completed={task.completed} name={task.title} />
				))}
			</ul>
		</section>
	);
}
