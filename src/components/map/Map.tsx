import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, GeoJSON } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { IVehicle } from "../../utils/interfaces";
import { generateSampleVehicles } from "../../utils/generateVehicles";
import MapPopup from "./MapPopup";
import { useGetBucketQuery } from "../../store/slices/eliabsApi";
import { useSelector } from "react-redux";
import {
  municipalityDataSelector,
  selectedMunicipalitySelector,
} from "../../store/selectors/baseSelectors";

export default function Map() {
  const center: LatLngExpression = [32.0853, 34.7818];
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);

  useGetBucketQuery();
  const municipalityData = useSelector(municipalityDataSelector);
  const selectedMunicipality = useSelector(selectedMunicipalitySelector);

  useEffect(() => {
    setVehicles(generateSampleVehicles(25));
  }, []);

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
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: "650px", width: "100%" }}
      >
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
