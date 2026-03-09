"use client";

import Link from "next/link";
import styles from "./Category.module.css";
import { Button } from "@/components";
import { useTransition } from "react";
import { deleteCategoryAction } from "../../api/category-api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type CategoryProps = {
	id: string;
	name: string;
};

export function Category({ id, name }: CategoryProps) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const handleDelete = () => {
		startTransition(async () => {
			const result = await deleteCategoryAction(id);

			if (!result.success) toast.error(result.error);
		});
	};

	return (
		<li className={styles.category}>
			<span>{name}</span>

			<div className={styles.container_buttons}>
				<Link href={`/categories/edit/${id}`}>
					<Button variant="default">Editar</Button>
				</Link>
				<Button onClick={handleDelete} variant="danger">
					{isPending ? "Deletando" : "Deletar"}
				</Button>
			</div>
		</li>
	);
}
