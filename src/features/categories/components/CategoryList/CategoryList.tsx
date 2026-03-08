import { CategoryType } from "../../schemas/category-schema";
import { Category } from "../Category/Category";

type CategoryListProps = {
	categories: CategoryType[];
};

export function CategoryList({ categories }: CategoryListProps) {
	return (
		<section>
			<h1>Categorias</h1>

			<ul>
				{categories.map((category) => (
					<Category key={category.id} name={category.name} />
				))}
			</ul>
		</section>
	);
}
