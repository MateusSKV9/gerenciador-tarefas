"use client";

import styles from "./Task.module.css";
import { Button } from "@/components";
import { deleteTaskAction, updateTaskAction } from "../../api/api-task";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { CategoryBadge } from "@/features/categories/components/CategoryBadge/CategoryBadge";

type TaskProps = {
	id: string;
	name: string;
	completed: boolean;
	category?: string;
	onToggle: (id: string, nextValue: boolean) => void;
	onDelete: (id: string) => void;
};

export function Task({ id, name, completed, category, onToggle, onDelete }: TaskProps) {
	const [isPending, startTransition] = useTransition();
	const [actionType, setActionType] = useState<"updating" | "deleting" | null>(null);

	const handleToggleComplete = () => {
		setActionType("updating");
		const nextValue = !completed;

		startTransition(async () => {
			onToggle(id, nextValue);

			const result = await updateTaskAction(id, { completed: nextValue });

			if (!result.success) {
				toast.error(result.error);
			}
			setActionType(null);
		});
	};

	const handleDelete = () => {
		setActionType("deleting");

		startTransition(async () => {
			onDelete(id);

			const result = await deleteTaskAction(id);
			if (!result.success) {
				toast.error(result.error);
			}
		});
	};

	return (
		<li
			className={`${styles.task} ${completed && styles.completed} ${
				isPending && actionType === "deleting" && styles.pending
			}`}
		>
			<div className={styles.intro}>
				<input
					id={id}
					name={id}
					type="checkbox"
					title="Concluir"
					onChange={handleToggleComplete}
					checked={completed}
					disabled={isPending}
					className={styles.input}
				/>
				<div className={styles.wrapper}>
					<label className={`${styles.label} ${isPending && styles.completed}`} htmlFor={id}>
						{name}
					</label>
					{category && <CategoryBadge name={category} />}
				</div>
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
