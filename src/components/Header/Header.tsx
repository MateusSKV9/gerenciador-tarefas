import styles from "./Header.module.css";
import Link from "next/link";

export function Header() {
	return (
		<header className={styles.header}>
			<Link href="/">Gerenciador de Tarefas</Link>

			<nav className={styles.nav}>
				<ul className={styles.list}>
					<li className={styles.item}>
						<Link className={styles.link} href="/">
							Tarefas
						</Link>
					</li>
					<li className={styles.item}>
						<Link className={styles.link} href="/categories">
							Categorias
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
