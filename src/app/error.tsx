"use client";

export default function Error({ error, reset }: { error: Error & { digest: string }; reset: () => void }) {
	return (
		<div>
			<h1>ALgo deu errado ao buscar aos dados</h1>
			<p>{error.message} || O servidor de tarefas pode estar fora do ar.</p>

			<button onClick={() => reset()} type="button">
				Tentar novamente
			</button>
		</div>
	);
}
