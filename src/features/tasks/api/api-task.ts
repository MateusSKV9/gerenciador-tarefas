"use server";
import { revalidatePath } from "next/cache";
import { TaskSchema, TaskType, UpdateTaskSchema } from "../schemas/task-schema";

const API_URL = "https://json-server-5bev.onrender.com/tasks";

export async function createTaskAction(data: unknown): Promise<TaskType> {
	const parsed = TaskSchema.parse(data);

	const response = await fetch(API_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(parsed),
	});
	if (!response.ok) throw new Error("Erro ao criar tarefa");

	return response.json();
}

export async function deleteTaskAction(id: string): Promise<void> {
	const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
	if (!response.ok) throw new Error("Erro ao deletar tarefa");

	revalidatePath("/");
}

export async function updateTaskAction(id: string, data: unknown): Promise<TaskType> {
	const dataToUpdate = UpdateTaskSchema.parse(data);

	const response = await fetch(`${API_URL}/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(dataToUpdate),
	});
	if (!response.ok) throw new Error("Erro ao atualizar tarefa");

	revalidatePath("/");
	revalidatePath(`/tasks/edit/${id}`);
	return response.json();
}
