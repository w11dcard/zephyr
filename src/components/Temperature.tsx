"use client"

import { kelvinToCelsius } from "@/src/lib/helperConversions"
import { CloudDrizzle, CloudRain, CloudSun, Cloudy, Navigation, Snowflake } from "lucide-react"
import moment from "moment"
import { useEffect, useState } from "react"
import { useGlobalContext } from "./GlobalContext"
import { Skeleton } from "./ui/skeleton"

export default function Temperature() {
	const { forecast } = useGlobalContext()

	const [localTime, setLocalTime] = useState<string>("")
	const [currentDate, setCurrentDate] = useState<string>("")

	useEffect(() => {
		if (forecast?.timezone) {
			const interval = setInterval(() => {
				const localMoment = moment().utcOffset(forecast.timezone / 60)
				setLocalTime(localMoment.format("hh:mm"))
				setCurrentDate(localMoment.format("dddd, MMMM Do YYYY"))
			}, 1000)
			return () => clearInterval(interval)
		}
	}, [forecast?.timezone])

	if (!forecast?.main || !forecast?.weather) {
		return <Skeleton className="h-full w-full" />
	}

	const { main, name, weather } = forecast
	const temp = kelvinToCelsius(main.temp)
	const minTemp = kelvinToCelsius(main.temp_min)
	const maxTemp = kelvinToCelsius(main.temp_max)
	const { main: weatherMain, description } = weather[0]

	const getIcon = (weatherMain: string) => {
		switch (weatherMain) {
			case "Drizzle":
				return <CloudDrizzle size={25} />
			case "Rain":
				return <CloudRain size={25} />
			case "Thunderstorm":
				return <CloudRain size={25} />
			case "Snow":
				return <Snowflake size={25} />
			case "Clear":
				return <CloudSun size={25} />
			case "Clouds":
				return <Cloudy size={25} />
			default:
				return <CloudSun size={25} />
		}
	}

	return (
		<section className="flex flex-col justify-between p-4">
			<p className="flex items-center justify-between">
				<span className="font-medium">{currentDate}</span>
				<span className="font-medium">{localTime}</span>
			</p>
			<p className="flex gap-1 pt-2 font-bold">
				<span>{name}</span>
				<span>
					<Navigation size={15} />
				</span>
			</p>
			<p className="self-center py-10 text-9xl font-bold">{temp}°</p>
			<div>
				<div>
					<span>{getIcon(weatherMain)}</span>
					<p className="pt-2 text-lg font-medium capitalize">{description}</p>
				</div>
				<p className="flex items-center gap-2">
					<span>Low: {minTemp}°</span>
					<span>High: {maxTemp}°</span>
				</p>
			</div>
		</section>
	)
}
