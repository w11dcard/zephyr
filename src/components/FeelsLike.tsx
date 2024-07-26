"use client"

import { kelvinToCelsius } from "@/src/lib/helperConversions"
import { feelsLikeRating } from "@/src/lib/helperRatings"
import { Thermometer } from "lucide-react"
import { useGlobalContext } from "./GlobalContext"
import { Skeleton } from "./ui/skeleton"

export default function FeelsLike() {
	const { forecast } = useGlobalContext()

	if (!forecast || !forecast?.main || !forecast?.main?.feels_like) {
		return <Skeleton className="h-[12rem] w-full" />
	}

	const { feels_like, temp_min, temp_max } = forecast.main
	const feelsLikeDescription = feelsLikeRating(feels_like, temp_min, temp_max)

	return (
		<section className="flex h-48 flex-col gap-5 p-5">
			<h2 className="flex items-center gap-2 font-medium">
				<Thermometer size={20} /> Feels Like
			</h2>

			<p className="mt-4 text-2xl">{kelvinToCelsius(feels_like)}°</p>
			<p className="text-sm">{feelsLikeDescription}</p>
		</section>
	)
}
