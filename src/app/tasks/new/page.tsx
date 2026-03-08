import { env } from "@/env";
import { CategoryType } from "@/features/categories/schemas/category-schema";
import { TaskForm } from "@/features/tasks/components/TaskForm/TaskForm";
import { toast } from "sonner";

const getCategories = async (): Promise<CategoryType[]> => {
	const response = await fetch(`${env.API_URL}/categories`, { cache: "no-store" });

	if (!response.ok) toast.error("Erro ao buscar categorias.");

	return response.json();
};

export default async function NewTaskPage() {
	const categories = await getCategories();

	return (
		<div>
			<h1>Adicionando tarefa</h1>
			<TaskForm categories={categories} />
		</div>
	);
}
