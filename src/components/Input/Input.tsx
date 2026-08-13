import styles from "./Input.module.css";

type InputProps = {
	text: string;
	error?: string;
} & React.ComponentProps<"input">;

export function Input({ text, error, ref, ...props }: InputProps) {
	return (
		<div className={styles.form_group}>
			<label className={styles.label} htmlFor={props.id}>
				{text}
			</label>

			<input className={styles.input} ref={ref} {...props} />
			{error && <span className={styles.error}>* {error}</span>}
		</div>
	);
}
