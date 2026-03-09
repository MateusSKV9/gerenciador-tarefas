"use client";

import { Button, Input } from "@/components";
import { useForm } from "react-hook-form";
import { CategoryFormData, CategorySchema, CategoryType } from "../../schemas/category-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { createCategoryAction, updateCategoryAction } from "../../api/category-api";

type CategoryFormProps = {
	category?: CategoryType;
};

export function CategoryForm({ category }: CategoryFormProps) {
	const router = useRouter();

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<CategoryFormData>({
		resolver: zodResolver(CategorySchema),
		defaultValues: { name: category ? category.name : "" },
	});

	const [isPending, startTransition] = useTransition();

	const handleOnSubmit = (data: CategoryFormData) => {
		startTransition(async () => {
			if (category) {
				await updateCategoryAction(category.id, data);
			} else {
				await createCategoryAction(data);
			}

			router.push("/categories");
		});
	};

	return (
		<form onSubmit={handleSubmit(handleOnSubmit)}>
			<Input
				id="name"
				text="Nome"
				placeholder="Digite o nome da categoria"
				{...register("name")}
				error={errors.name?.message}
			/>
			<Button type="submit" variant="default">
				{isPending ? "Salvando..." : "Salvar"}
			</Button>
		</form>
	);
}
