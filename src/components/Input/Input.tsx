import styles from "./Input.module.css";
import React, { forwardRef } from "react";

type InputProps = {
	text: string;
	error?: string;
} & React.ComponentProps<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ text, error, ...props }: InputProps, ref) => {
	return (
		<div className={styles.form_group}>
			<label className={styles.label} htmlFor={props.id}>
				{text}
			</label>
			<input className={styles.input} ref={ref} {...props} />
			{error && <span className={styles.error}>* {error}</span>}
		</div>
	);
});

Input.displayName = "Input";
