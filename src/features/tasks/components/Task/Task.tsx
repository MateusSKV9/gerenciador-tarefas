"use client";

import { Button } from "@/components";
import styles from "./Task.module.css";
import { deleteTaskAction, updateTaskAction } from "../../api/api-task";
import { useState, useTransition, useOptimistic } from "react";
import Link from "next/link";
import { toast } from "sonner";

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

	const handleToggle = () => {
		setActionType("updating");
		const nextValue = !optimisticCompleted;

		startTransition(async () => {
			setOptimisticCompleted(nextValue);
			const result = await updateTaskAction(id, { completed: nextValue });

			if (!result.success) {
				toast.error(result.error);
			}

			setActionType(null);
		});
	};

	return (
		<li className={`${styles.task} ${isPending ? styles.pending : ""}`}>
			<div className={styles.intro}>
				<input
					onChange={handleToggle}
					className={styles.input}
					type="checkbox"
					name={id}
					id={id}
					title="Concluir"
					checked={optimisticCompleted}
					disabled={isPending}
				/>

				<label className={`${styles.label} ${optimisticCompleted && styles.completed}`} htmlFor={id}>
					{name}
				</label>
			</div>

			<div className={styles.container_buttons}>
				<Link href={`/tasks/edit/${id}`}>
					<Button variant="default">{isPending && actionType === "updating" ? "Salvando..." : "Editar"}</Button>
				</Link>

				<Button
					disabled={isPending}
					onClick={() => {
						setActionType("deleting");
						startTransition(async () => {
							await deleteTaskAction(id);
							// Não precisamos resetar actionType aqui pois o componente será removido do DOM
						});
					}}
					variant="danger"
				>
					{isPending && actionType === "deleting" ? "Deletando..." : "Deletar"}
				</Button>
			</div>
		</li>
	);
}
