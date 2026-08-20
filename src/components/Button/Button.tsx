import { ICONS, IconTypes } from "@/icons/Icons";
import styles from "./Button.module.css";

type ButtonVariant = "default" | "primary" | "danger";

type ButtonProps = {
	variant: ButtonVariant;
	icon?: IconTypes;
} & React.ComponentProps<"button">;

export function Button({ children, variant, icon, ...props }: ButtonProps) {
	return (
		<button className={`${styles.button} ${styles[variant]}`} {...props}>
			{icon && ICONS[icon]}
			<span className={styles.text}>{children}</span>
		</button>
	);
}
