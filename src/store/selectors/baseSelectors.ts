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

export const displayedTimeSelector = createSelector(
  [basicStoreSelector],
  (basicStoreSelector) => basicStoreSelector.displayedTime
);

export const isPlayAnimationSelector = createSelector(
  [basicStoreSelector],
  (basicStoreSelector) => basicStoreSelector.isPlayAnimation
);

export const monitoredVehiclesSelector = createSelector(
  [basicStoreSelector],
  (basicStoreSelector) => {
    return basicStoreSelector.monitoredVehicles;
  }
);

export const extraFiltersSelector = createSelector(
  [basicStoreSelector],
  (basicStoreSelector) => {
    return basicStoreSelector.extraFilters;
  }
);

export const nextSiriKeySelector = createSelector(
  [siriKeysSelector, displayedTimeSelector],
  (siriKeysArray, displayedTime): string | null => {
    if (siriKeysArray.length === 0 || !displayedTime) return null;
    const currentIndex = siriKeysArray.indexOf(displayedTime);
    if (currentIndex === -1 || currentIndex === siriKeysArray.length - 1)
      return null;
    return siriKeysArray[currentIndex + 1];
  }
);

export const timeTillNextSiriDataSelector = createSelector(
  [nextSiriKeySelector, displayedTimeSelector],
  (nextSiriKey, displayedTime): number | null => {
    if (!nextSiriKey || !displayedTime) return null;
    return Number(nextSiriKey) - Number(displayedTime);
  }
);

export const monitoredVehiclesByKeySelector = createSelector(
  [monitoredVehiclesSelector, displayedTimeSelector],
  (monitoredVehicles, displayedTime): any[] => {
    return monitoredVehicles[displayedTime] || [];
  }
);

export const FilteredVehiclesSelector = createSelector(
  [
    monitoredVehiclesByKeySelector,
    selectedMunicipalityData,
    extraFiltersSelector,
  ],
  (monitoredVehicles, selectedMunicipality, extraFilters): any[] => {
    const validVehicles = parseSiriVehicles(monitoredVehicles);
    if (!selectedMunicipality) return validVehicles;
    let filteredVehicles = validVehicles.filter((vehicle) => {
      const lat = Number(vehicle.lat);
      const lng = Number(vehicle.lng);

      if (!isFinite(lat) || !isFinite(lng)) {
        console.warn("Invalid coordinates for vehicle:", vehicle);
        return false;
      }

      try {
        const vehiclePoint = point([lng, lat]);
        return booleanPointInPolygon(vehiclePoint, selectedMunicipality as any);
      } catch (error) {
        console.warn(
          "Error checking point in polygon for vehicle:",
          vehicle,
          error
        );
        return false;
      }
    });
    const { minSpeed, route, operator } = extraFilters;
    if (minSpeed) {
      filteredVehicles = filteredVehicles.filter(
        (v) => Number(v.speed) >= Number(minSpeed)
      );
    }

    if (route) {
      filteredVehicles = filteredVehicles.filter(
        (v) => v.route && String(v.route).includes(String(route))
      );
    }

    if (operator) {
      filteredVehicles = filteredVehicles.filter(
        (v) => v.operator && String(v.operator).includes(String(operator))
      );
    }
    return filteredVehicles;
  }
);
