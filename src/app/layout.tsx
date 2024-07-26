import { GlobalContextProvider } from "@/src/components/GlobalContext"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
	title: "Zephyr - Weather Dashboard 🌤️",
	description: "Next.js Weather Dashboard",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<GlobalContextProvider>
					<main>{children}</main>
				</GlobalContextProvider>
			</body>
		</html>
	)
}
