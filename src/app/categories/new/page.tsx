import { Button, HeaderSection } from "@/components";
import { CategoryForm } from "@/features/categories/components/CategoryForm/CategoryForm";
import Link from "next/link";

export default function NewCategory() {
	return (
		<section className="section__middle">
			<HeaderSection title="Adicionando categoria">
				<Link href="/categories">
					<Button variant="default" icon="back">
						Voltar
					</Button>
				</Link>
			</HeaderSection>
			<CategoryForm />
		</section>
	);
}
