"use client";

import styles from "./TaskList.module.css";
import { Task } from "../Task/Task";
import { TaskType } from "../../schemas/task-schema";
import { HeaderSection } from "@/components/HeaderSection/HeaderSection";
import { Button } from "@/components";
import Link from "next/link";
import { CategoryType } from "@/features/categories/schemas/category-schema";
import { useOptimistic } from "react";
import { useRouter } from "next/navigation";
import { TaskChart } from "../TaskChart/TaskChart";

type TaskListProps = {
	tasks: TaskType[];
	categories: CategoryType[];
};

type optimisticAction = { type: "UPDATE"; id: string; completed: boolean } | { type: "DELETE"; id: string };

export function TaskList({ tasks, categories }: TaskListProps) {
	const router = useRouter();
	const [optimisticTasks, dispatch] = useOptimistic(tasks, (state, action: optimisticAction) => {
		switch (action.type) {
			case "UPDATE":
				return state.map((t) => (t.id === action.id ? { ...t, completed: action.completed } : t));

			case "DELETE":
				return state.filter((t) => t.id !== action.id);

			default:
				return state;
		}
	});

	const tasksPending = optimisticTasks.filter((t) => !t.completed);
	const tasksCompleted = optimisticTasks.filter((t) => t.completed);

	const handleOnToggle = (id: string, next: boolean) => {
		dispatch({ type: "UPDATE", id, completed: next });
		router.refresh();
	};

	const renderTask = (task: TaskType) => {
		const category = categories.find((cat) => cat.id === task.category_id);
		return (
			<Task
				name={task.title}
				key={task.id}
				completed={task.completed}
				id={task.id}
				category={category?.name}
				onToggle={handleOnToggle}
				onDelete={(id) => dispatch({ type: "DELETE", id })}
			/>
		);
	};

	return (
		<section className={styles.container}>
			<HeaderSection title="Tarefas">
				<Link href="/tasks/new">
					<Button variant="default" icon="add">
						Adicionar
					</Button>
				</Link>
			</HeaderSection>

			<TaskChart pendingCount={tasksPending.length} completedCount={tasksCompleted.length} />

			<div className={styles.container_list}>
				<h3>Pendentes ({tasksPending.length})</h3>
				<ul className={styles.list}>{tasksPending.map(renderTask)}</ul>
			</div>

			<div className={styles.container_list}>
				<h3>Concluídas</h3>
				<ul className={styles.list}>{tasksCompleted.map(renderTask)}</ul>
			</div>
		</section>
	);
}
