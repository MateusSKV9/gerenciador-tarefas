"use client";

import styles from "./CategoryList.module.css";
import { CategoryType } from "../../schemas/category-schema";
import { Category } from "../Category/Category";
import { Button, HeaderSection } from "@/components";
import Link from "next/link";
import { useOptimistic } from "react";

type CategoryListProps = {
	categories: CategoryType[];
};

export function CategoryList({ categories }: CategoryListProps) {
	const [optimisticCategories, removeOptmisticCategory] = useOptimistic(categories, (state, categoryId: string) => {
		return state.filter((c) => c.id !== categoryId);
	});

	return (
		<section className={styles.container}>
			<HeaderSection title="Adicionando Categoria">
				<Link href="/categories/new">
					<Button variant="default">Adicionar</Button>
				</Link>
			</HeaderSection>

			<ul className={styles.list}>
				{optimisticCategories.map((category) => (
					<Category
						key={category.id}
						id={category.id}
						name={category.name}
						onDelete={(id: string) => removeOptmisticCategory(id)}
					/>
				))}
			</ul>
		</section>
	);
}
