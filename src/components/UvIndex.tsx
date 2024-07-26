"use client"

import { uvIndexRating } from "@/src/lib/helperRatings"
import { SunDim } from "lucide-react"
import { useGlobalContext } from "./GlobalContext"
import { Progress } from "./ui/progress"
import { Skeleton } from "./ui/skeleton"

export default function UvIndex() {
	const { uvIndex } = useGlobalContext()

	const daily = uvIndex?.daily || {}
	const uvIndexMax = daily.uv_index_max?.[0]?.toFixed(0) || 0
	const marginLeftPercentage = (parseFloat(uvIndexMax) / 14) * 100

	if (!uvIndex || !uvIndex.daily || !daily.uv_index_max) {
		return <Skeleton className="h-48 w-full" />
	}

	const { text, description } = uvIndexRating(uvIndexMax)

	return (
		<section className="flex h-48 flex-col gap-5 p-5">
			<div>
				<h2 className="flex items-center gap-2 font-medium">
					<SunDim size={20} /> UV Index
				</h2>

				<div className="flex flex-col gap-2 pt-4">
					<p className="text-2xl">
						{uvIndexMax} <span className="text-sm">({text})</span>
					</p>
					<Progress className="progress" value={marginLeftPercentage} max={100} />
					<p className="text-sm">{description}</p>
				</div>
			</div>
		</section>
	)
}
