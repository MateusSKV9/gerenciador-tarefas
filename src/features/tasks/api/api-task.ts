"use server";
import { revalidatePath } from "next/cache";
import { TaskSchema, TaskType, UpdateTaskSchema } from "../schemas/task-schema";
import { env } from "@/env";

const API_URL = env.API_URL;

export async function createTaskAction(data: unknown): Promise<TaskType> {
	const parsed = TaskSchema.parse(data);

	const response = await fetch(`${API_URL}/tasks`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(parsed),
	});
	if (!response.ok) throw new Error("Erro ao criar tarefa");

	return response.json();
}

export async function deleteTaskAction(id: string): Promise<void> {
	const response = await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
	if (!response.ok) throw new Error("Erro ao deletar tarefa");

	revalidatePath("/");
}

type ActionResponse = {
	success: boolean;
	data?: TaskType;
	error?: string;
};

export async function updateTaskAction(id: string, data: unknown): Promise<ActionResponse> {
	try {
		const dataToUpdate = UpdateTaskSchema.parse(data);

		const response = await fetch(`${env.API_URL}/tasks/${id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(dataToUpdate),
		});

		if (!response.ok) {
			return { success: false, error: "Servidor ocupado. Tente novamente em instantes." };
		}

		const updatedTask = await response.json();

		revalidatePath("/");
		revalidatePath(`/tasks/edit/${id}`);

		return { success: true, data: updatedTask };
	} catch (err) {
		return { success: false, error: "Falha na conexão com o servidor." };
	}
}
