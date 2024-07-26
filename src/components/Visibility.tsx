"use client"

import { visibilityRating } from "@/src/lib/helperRatings"
import { Eye } from "lucide-react"
import { useGlobalContext } from "./GlobalContext"
import { Skeleton } from "./ui/skeleton"

export default function Visibility() {
	const { forecast } = useGlobalContext()

	const { visibility } = forecast

	if (!forecast || !forecast?.visibility) {
		return <Skeleton className="h-48 w-full" />
	}

	return (
		<section className="flex h-48 flex-col gap-5 p-5">
			<h2 className="flex items-center gap-2 font-medium">
				<Eye size={25} /> Visibility
			</h2>

			<p className="mt-4 text-2xl">{Math.round(visibility / 1000)} km</p>
			<p className="text-sm">{visibilityRating(visibility)}</p>
		</section>
	)
}
