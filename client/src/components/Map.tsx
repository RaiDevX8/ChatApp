import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";

interface typesP{
  lat:number,
  lon:number
}
const Map = ({coordinates}:typesP) => {
    console.log(coordinates)
    const MapViewUpdater = () => {
        const map = useMap();
        if (coordinates) {
          map.setView([coordinates.lat, coordinates.lon], 10);
        }
        return null;
      };
  return (
    <div className="w-full h-96 ">
    {coordinates?.lat !== undefined && coordinates?.lon !== undefined ? (
      <MapContainer
        center  ={[coordinates.lat, coordinates.lon]}
        zoom={10}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%",zIndex:49 }}
      >
        <MapViewUpdater />
        {/* Base Map Layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Weather Overlays */}
        <TileLayer
          url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`}
          opacity={0.6}
          zIndex={5}
        />
        <TileLayer
          url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`}
          opacity={0.3}
          zIndex={6}
        />
        <Marker position={[coordinates.lat, coordinates.lon]}>
          <Popup>Your Location</Popup>
        </Marker>
      </MapContainer>
    ) : (
      <p>Loading map...</p>
    )}
  </div>
  )
}

export default Map