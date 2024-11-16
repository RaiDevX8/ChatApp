import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import logo from "@/assets/marker.png";

interface Coordinates {
  lat: number;
  lon: number;
}

interface MapProps {
  coordinates: Coordinates | null;
}

const Map = ({ coordinates }: MapProps) => {
  const MapViewUpdater = () => {
    const map = useMap();
    if (coordinates) {
      map.setView([coordinates.lat, coordinates.lon], 10);
    }
    return null;
  };

  // Custom icon definition
  const customIcon = new L.Icon({
    iconUrl: logo,
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35],
  });

  return (
    <div className="w-full h-96">
      {coordinates?.lat !== undefined && coordinates?.lon !== undefined ? (
        <MapContainer style={{ height: "100%", width: "100%", zIndex: 49 }}>
          <MapViewUpdater />
          {/* Base map layer */}
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Weather forecast layer from OpenWeatherMap */}
          <TileLayer
            url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`}
            opacity={0.5} // Adjust opacity for better visibility
          />

          {/* Precipitation layer */}
          <TileLayer
            url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`}
            opacity={0.4}
          />

          {/* Clouds layer */}
          <TileLayer
            url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`}
            opacity={0.3}
          />

          <Marker position={[coordinates.lat, coordinates.lon]} icon={customIcon}>
            <Popup>Your Location</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default Map;
