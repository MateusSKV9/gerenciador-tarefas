import { CategoryType } from "../../schemas/category-schema";
import { Category } from "../Category/Category";

type CategoryListProps = {
	categories: CategoryType[];
};

export function CategoryList({ categories }: CategoryListProps) {
	return (
		<section>
			<h1>Categorias</h1>
		<section className={styles.container}>

			<ul className={styles.list}>
				{categories.map((category) => (
					<Category key={category.id} name={category.name} />
				))}
			</ul>
		</section>
	);
}
