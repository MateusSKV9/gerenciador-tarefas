"use client";

import { Button } from "@/components";
import styles from "./Task.module.css";
import { deleteTaskAction, updateTaskAction } from "../../api/api-task";
import { useState, useTransition } from "react";
import Link from "next/link";

type TaskProps = {
	id: string;
	name: string;
	completed: boolean;
};

export function Task({ id, name, completed }: TaskProps) {
	const [isPending, startTransition] = useTransition();
	const [actionType, setActionType] = useState<"upadating" | "deleting" | null>(null);

	return (
		<li className={styles.task}>
			<div className={styles.intro}>
				<input
					onChange={() => {
						setActionType("upadating");
						startTransition(async () => {
							await updateTaskAction(id, { completed: !completed });
							setActionType(null);
						});
					}}
					className={styles.input}
					type="checkbox"
					name={id}
					id={id}
					title="Concluir"
					checked={completed}
					disabled={isPending}
				/>

				<label htmlFor={id}>{name}</label>
			</div>

			<div className={styles.container_buttons}>
				<Link href={`/tasks/edit/${id}`}>
					<Button variant="default">{isPending && actionType === "upadating" ? "Editando" : "Editar"}</Button>
				</Link>

				<Button
					disabled={isPending}
					onClick={() => {
						setActionType("deleting");
						startTransition(async () => {
							await deleteTaskAction(id);
							setActionType(null);
						});
					}}
					variant="danger"
				>
					{isPending && actionType === "deleting" ? "Deletando" : "Deletar"}
				</Button>
			</div>
		</li>
	);
}
