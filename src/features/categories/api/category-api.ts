"use server";

import { env } from "@/env";
import { CategorySchema, updateCategorySchema } from "../schemas/category-schema";
import { TaskType } from "@/features/tasks";
import { revalidatePath } from "next/cache";

const API_URL = env.API_URL;

type ActionResponse = {
	success: boolean;
	data?: TaskType;
	error?: string;
};

export async function createCategoryAction(data: unknown): Promise<ActionResponse> {
	try {
		const parsed = CategorySchema.parse(data);

		const response = await fetch(`${API_URL}/categories`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(parsed),
		});

		if (!response.ok) return { success: true, error: "Erro ao criar categoria." };

		const category = await response.json();

		revalidatePath("/categories");
		return { success: true, data: category };
	} catch (error) {
		console.error(error);
		return {
			success: false,
			error: "Não foi possível estabeler conexão com o servidor.",
		};
	}
}

export async function deleteCategoryAction(id: string): Promise<ActionResponse> {
	try {
		const response = await fetch(`${API_URL}/categories/${id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		});

		if (!response.ok) return { success: false, error: "Erro ao deletar categoria" };

		revalidatePath("/categories");
		revalidatePath("/tasks");
		return { success: true };
	} catch (error) {
		console.error(error);
		return { success: false, error: "Não foi possível estabelecer conexão." };
	}
}

export async function updateCategoryAction(id: string, data: unknown): Promise<ActionResponse> {
	try {
		const parsed = updateCategorySchema.parse(data);
		const response = await fetch(`${API_URL}/categories/${id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(parsed),
		});

		if (!response.ok) return { success: false, error: "Erro ao atualizar categoria." };

		const updatedTask = await response.json();

		revalidatePath("/categories");
		revalidatePath(`/categories/edit/${id}`);
		return { success: true, data: updatedTask };
	} catch (error) {
		console.error(error);
		return { success: false, error: "Erro ao estabelecer conexão." };
	}
}
