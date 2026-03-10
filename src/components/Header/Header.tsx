import styles from "./Header.module.css";
import Link from "next/link";

export function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.wrapper}>
				<Link className={styles.logo} href="/">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344" />
						<path d="m9 11 3 3L22 4" />
					</svg>
					<span className={styles.logo_text}>Gerenciador de Tarefas</span>
				</Link>

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
			</div>
		</header>
	);
}
