"use client";

import styles from "./TaskForm.module.css";
import { Input } from "@/components/Input/Input";
import { useForm } from "react-hook-form";
import { createTaskAction, updateTaskAction } from "../../api/api-task";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskFormData, TaskSchema, TaskType } from "../../schemas/task-schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components";

type TaskFormProps = {
	task?: TaskType;
};

export function TaskForm({ task }: TaskFormProps) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<TaskFormData>({ resolver: zodResolver(TaskSchema), defaultValues: { title: task?.title || "" } });

	const onSubmit = (data: TaskFormData) => {
		startTransition(async () => {
			const result = task ? await updateTaskAction(task.id, data) : await createTaskAction(data);

			if (result.success) {
				router.push("/");
				toast.success(`Tarefa ${task ? "atualizada" : "criada"} com sucesso!`);
			} else {
				toast.error(result.error);
			}
		});
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<Input
				id="title"
				type="text"
				placeholder="Digite o título da tarefa"
				error={errors.title?.message}
				text="Nome"
				{...register("title")}
			/>
			<Button variant="default" type="submit" disabled={isPending}>
				{isPending ? "Salvando..." : "Salvar"}{" "}
			</Button>
		</form>
	);
}
