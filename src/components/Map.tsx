import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { Vehicle } from "../utils/interfaces";
import { generateSampleVehicles } from "../utils/generateVehicles";
import MapPopup from "./MapPopup";

export default function Map() {
  const center: LatLngExpression = [32.0853, 34.7818];
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    setVehicles(generateSampleVehicles(1));
  }, []);

  return (
    <div className="map-container">
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: "750px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {vehicles.map((vehicle) => (
          <Marker key={vehicle.id} position={[vehicle.lat, vehicle.lng]}>
            <MapPopup {...vehicle} />
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
