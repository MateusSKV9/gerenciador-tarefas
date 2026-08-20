import { CategoryList, getCategories } from "@/features/categories";

export default async function CategoriesPage() {
	const categories = await getCategories();

	return <CategoryList categories={categories} />;
}
