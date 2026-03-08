"use client";

import { Button } from "@/components";

type ErrorProps = { error: Error & { digest: string }; reset: () => void };

export default function Error({ error, reset }: ErrorProps) {
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
