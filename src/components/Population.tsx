"use client"

import { formatNumber } from "@/src/lib/helperConversions"
import { UsersRound } from "lucide-react"
import { useGlobalContext } from "./GlobalContext"
import { Skeleton } from "./ui/skeleton"

export default function Population() {
	const { fiveDayForecast } = useGlobalContext()

	const { city } = fiveDayForecast

	if (!fiveDayForecast || !city) {
		return <Skeleton className="h-48 w-full" />
	}

	return (
		<section className="flex h-48 flex-col gap-5 p-5">
			<h2 className="flex items-center gap-2 font-medium">
				<UsersRound size={20} /> Population
			</h2>

			<p className="mt-4 text-2xl">{formatNumber(city.population)}</p>
			<p className="text-sm">Latest population data for {city.name}.</p>
		</section>
	)
}
