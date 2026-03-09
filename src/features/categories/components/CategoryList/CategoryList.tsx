import styles from "./CategoryList.module.css";
import { CategoryType } from "../../schemas/category-schema";
import { Category } from "../Category/Category";
import { Button, HeaderSection } from "@/components";
import Link from "next/link";

type CategoryListProps = {
	categories: CategoryType[];
};

export function CategoryList({ categories }: CategoryListProps) {
	return (
		<section className={styles.container}>
			<HeaderSection title="Adicionando Categoria">
				<Link href="/categories/new">
					<Button variant="default">Adicionar</Button>
				</Link>
			</HeaderSection>

			<ul className={styles.list}>
				{categories.map((category) => (
					<Category key={category.id} id={category.id} name={category.name} />
				))}
			</ul>
		</section>
	);
}
