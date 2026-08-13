"use client";

import Link from "next/link";
import { useOptimistic } from "react";
import { Button, HeaderSection } from "@/components";
import { CategoryType } from "../../schemas/category-schema";
import { Category } from "../Category/Category";
import styles from "./CategoryList.module.css";

type CategoryListProps = {
	categories: CategoryType[];
};

export function CategoryList({ categories }: CategoryListProps) {
	const [optimisticCategories, removeOptimisticCategory] = useOptimistic(categories, (state, categoryId: string) => {
		return state.filter((c) => c.id !== categoryId);
	});

	return (
		<section className={styles.container}>
			<HeaderSection title="Categorias">
				<Link href="/categories/new">
					<Button variant="default" icon="add">
						Adicionar
					</Button>
				</Link>
			</HeaderSection>

			<ul className={styles.list}>
				{optimisticCategories.map((category) => (
					<Category
						key={category.id}
						id={category.id}
						name={category.name}
						onDelete={(id: string) => removeOptimisticCategory(id)}
					/>
				))}
			</ul>
		</section>
	);
}
