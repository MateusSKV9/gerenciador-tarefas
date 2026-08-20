"use client";

import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components";
import { deleteCategoryAction } from "../../api/category-actions";
import styles from "./Category.module.css";

type CategoryProps = {
	id: string;
	name: string;
	onDelete: (id: string) => void;
};

export function Category({ id, name, onDelete }: CategoryProps) {
	const [isPending, startTransition] = useTransition();

	const handleDelete = () => {
		startTransition(async () => {
			onDelete(id);

			const result = await deleteCategoryAction(id);

			if (!result.success) toast.error(result.error);
		});
	};

	return (
		<li className={styles.category}>
			<span>{name}</span>

			<div className={styles.container_buttons}>
				<Link href={`/categories/edit/${id}`}>
					<Button variant="default" icon="edit" disabled={isPending}>
						Editar
					</Button>
				</Link>

				<Button variant="danger" icon="delete" onClick={handleDelete} disabled={isPending}>
					{isPending ? "Deletando..." : "Deletar"}
				</Button>
			</div>
		</li>
	);
}
