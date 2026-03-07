import styles from "./Button.module.css";
import { ComponentProps } from "react";

type ButtonVariant = "default" | "primary" | "danger";

type ButtonProps = {
	variant: ButtonVariant;
} & ComponentProps<"button">;

export function Button({ children, variant, ...props }: ButtonProps) {
	return (
		<button className={`${styles.button} ${styles[variant]}`} {...props}>
			{children}
		</button>
	);
}
