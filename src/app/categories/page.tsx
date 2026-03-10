import { env } from "@/env";
import { CategoryList } from "@/features/categories";
import { toast } from "sonner";

const getCategories = async () => {
	const response = await fetch(`${env.API_URL}/categories`, { cache: "no-store" });
	if (!response) toast.error("Erro ao buscar dados.");
	return response.json();
};

export default async function CategoriesPage() {
	const categories = await getCategories();

	return <CategoryList categories={categories} />;
}
