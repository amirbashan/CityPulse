import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, GeoJSON } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import MapPopup from "./MapPopup";
import { useSelector } from "react-redux";
import {
  FilteredVehiclesSelector,
  municipalityDataSelector,
  selectedMunicipalitySelector,
} from "../../store/selectors/baseSelectors";

export default function Map() {
  const center: LatLngExpression = [32.0853, 34.7818];
  const [vehicles, setVehicles] = useState<any[]>([]);
  const MAP_STYLE = useMemo(() => ({ height: "650px", width: "100%" }), []);

  const municipalityData = useSelector(municipalityDataSelector);
  const selectedMunicipality = useSelector(selectedMunicipalitySelector);
  const monitoredVehicles = useSelector(FilteredVehiclesSelector);

  useEffect(() => {
    setVehicles(monitoredVehicles);
  }, [monitoredVehicles]);

  const municipalityStyle = useMemo(() => {
    return (feature: any) => {
      const isSelected =
        selectedMunicipality &&
        feature.properties.LocNameHeb === selectedMunicipality;

      return {
        fillColor: isSelected ? "#3B82F6" : "transparent",
        weight: 2,
        opacity: 0.8,
        color: isSelected ? "#1E40AF" : "#6B7280",
        fillOpacity: isSelected ? 0.2 : 0,
      };
    };
  }, [selectedMunicipality]);

  return (
    <div className="map-container">
      <MapContainer center={center} zoom={12} style={MAP_STYLE}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {municipalityData && (
          <GeoJSON data={municipalityData} style={municipalityStyle} />
        )}

        {vehicles.map((vehicle) => (
          <Marker key={vehicle.id} position={[vehicle.lat, vehicle.lng]}>
            <MapPopup {...vehicle} />
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
