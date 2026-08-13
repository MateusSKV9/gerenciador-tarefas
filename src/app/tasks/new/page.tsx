import Link from "next/link";
import { env } from "@/env";
import { toast } from "sonner";
import { Button, HeaderSection } from "@/components";
import { CategoryType } from "@/features/categories/schemas/category-schema";
import { TaskForm } from "@/features/tasks/components/TaskForm/TaskForm";

const getCategories = async (): Promise<CategoryType[]> => {
	const response = await fetch(`${env.API_URL}/categories`, { cache: "no-store" });

	if (!response.ok) toast.error("Erro ao buscar categorias.");

	return response.json();
};

export default async function NewTaskPage() {
	const categories = await getCategories();

	return (
		<>
			<HeaderSection title="Adicionando Tarefa">
				<Link href="/">
					<Button variant="default" icon="back">
						Voltar
					</Button>
				</Link>
			</HeaderSection>
			<TaskForm categories={categories} />
		</>
	);
}
