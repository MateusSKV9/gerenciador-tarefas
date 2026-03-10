"use client";

import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend } from "recharts";
import styles from "./TaskChart.module.css";

type TaskChartProps = {
	pendingCount: number;
	completedCount: number;
};

export function TaskChart({ pendingCount, completedCount }: TaskChartProps) {
	const total = pendingCount + completedCount;
	const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;

	const data = [
		{ name: "Pendentes", value: pendingCount, fill: "#f87171" },
		{ name: "Concluídas", value: completedCount, fill: "#4ade80" },
	];

	if (total === 0) return null;

	return (
		<div className={styles.chart_card}>
			<h4 className={styles.chart_title}>Progresso Geral</h4>

			<div className={styles.recharts_wrapper}>
				<ResponsiveContainer>
					<PieChart>
						<Pie data={data} innerRadius={35} outerRadius={60} paddingAngle={4} dataKey="value" cornerRadius={4} />
						<Tooltip
							contentStyle={{
								borderRadius: "8px",
								border: "none",
								boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
								fontSize: "12px",
								fontWeight: "bold",
							}}
						/>
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>

			<p className={styles.chart_percentage}>{percentage}% concluído</p>
		</div>
	);
}
