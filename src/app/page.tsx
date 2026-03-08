import { env } from "@/env";
import { CategoryType } from "@/features/categories/schemas/category-schema";
import { TaskList, TaskType } from "@/features/tasks";
import { toast } from "sonner";

async function getTasks(): Promise<TaskType[]> {
	const response = await fetch(`${env.API_URL}/tasks`, { cache: "no-store" });
	if (!response.ok) throw new Error("Erro ao buscar tarefa");
	return response.json();
}

const getCategories = async (): Promise<CategoryType[]> => {
	const response = await fetch(`${env.API_URL}/categories`, { cache: "no-cache" });
	if (!response) toast.error("Erro ao buscar dados.");
	return response.json();
};

export default async function Tasks() {
	const tasks = await getTasks();

	return <TaskList tasks={tasks} />;
}
