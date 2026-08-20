"use server";

import { toast } from "sonner";
import { TaskType } from "../schemas/task-schema";
import { TASKS_URL } from "../constants/task-constants";

export const getTasks = async (): Promise<TaskType[]> => {
	const response = await fetch(TASKS_URL, { cache: "no-store" });

	if (!response.ok) throw new Error("Erro ao buscar tarefa");
	return response.json();
};

export const getTask = async (id: string): Promise<TaskType> => {
	const response = await fetch(`${TASKS_URL}/${id}`, { cache: "no-store" });

	if (!response) toast.error("Erro ao buscar tarefas.");
	return response.json();
};
