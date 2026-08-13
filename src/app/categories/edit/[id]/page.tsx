import Link from "next/link";
import { env } from "@/env";
import { toast } from "sonner";
import { Button, HeaderSection } from "@/components";
import { CategoryForm } from "@/features/categories/components/CategoryForm/CategoryForm";

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

	return (
		<section className="section__middle">
			<HeaderSection title="Editando Categoria">
				<Link href="/categories">
					<Button variant="default" icon="back">
						Voltar
					</Button>
				</Link>
			</HeaderSection>
			<CategoryForm category={category} />
		</section>
	);
}
