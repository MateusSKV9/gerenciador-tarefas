import { getCategories } from "@/features/categories";
import { getTasks, TaskList } from "@/features/tasks";

export default async function Tasks() {
	const [tasks, categories] = await Promise.all([getTasks(), getCategories()]);

	return <TaskList tasks={tasks} categories={categories} />;
}
