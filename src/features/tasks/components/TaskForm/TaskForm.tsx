"use client";

import { Input } from "@/components/Input/Input";
import { useForm } from "react-hook-form";
import { createTaskAction, updateTaskAction } from "../../api/api-task";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskFormData, TaskSchema, TaskType } from "../../schemas/task-schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
			try {
				if (task) {
					await updateTaskAction(task.id, data);
					toast.success("Tarefa atualizada com sucesso!");
				} else {
					await createTaskAction(data);
					toast.success("Tarefa criada com sucesso!");
				}

				router.push("/");
			} catch (error) {
				toast.error("Erro ao salvar tarefa! tente novamente");
				console.error(error);
			}
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input
				id="title"
				type="text"
				placeholder="Digite o título da tarefa"
				error={errors.title?.message}
				text="Nome"
				{...register("title")}
			/>
			<button type="submit" disabled={isPending}>
				{isPending ? "Salvando" : "Salvar"}{" "}
			</button>
		</form>
	);
}
