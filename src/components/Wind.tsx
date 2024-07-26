"use client"

import { WindIcon } from "lucide-react"
import Image from "next/image"
import { useGlobalContext } from "./GlobalContext"
import { Skeleton } from "./ui/skeleton"

export default function Wind() {
	const { forecast } = useGlobalContext()

	const windSpeed = forecast?.wind?.speed
	const windDir = forecast?.wind?.deg

	if (!windSpeed || !windDir) {
		return <Skeleton className="h-48 w-full" />
	}

	return (
		<section className="flex h-48 flex-col gap-5 p-5">
			<h2 className="flex items-center gap-2 font-medium">
				<WindIcon size={25} /> Wind
			</h2>

			<div className="relative flex items-center justify-center gap-4">
				<Image src="/compass-body.svg" alt="compass" width={110} height={110} />
				<Image
					src="/compass-arrow.svg"
					alt="compass"
					className="absolute left-[50%] transition-all duration-500 ease-in-out"
					style={{
						transform: `rotate(${windDir}deg) translateX(-50%)`,
						height: "100%",
					}}
					width={12}
					height={12}
				/>
				<p className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] text-xs font-medium">
					{Math.round(windSpeed)} m/s
				</p>
			</div>
		</section>
	)
}
