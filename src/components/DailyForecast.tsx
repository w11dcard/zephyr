"use client"

import { kelvinToCelsius } from "@/src/lib/helperConversions"
import { CloudDrizzle, CloudRain, CloudSun, Cloudy, Snowflake, ThermometerSunIcon } from "lucide-react"
import moment from "moment"
import { useGlobalContext } from "./GlobalContext"
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel"
import { Skeleton } from "./ui/skeleton"

export default function DailyForecast() {
	const { forecast = {}, fiveDayForecast = {} } = useGlobalContext()

	const { weather = [] } = forecast
	const { city = {}, list = [] } = fiveDayForecast

	if (!city.name || !list.length || !weather.length) {
		return <Skeleton className="h-48 w-full" />
	}

	const today = new Date()
	const todayString = today.toISOString().split("T")[0] ?? ""
	const { main: weatherMain } = weather[0]

	const todaysForecast = list.filter((forecast: { dt_txt: string; main: { temp: number } }) => {
		return forecast.dt_txt.startsWith(todayString)
	})

	const getIcon = (weatherMain: any) => {
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
		<section className="col-span-full flex h-48 flex-col gap-5 p-5 md:col-span-2 xl:col-span-2">
			<h2 className="flex items-center gap-2 font-medium">
				<ThermometerSunIcon size={20} /> Daily Forecast
			</h2>

			<div className="flex flex-col justify-center gap-6 overflow-hidden">
				{todaysForecast.length < 1 ? (
					<h1 className="font-semibold">No data available</h1>
				) : (
					<Carousel className="w-full">
						<CarouselContent>
							{todaysForecast.map((forecast: { dt_txt: string; main: { temp: number } }) => (
								<CarouselItem className="flex basis-32 cursor-grab flex-col items-center gap-2" key={forecast.dt_txt}>
									<p className="text-muted-foreground">{moment(forecast.dt_txt).format("hh:mm")}</p>
									{getIcon(weatherMain)}
									<p className="font-semibold">{kelvinToCelsius(forecast.main.temp)}° C</p>
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				)}
			</div>
		</section>
	)
}
