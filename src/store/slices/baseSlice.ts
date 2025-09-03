import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { eliabsApi } from "./eliabsApi";
import { IMunicipalityData } from "../../utils/interfaces";

interface IBasicStore {
  bucketData?: any;
  municipalityData: IMunicipalityData | null;
  selectedMunicipality?: string;
  selectedTime?: any;
  monitoredVehicles: Record<string, any[]>;
  isPlayAnimation: boolean;
  displayedTime?: any;
}

const initialState: IBasicStore = {
  bucketData: null,
  municipalityData: null,
  monitoredVehicles: {},
  isPlayAnimation: false,
};

const basicSlice = createSlice({
  name: "basic",
  initialState,
  reducers: {
    setSelectedMunicipality(state, action: PayloadAction<string>) {
      state.selectedMunicipality = action.payload;
    },
    setSelectedTime(state, action: PayloadAction<any>) {
      state.selectedTime = action.payload;
      state.displayedTime = state.selectedTime;
      state.isPlayAnimation = false;
    },
    setDisplayedTime(state, action: PayloadAction<any>) {
      state.displayedTime = action.payload;
    },
    playAnimation(state) {
      if (!state.displayedTime) state.displayedTime = state.selectedTime;
      state.isPlayAnimation = true;
    },
    pauseAnimation(state) {
      state.isPlayAnimation = !state.isPlayAnimation;
    },
    stopAnimation(state) {
      state.displayedTime = state.selectedTime;
      state.isPlayAnimation = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        eliabsApi.endpoints.getBucket.matchFulfilled,
        (state, { payload }) => {
          state.bucketData = payload;
        }
      )
      .addMatcher(
        eliabsApi.endpoints.getMunicipalityData.matchFulfilled,
        (state, { payload }) => {
          state.municipalityData = payload;
        }
      )
      .addMatcher(
        eliabsApi.endpoints.getSiriDataByKey.matchFulfilled,
        (state, { payload, meta }) => {
          const key = meta.arg.originalArgs;
          const stopMonitoringDelivery =
            payload?.Siri?.ServiceDelivery?.StopMonitoringDelivery?.[0];
          const monitoredStopVisit =
            stopMonitoringDelivery?.MonitoredStopVisit || [];

          state.monitoredVehicles[key] = monitoredStopVisit;
        }
      );
  },
});

export const {
  setSelectedMunicipality,
  setSelectedTime,
  setDisplayedTime,
  playAnimation,
  pauseAnimation,
  stopAnimation,
} = basicSlice.actions;
export default basicSlice.reducer;
