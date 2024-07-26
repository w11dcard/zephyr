"use client"

import { unixToTime } from "@/src/lib/helperConversions"
import { SunsetIcon } from "lucide-react"
import { useGlobalContext } from "./GlobalContext"
import { Skeleton } from "./ui/skeleton"

export default function Sunset() {
	const { forecast } = useGlobalContext()

	if (!forecast || !forecast.sys || !forecast.sys.sunset || !forecast.sys.sunrise || !forecast.timezone) {
		return <Skeleton className="h-48 w-full" />
	}

	const { sunset, sunrise } = forecast.sys
	const timezone = forecast.timezone
	const sunsetTime = unixToTime(sunset, timezone)
	const sunriseTime = unixToTime(sunrise, timezone)

	return (
		<section className="flex h-48 flex-col gap-5 p-5">
			<h2 className="flex items-center gap-2 font-medium">
				<SunsetIcon size={20} /> Sunset
			</h2>

			<p className="mt-4 text-2xl">{sunsetTime}</p>
			<p className="text-sm">Sunrise: {sunriseTime}</p>
		</section>
	)
}
