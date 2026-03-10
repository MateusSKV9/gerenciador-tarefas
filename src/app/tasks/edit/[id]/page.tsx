import { Button, HeaderSection } from "@/components";
import { env } from "@/env";
import { TaskType } from "@/features/tasks";
import { TaskForm } from "@/features/tasks/components/TaskForm/TaskForm";
import Link from "next/link";
import { toast } from "sonner";

async function getTask(id: string): Promise<TaskType> {
	const response = await fetch(`${env.API_URL}/tasks/${id}`, { cache: "no-store" });
	if (!response.ok) throw new Error("Erro ao buscar tarefa");
	return response.json();
}

const getCategories = async () => {
	const response = await fetch(`${env.API_URL}/categories`);
	if (!response) toast.error("Erro ao buscar dados.");
	return response.json();
};

type EditTaskPageProps = { params: Promise<{ id: string }> };

export default async function EditTaskPage({ params }: EditTaskPageProps) {
	const { id } = await params;
	const task = await getTask(id);
	const categories = await getCategories();

	if (!task) return <p>Tarefa não encontrada.</p>;

	return (
		<>
			<HeaderSection title="Editando Tarefa">
				<Link href="/">
					<Button variant="default" icon="back">
						Voltar
					</Button>
				</Link>
			</HeaderSection>

			<TaskForm task={task} categories={categories} />
		</>
	);
}
