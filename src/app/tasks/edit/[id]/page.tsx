import { TaskType } from "@/features/tasks";
import { TaskForm } from "@/features/tasks/components/TaskForm/TaskForm";

async function getTask(id: string): Promise<TaskType> {
	const response = await fetch(`https://json-server-5bev.onrender.com/tasks/${id}`, { cache: "no-store" });
	if (!response.ok) throw new Error("Erro ao buscar tarefa");
	return response.json();
}

type EditTaskPageProps = { params: Promise<{ id: string }> };

export default async function EditTaskPage({ params }: EditTaskPageProps) {
	const { id } = await params;
	const task = await getTask(id);

	if (!task) return <p>Tarefa não encontrada.</p>;

	return (
		<section>
			<h1>Editando produto </h1>

			<TaskForm task={task} />
		</section>
	);
}
