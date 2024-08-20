"use client"

import { pressureRating } from "@/src/lib/helperRatings"
import { GaugeCircle } from "lucide-react"
import { useGlobalContext } from "./GlobalContext"
import { Skeleton } from "./ui/skeleton"

export default function Pressure() {
	const { forecast } = useGlobalContext()

	if (!forecast || !forecast?.current || !forecast?.current?.surface_pressure) {
		return <Skeleton className="h-48 w-full" />
	}

	const { surface_pressure } = forecast.current

	const roundedPressure = Math.round(surface_pressure)

	return (
		<section className="flex h-48 flex-col gap-5 p-5">
			<h2 className="flex items-center gap-2 font-medium">
				<GaugeCircle size={20} /> Pressure
			</h2>

			<p className="mt-4 text-2xl">{roundedPressure} hPa</p>
			<p className="text-sm">{pressureRating(roundedPressure)}</p>
		</section>
	)
}
