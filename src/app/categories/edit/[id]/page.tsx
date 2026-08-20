import Link from "next/link";
import { Button, HeaderSection } from "@/components";
import { CategoryForm, getCategory } from "@/features/categories";

type EditCategoryProps = {
	params: Promise<{ id: string }>;
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
