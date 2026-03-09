import z from "zod";

export const CategorySchema = z.object({
	id: z.string().default(() => crypto.randomUUID()),
	name: z.string().min(1, "Nome é obrigatório").max(45, "Máximo de 45 caracteres"),
});

export const updateCategorySchema = CategorySchema.omit({ id: true });

export type CategoryType = z.infer<typeof CategorySchema>;

export type CategoryFormData = z.infer<typeof updateCategorySchema>;

