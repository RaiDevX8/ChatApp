import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

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

  return (
    <div className="w-full h-96">
      {coordinates?.lat !== undefined && coordinates?.lon !== undefined ? (
        <MapContainer style={{ height: "100%", width: "100%", zIndex: 49 }}>
          <MapViewUpdater />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <TileLayer
            url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`}
          />
          <TileLayer
            url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`}
          />
          {/* Marker with default icon */}
          <Marker position={[coordinates.lat, coordinates.lon]}>
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
