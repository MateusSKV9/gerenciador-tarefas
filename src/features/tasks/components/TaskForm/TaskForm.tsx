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
import { Button, Select } from "@/components";
import { CategoryType } from "@/features/categories/schemas/category-schema";

type TaskFormProps = {
	task?: TaskType;
	categories: CategoryType[];
};

export function TaskForm({ task, categories }: TaskFormProps) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<TaskFormData>({
		resolver: zodResolver(TaskSchema),
		defaultValues: { title: task?.title || "", category_id: task?.category_id ?? "" },
	});

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
				text="Nome"
				{...register("title")}
				error={errors.title?.message}
			/>
			<Select
				id="category_id"
				text="Categoria"
				options={categories}
				{...register("category_id")}
				error={errors.category_id?.message}
			/>
			<Button variant="default" type="submit" disabled={isPending}>
				{isPending ? "Salvando..." : "Salvar"}{" "}
			</Button>
		</form>
	);
}
