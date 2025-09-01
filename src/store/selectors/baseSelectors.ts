import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { parseSiriVehicles } from "../../utils/parseSiriVehicles";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { point } from "@turf/helpers";

const basicStoreSelector = (state: RootState) => state.base;

export const municipalityDataSelector = createSelector(
  [basicStoreSelector],
  (basicStoreSelector) => basicStoreSelector.municipalityData
);

export const municipalityNamesSelector = createSelector(
  [municipalityDataSelector],
  (data) => {
    if (!data || !data.features) return [];
    const names = data.features
      .map(
        (feature: any) =>
          feature.properties.name ||
          feature.properties.NAME ||
          feature.properties.LocNameHeb
      )
      .filter((name: any) => name)
      .sort();
    return [...new Set(names)] as string[];
  }
);

export const selectedMunicipalitySelector = createSelector(
  [basicStoreSelector],
  (basicStoreSelector) => basicStoreSelector.selectedMunicipality
);

export const selectedMunicipalityData = createSelector(
  [municipalityDataSelector, selectedMunicipalitySelector],
  (municipalityData, selectedMunicipality) => {
    const features = municipalityData?.features ?? [];
    return features.find(
      (feature: any) => feature?.properties?.LocNameHeb === selectedMunicipality
    );
  }
);

export const bucketDataSelector = createSelector(
  [basicStoreSelector],
  (basicStoreSelector) => basicStoreSelector.bucketData
);

export const siriKeysSelector = createSelector(
  [bucketDataSelector],
  (bucketData) => {
    if (!bucketData) return [];

    const keyRegex = /<Key>(siri-data\/\d+\.json)<\/Key>/g;
    const keys = [];
    let match;

    while ((match = keyRegex.exec(bucketData)) !== null) {
      const fileName = match[1].split("/")[1];
      keys.push(fileName.split(".")[0]);
    }

    return keys;
  }
);

export const selectedTimeSelector = createSelector(
  [basicStoreSelector],
  (basicStoreSelector) => basicStoreSelector.selectedTime
);

export const monitoredVehiclesSelector = createSelector(
  [basicStoreSelector],
  (basicStoreSelector) => basicStoreSelector.monitoredVehicles
);

export const monitoredVehiclesByKeySelector = createSelector(
  [monitoredVehiclesSelector, selectedTimeSelector],
  (monitoredVehicles, selectedTime): any[] =>
    monitoredVehicles[selectedTime] || []
);

export const FilteredVehiclesSelector = createSelector(
  [monitoredVehiclesByKeySelector, selectedMunicipalityData],
  (monitoredVehicles, selectedMunicipality): any[] => {
    const validVehicles = parseSiriVehicles(monitoredVehicles);
    if (!selectedMunicipality) return validVehicles;
    const filteredVehicles = validVehicles.filter((vehicle) => {
      const lat = Number(vehicle.lat);
      const lng = Number(vehicle.lng);
      
      if (!isFinite(lat) || !isFinite(lng)) {
        console.warn('Invalid coordinates for vehicle:', vehicle);
        return false;
      }
      
      try {
        const vehiclePoint = point([lng, lat]);
        return booleanPointInPolygon(vehiclePoint, selectedMunicipality as any);
      } catch (error) {
        console.warn('Error checking point in polygon for vehicle:', vehicle, error);
        return false;
      }
    });
    
    console.log(`Total vehicles: ${validVehicles.length}, Filtered: ${filteredVehicles.length}`);
    
    return filteredVehicles;
  }
);
