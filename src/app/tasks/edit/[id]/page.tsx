import Link from "next/link";
import { Button, HeaderSection } from "@/components";
import { TaskForm } from "@/features/tasks/components/TaskForm/TaskForm";
import { getTask } from "@/features/tasks";
import { getCategories } from "@/features/categories";

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
