"use client"

import { airQualityRating } from "@/src/lib/helperRatings"
import { Gauge } from "lucide-react"
import { useGlobalContext } from "./GlobalContext"
import { Progress } from "./ui/progress"
import { Skeleton } from "./ui/skeleton"

export default function AirQuality() {
	const { airQuality } = useGlobalContext()

	if (!airQuality || !airQuality.list || airQuality.list.length === 0 || !airQuality.list[0].main) {
		return <Skeleton className="col-span-2 h-48 w-full md:col-span-full" />
	}

	const airQualityIndex = airQuality.list[0].main.aqi * 10
	const filteredIndex = airQualityRating.find((item) => item.rating === airQualityIndex)

	return (
		<section className="col-span-full flex h-48 flex-col gap-5 p-5 md:col-span-2 xl:col-span-2">
			<h2 className="flex items-center gap-2 font-medium">
				<Gauge size={20} /> Air Quality
			</h2>

			<div className="mt-10 flex flex-col justify-center gap-6">
				<Progress className="progress" value={airQualityIndex} max={100} />
				<p className="text-sm">Air quality is {filteredIndex?.description ?? "unknown"}.</p>
			</div>
		</section>
	)
}
