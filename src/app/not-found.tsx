import Link from "next/link";

export default function NotFound() {
	return (
		<section>
			<h1>Página não encontrada</h1>
			<Link href="/">Início</Link>
		</section>
	);
}
