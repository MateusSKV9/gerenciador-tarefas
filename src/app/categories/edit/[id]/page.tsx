import { env } from "@/env";
import { CategoryForm } from "@/features/categories/components/CategoryForm/CategoryForm";
import { toast } from "sonner";

type EditCategoryProps = {
	params: Promise<{ id: string }>;
};

const getCategory = async (id: string) => {
	const response = await fetch(`${env.API_URL}/categories/${id}`, { cache: "no-cache" });
	if (!response.ok) toast.error("Erro ao buscar categoria");
	return response.json();
};

export default async function EditCategory({ params }: EditCategoryProps) {
	const { id } = await params;
	const category = await getCategory(id);

  return <CategoryForm category={category} />
}
