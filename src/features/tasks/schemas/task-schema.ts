import { z } from "zod";

export const TaskSchema = z.object({
	id: z.string().default(() => crypto.randomUUID()),
	title: z.string().min(1, "Nome é obrigatório").max(45, "Máximo de 45 caracteres"),
	completed: z.boolean().default(false),
	category_id: z.string().optional(),
});
export type TaskType = z.infer<typeof TaskSchema>;

export const UpdateTaskSchema = TaskSchema.omit({ id: true }).partial();

export const TaskFormSchema = TaskSchema.pick({
	title: true,
	category_id: true,
});
export type TaskFormData = z.infer<typeof TaskFormSchema>;
