import Providers from "@/src/components/Providers"
import TopNav from "@/src/components/TopNav"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
	title: "Zephyr - Weather Dashboard 🌤️",
	description: "Next.js Weather Dashboard",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<Providers>
					<TopNav />
					<main>{children}</main>
				</Providers>
			</body>
		</html>
	)
}
