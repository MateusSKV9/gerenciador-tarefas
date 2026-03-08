import styles from "./Select.module.css";
import { CategoryType } from "@/features/categories/schemas/category-schema";
import React, { forwardRef } from "react";

type SelectProps = {
	text: string;
	error?: string;
	options: CategoryType[];
} & React.ComponentProps<"select">;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
	({ text, error, options, ...props }: SelectProps, ref) => {
		return (
			<div className={styles.form_group}>
				<label className={styles.label} htmlFor={props.id}>
					{text}
				</label>
				<select className={styles.select} ref={ref} {...props}>
					<option className={styles.option} value="">
						Selecione uma categoria
					</option>
					{options.map((option) => (
						<option className={styles.option} key={option.id} value={option.id}>
							{option.name}
						</option>
					))}
				</select>
				{error && <span className={styles.error}>{error}</span>}
			</div>
		);
	}
);

Select.displayName = "Select";
