import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "@/components";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Gerenciador de Tarefas",
	description: "Gerenciador de tarefas moderno e intuitivo.",
};

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="pt-br">
			<body className={`${inter.className}`}>
        <Toaster position="top-right" richColors />
				<Header />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
