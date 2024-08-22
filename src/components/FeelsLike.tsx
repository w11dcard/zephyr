"use client"

import { feelsLikeRating } from "@/src/lib/helperRatings"
import { Thermometer } from "lucide-react"
import { useGlobalContext } from "./GlobalContext"
import { Skeleton } from "./ui/skeleton"

export default function FeelsLike() {
	const { forecast } = useGlobalContext()

	if (!forecast || !forecast?.current || !forecast?.current?.apparent_temperature) {
		return <Skeleton className="h-48 w-full" />
	}

	const { apparent_temperature, temp_min, temp_max } = forecast.current
	const feelsLikeDescription = feelsLikeRating(apparent_temperature, temp_min, temp_max)

	return (
		<section className="flex h-48 flex-col p-4">
			<h2 className="flex items-center gap-2 font-medium">
				<Thermometer size={25} /> Feels Like
			</h2>

			<div className="my-4 flex flex-col gap-4">
				<p className="text-2xl">{Math.round(apparent_temperature)}°</p>
				<p className="text-sm">{feelsLikeDescription}</p>
			</div>
		</section>
	)
}
