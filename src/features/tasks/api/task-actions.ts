"use server";

import { revalidatePath } from "next/cache";
import { TaskSchema, TaskType, UpdateTaskSchema } from "../schemas/task-schema";
import { TASKS_URL } from "../constants/task-constants";

type ActionResponse = {
	success: boolean;
	data?: TaskType;
	error?: string;
};

export async function createTaskAction(data: unknown): Promise<ActionResponse> {
	try {
		const parsed = TaskSchema.parse(data);

		const response = await fetch(TASKS_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(parsed),
		});

		if (!response.ok) {
			const errorData = await response.json();
			return { success: false, error: errorData.error || "Erro ao criar a tarefa." };
		}

		const task = await response.json();
		revalidatePath("/");
		return { success: true, data: task };
	} catch (err) {
		console.error(err);
		return { success: false, error: "Falha na conexão com o servidor." };
	}
}

export async function deleteTaskAction(id: string): Promise<ActionResponse> {
	try {
		const response = await fetch(`${TASKS_URL}/${id}`, { method: "DELETE" });

		if (!response.ok) {
			const dataError = await response.json();
			return { success: false, error: dataError.error || "Erro ao deletar tarefa." };
		}

		revalidatePath("/");
		return { success: true };
	} catch (err) {
		console.error(err);
		return { success: false, error: "Falha na conexão com o servidor." };
	}
}

export async function updateTaskAction(id: string, data: unknown): Promise<ActionResponse> {
	try {
		const dataToUpdate = UpdateTaskSchema.parse(data);

		const response = await fetch(`${TASKS_URL}/${id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(dataToUpdate),
		});

		if (!response.ok) {
			const dataError = await response.json();
			return { success: false, error: dataError.error || "Erro ao atualizar tarefa." };
		}

		const updatedTask = await response.json();
		revalidatePath("/");
		revalidatePath(`/tasks/edit/${id}`);
		return { success: true, data: updatedTask };
	} catch (err) {
		console.error(err);
		return { success: false, error: "Falha na conexão com o servidor." };
	}
}
