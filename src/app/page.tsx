import { TaskList, TaskType } from "@/features/tasks";

async function getTasks(): Promise<TaskType[]> {
	const response = await fetch("https://json-server-5bev.onrender.com/tasks/", { cache: "no-store" });
	if (!response.ok) throw new Error("Não foi possível se conectar ao servidor de tarefas");
	return response.json();
}

export default async function Tasks() {
	const tasks = await getTasks();

	return <TaskList tasks={tasks} />;
}
