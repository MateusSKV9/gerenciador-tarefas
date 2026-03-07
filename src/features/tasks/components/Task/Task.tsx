"use client";

import styles from "./Task.module.css";
import { Button } from "@/components";
import { deleteTaskAction, updateTaskAction } from "../../api/api-task";
import { useState, useTransition, useOptimistic } from "react";
import { toast } from "sonner";
import Link from "next/link";

type TaskProps = {
	id: string;
	name: string;
	completed: boolean;
};

export function Task({ id, name, completed }: TaskProps) {
	const [isPending, startTransition] = useTransition();
	const [actionType, setActionType] = useState<"updating" | "deleting" | null>(null);

	const [optimisticCompleted, setOptimisticCompleted] = useOptimistic(
		completed,
		(state, newValue: boolean) => newValue
	);

	const handleToggleComplete = () => {
		setActionType("updating");
		const nextValue = !optimisticCompleted;

		startTransition(async () => {
			setOptimisticCompleted(nextValue);
			const result = await updateTaskAction(id, { completed: nextValue });

			if (!result.success) toast.error(result.error);
			setActionType(null);
		});
	};

	const handleDelete = () => {
		setActionType("deleting");

		startTransition(async () => {
			const result = await deleteTaskAction(id);
			if (!result.success) toast.error(result.error);
		});
	};

	return (
		<li className={`${styles.task} ${isPending ? styles.pending : ""}`}>
			<div className={styles.intro}>
				<input
					id={id}
					name={id}
					type="checkbox"
					title="Concluir"
					onChange={handleToggleComplete}
					checked={optimisticCompleted}
					disabled={isPending}
					className={styles.input}
				/>

				<label className={`${styles.label} ${optimisticCompleted && styles.completed}`} htmlFor={id}>
					{name}
				</label>
			</div>

			<div className={styles.container_buttons}>
				<Link href={`/tasks/edit/${id}`}>
					<Button variant="default" disabled={isPending}>
						{isPending && actionType === "updating" ? "Salvando..." : "Editar"}
					</Button>
				</Link>

				<Button disabled={isPending} onClick={handleDelete} variant="danger">
					{isPending && actionType === "deleting" ? "Deletando..." : "Deletar"}
				</Button>
			</div>
		</li>
	);
}
