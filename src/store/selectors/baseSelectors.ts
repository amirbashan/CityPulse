import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

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
        keys.push(match[1].split('/')[1]);
      }
      
      return keys;
    }
  );
