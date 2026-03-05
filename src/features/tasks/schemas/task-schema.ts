import { z } from "zod";

export const TaskSchema = z.object({
	id: z.string().default(() => crypto.randomUUID()),
	title: z.string().min(1, "Nome é obrigatório").max(45, "Máximo de 45 caracteres"),
	categoryId: z.string().optional(),
	completed: z.boolean().default(false),
});

export type TaskType = z.infer<typeof TaskSchema>;
