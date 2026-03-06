"use client";

import { Input } from "@/components/Input/Input";
import { useForm } from "react-hook-form";
import { createTaskAction, updateTaskAction } from "../../api/api-task";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskSchema, TaskType } from "../../schemas/task-schema";
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
	} = useForm({ resolver: zodResolver(TaskSchema), defaultValues: { title: task?.title || "" } });

	const onSubmit = (data: { title: string }) => {
		startTransition(async () => {
			try {
				if (task) {
					await updateTaskAction(task.id, data);
				} else {
					await createTaskAction(data);
				}

				router.push("/");
			} catch (error) {
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
