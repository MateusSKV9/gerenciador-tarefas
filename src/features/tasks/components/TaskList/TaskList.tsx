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
	const sortedTasks = [...tasks].sort((a, b) => Number(a.completed) - Number(b.completed));

	return (
		<section className={styles.container}>
			<HeaderSection title="Tarefas">
				<Link href="/tasks/new/">
					<Button variant="default">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<circle cx="12" cy="12" r="10" />
							<path d="M8 12h8" />
							<path d="M12 8v8" />
						</svg>
						Adicionar
					</Button>
				</Link>
			</HeaderSection>

			<h2>Lista</h2>
			<ul className={styles.list}>
				{sortedTasks.map((task) => (
					<Task key={task.id} id={task.id} completed={task.completed} name={task.title} />
				))}
			</ul>
		</section>
	);
}
