type TaskPageProps = { params: Promise<{ id: string }> };

export default async function TaskPage({ params }: TaskPageProps) {
	const { id } = await params;

	return (
		<section>
			<h1>Tarefa - {id}</h1>
		</section>
	);
}
