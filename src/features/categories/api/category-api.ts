"use server";

import { toast } from "sonner";
import { CATEGORIES_URL } from "../constants/category-constants";

export const getCategories = async () => {
	const response = await fetch(CATEGORIES_URL, { cache: "no-store" });

	if (!response) toast.error("Erro ao buscar dados.");
	return response.json();
};

export const getCategory = async (id: string) => {
	const response = await fetch(`${CATEGORIES_URL}/${id}`, { cache: "no-cache" });

	if (!response.ok) toast.error("Erro ao buscar categoria");
	return response.json();
};
