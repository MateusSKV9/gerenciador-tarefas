"use server";
import { TaskSchema, TaskType } from "../schemas/task-schema";

const API_URL = "https://json-server-5bev.onrender.com/tasks";

export async function getTaskAction(id: string): Promise<TaskType> {
	const response = await fetch(`${API_URL}/${id}`, { cache: "no-store" });
	if (!response.ok) throw new Error("Erro ao buscar tarefa");
	return response.json();
}

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
}

export async function updateTaskAction(id: string, data: Partial<TaskType>): Promise<TaskType> {
	const response = await fetch(`${API_URL}/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	if (!response.ok) throw new Error("Erro ao atualizar tarefa");
	return response.json();
}
