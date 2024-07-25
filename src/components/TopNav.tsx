"use client"

import { Icon } from "@iconify/react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function TopNav() {
	const [theme, setTheme] = useState("light")

	const toggleTheme = () => setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))

	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme === "dark")
	}, [theme])

	return (
		<nav className="mb-8 flex items-center justify-between p-2 shadow-md">
			<div className="flex items-center gap-2">
				<Link className="button" href="/">
					Home
				</Link>
			</div>

			<div className="flex items-center gap-2">
				<button onClick={toggleTheme} className="button flex h-10 w-10 items-center justify-center">
					<Icon
						icon={theme === "light" ? "material-symbols:light-mode-rounded" : "material-symbols:dark-mode-rounded"}
					/>
				</button>
			</div>
		</nav>
	)
}
