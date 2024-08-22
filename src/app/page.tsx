"use client"

import AirQuality from "../components/AirQuality"
import DailyForecast from "../components/DailyForecast"
import FeelsLike from "../components/FeelsLike"
import { useGlobalContextUpdate } from "../components/GlobalContext"
import Humidity from "../components/Humidity"
import Mapbox from "../components/Mapbox"
import Precipitation from "../components/Precipitation"
import Pressure from "../components/Pressure"
import Sunset from "../components/Sunset"
import Temperature from "../components/Temperature"
import TopNav from "../components/TopNav"
import UvIndex from "../components/UvIndex"
import Visibility from "../components/Visibility"
import WeeklyForecast from "../components/WeeklyForecast"
import Wind from "../components/Wind"
import { defaultLocations } from "../lib/defaultLocations"

export default function Home() {
	const { setActiveCityCoords, updateCityName } = useGlobalContextUpdate()

	const getClickedCityCoords = (latitude: number, longitude: number, cityName: string) => {
		setActiveCityCoords([latitude, longitude])
		updateCityName(cityName)

		window.scrollTo({
			top: 0,
			behavior: "smooth",
		})
	}

	return (
		<main className="m-auto mx-4 lg:mx-8 xl:mx-24 2xl:mx-64">
			<TopNav />

			<div className="flex flex-col gap-4 pb-4 md:flex-row">
				<div className="flex w-full min-w-72 flex-col gap-4 md:w-96">
					<Temperature />
					<WeeklyForecast />
				</div>

				<div className="flex w-full flex-col">
					<div className="sm-2:col-span-2 col-span-full grid gap-4 lg:grid-cols-3 xl:grid-cols-4">
						<FeelsLike />
						<DailyForecast />
						<Precipitation />
						<Humidity />
						<Wind />
						<Sunset />
						<UvIndex />
						<AirQuality />
						<Pressure />
						<Visibility />
					</div>

					<div className="mt-4 flex gap-4">
						<Mapbox />
						<div className="flex flex-col gap-3">
							<h2 className="flex items-center gap-2 font-medium">Top Cities</h2>
							{defaultLocations.map((location, index) => {
								return (
									<section
										key={index}
										onClick={() => {
											getClickedCityCoords(location.latitude, location.longitude, location.name)
										}}
										className="flex cursor-pointer flex-col gap-4"
									>
										<p className="p-4 text-center">{location.name}</p>
									</section>
								)
							})}
						</div>
					</div>
				</div>
			</div>

			<footer className="flex justify-center p-10">
				<p className="flex items-center gap-2 text-sm">
					Made by
					<a href="https://github.com/w11dcard" target="_blank" className="font-bold">
						w11dcard.
					</a>
				</p>
			</footer>
		</main>
	)
}
