"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@/components";
import { CategoryFormData, CategorySchema, CategoryType } from "../../schemas/category-schema";
import { createCategoryAction, updateCategoryAction } from "../../api/category-actions";

type CategoryFormProps = {
	category?: CategoryType;
};

export function CategoryForm({ category }: CategoryFormProps) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<CategoryFormData>({
		resolver: zodResolver(CategorySchema),
		defaultValues: { name: category ? category.name : "" },
	});

	const handleOnSubmit = (data: CategoryFormData) => {
		startTransition(async () => {
			const result = category ? await updateCategoryAction(category.id, data) : await createCategoryAction(data);

			if (result.success) {
				router.push("/categories");
				toast.success(`Categoria ${category ? "atualizada" : "criada"} com sucesso!`);
			} else {
				toast.error(result.error);
			}
		});
	};

	return (
		<form className="form" onSubmit={handleSubmit(handleOnSubmit)}>
			<Input
				id="name"
				text="Nome"
				placeholder="Digite o nome da categoria"
				{...register("name")}
				error={errors.name?.message}
			/>
			<Button variant="default" icon="save" type="submit">
				{isPending ? "Salvando..." : "Salvar"}
			</Button>
		</form>
	);
}
