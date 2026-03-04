import styles from "./Footer.module.css";

export function Footer() {
	return (
		<footer className={styles.footer}>
			<p className={styles.description}>
				Site desenvolvido por{" "}
				<a className={styles.link} href="#">
					Mateus Santos
				</a>
			</p>
			<span className={styles.rights}>&copy {new Date().getFullYear()} Mateus Santos</span>
		</footer>
	);
}
