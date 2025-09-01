import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { eliabsApi } from "./eliabsApi";
import { IMunicipalityData } from "../../utils/interfaces";

interface IBasicStore {
  bucketData?: any;
  municipalityData: IMunicipalityData | null;
  selectedMunicipality?: string;
  selectedTime?: any;
  animatedTime?: any;
  monitoredVehicles: Record<string, any[]>;
}

const initialState: IBasicStore = {
  bucketData: null,
  municipalityData: null,
  monitoredVehicles: {},
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        eliabsApi.endpoints.getBucket.matchFulfilled,
        (state, { payload }) => {
          console.log("Payload from getBucket:", payload);
          state.bucketData = payload;
        }
      )
      .addMatcher(
        eliabsApi.endpoints.getMunicipalityData.matchFulfilled,
        (state, { payload }) => {
          console.log("Payload from getMunicipalityData:", payload);
          state.municipalityData = payload;
        }
      )
      .addMatcher(
        eliabsApi.endpoints.getSiriDataByKey.matchFulfilled,
        (state, { payload }) => {
          const key = state.selectedTime;
          const { MonitoredStopVisit } =
            payload?.Siri?.ServiceDelivery?.StopMonitoringDelivery[0] || [];
          state.monitoredVehicles = { [key]: MonitoredStopVisit };
        }
      );
  },
});

export const { setSelectedMunicipality, setSelectedTime } = basicSlice.actions;
export default basicSlice.reducer;
