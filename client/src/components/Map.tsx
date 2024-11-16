import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import logo from "@/assets/marker.png"
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
    iconUrl: logo, // URL to custom marker icon
    iconSize: [35, 35], // Custom icon size
    iconAnchor: [17, 35], // Anchor the icon to the center-bottom
    popupAnchor: [0, -35], // Popup position relative to the icon
    shadowSize: [50, 64], // Custom shadow size
    shadowAnchor: [22, 64] // Custom shadow anchor
  });

  return (
    <div className="w-full h-96">
      {coordinates?.lat !== undefined && coordinates?.lon !== undefined ? (
        <MapContainer style={{ height: "100%", width: "100%" , zIndex:49 }}>
          <MapViewUpdater />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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
