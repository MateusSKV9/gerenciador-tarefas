"use client";

import { Button } from "@/components";

export default function Error({ error, reset }: { error: Error & { digest: string }; reset: () => void }) {
	return (
		<div>
			<h1>ALgo deu errado ao buscar aos dados</h1>
			<p>{error.message}</p>
			<p>O servidor de tarefas pode estar fora do ar.</p>

			<Button variant="default" onClick={() => reset()}>
				Tentar novamente
			</Button>
		</div>
	);
}
