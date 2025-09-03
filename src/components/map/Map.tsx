import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, GeoJSON } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import MapPopup from "./MapPopup";
import { useDispatch, useSelector } from "react-redux";
import {
  FilteredVehiclesSelector,
  isPlayAnimationSelector,
  municipalityDataSelector,
  nextSiriKeySelector,
  selectedMunicipalitySelector,
  timeTillNextSiriDataSelector,
} from "../../store/selectors/baseSelectors";
import { setDisplayedTime } from "../../store/slices/baseSlice";
import { useLazyGetSiriDataByKeyQuery } from "../../store/slices/eliabsApi";

export default function Map() {
  const center: LatLngExpression = [32.0853, 34.7818];
  const [vehicles, setVehicles] = useState<any[]>([]);
  const MAP_STYLE = useMemo(() => ({ height: "600px", width: "100%" }), []);

  const dispatch = useDispatch();
  const municipalityData = useSelector(municipalityDataSelector);
  const selectedMunicipality = useSelector(selectedMunicipalitySelector);
  const monitoredVehicles = useSelector(FilteredVehiclesSelector);
  const timeTillNextSiriData = useSelector(timeTillNextSiriDataSelector);
  const nextSiriKey = useSelector(nextSiriKeySelector);
  const isPlayingAnumation = useSelector(isPlayAnimationSelector);
  const [getSiriData] = useLazyGetSiriDataByKeyQuery();

  useEffect(() => {
    setVehicles(monitoredVehicles);
  }, [monitoredVehicles]);

  const getNextSiriData = async (key: string) => {
    try {
      console.log("getNextSiriData" + key);
      await getSiriData(key);
    } catch (error) {
      console.error("Error loading SIRI data:", error);
    }
  };

  useEffect(() => {
    let timer: any;
    if (isPlayingAnumation && nextSiriKey) {
      getNextSiriData(nextSiriKey);
      if (timeTillNextSiriData) {
        timer = setTimeout(() => {
          dispatch(setDisplayedTime(nextSiriKey));
        }, (timeTillNextSiriData * 1000) / 4); // Speed up the animation by 4 times
      }
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [dispatch, timeTillNextSiriData, isPlayingAnumation, nextSiriKey]);

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
