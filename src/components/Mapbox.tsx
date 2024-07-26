import "leaflet/dist/leaflet.css"
import dynamic from "next/dynamic"
import { useEffect } from "react"
import { useMap } from "react-leaflet"
import { useGlobalContext } from "./GlobalContext"

const MapContainer = dynamic(() => import("react-leaflet").then((module) => module.MapContainer), {
	ssr: false, // Disable server-side rendering for this MapContainer component
})
const TileLayer = dynamic(() => import("react-leaflet").then((module) => module.TileLayer), {
	ssr: false, // Disable server-side rendering for this TileLayer component
})

function FlyToActiveCity({ activeCityCords }) {
	const map = useMap()

	useEffect(() => {
		if (activeCityCords) {
			const zoomLev = 13
			const flyToOptions = {
				duration: 1.5,
			}

			map.flyTo([activeCityCords.lat, activeCityCords.lon], zoomLev, flyToOptions)
		}
	}, [activeCityCords, map])

	return null
}

export default function Mapbox() {
	const { forecast } = useGlobalContext()

	const activeCityCords = forecast?.coord

	if (!forecast || !forecast.coord) {
		return <strong>Loading Map</strong>
	}

	return (
		<section className="flex-1 basis-[50%]">
			<MapContainer
				zoom={10}
				center={[activeCityCords.lat, activeCityCords.lon]}
				style={{ height: "calc(100% - 2rem)", width: "calc(100% - 2rem)", margin: "1rem", borderRadius: "0.25rem" }}
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
				/>
				<FlyToActiveCity activeCityCords={activeCityCords} />
			</MapContainer>
		</section>
	)
}
