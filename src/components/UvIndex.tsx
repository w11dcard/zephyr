import { SunDim } from "lucide-react"
import { uvIndexRating } from "../lib/helperRatings"
import { useGlobalContext } from "./GlobalContext"
import { Skeleton } from "./ui/skeleton"

export default function UvIndex() {
	const { forecast } = useGlobalContext()

	if (!forecast || !forecast.daily || !forecast.daily.uv_index_max) {
		return <Skeleton className="h-48 w-full" />
	}

	const uvIndexMax = forecast.daily.uv_index_max[0]?.toFixed(0) || 0

	const { text, description } = uvIndexRating(uvIndexMax)

	return (
		<section className="flex h-48 flex-col p-4">
			<h2 className="flex items-center gap-2 font-medium">
				<SunDim size={25} /> UV Index
			</h2>

			<div className="my-4 flex flex-col gap-4">
				<p className="text-2xl">
					{uvIndexMax} <span className="text-base">({text})</span>
				</p>
				<p className="text-sm">{description}</p>
			</div>
		</section>
	)
}
