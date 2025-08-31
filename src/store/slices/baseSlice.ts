import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { eliabsApi } from "./eliabsApi";
import { IMunicipalityData } from "../../utils/interfaces";

interface IBasicStore {
  bucketData?: any;
  municipalityData: IMunicipalityData | null;
  selectedMunicipality?: string;
}

const initialState: IBasicStore = {
  bucketData: null,
  municipalityData: null,
};

const basicSlice = createSlice({
  name: "basic",
  initialState,
  reducers: {
    setSelectedMunicipality(state, action: PayloadAction<string>) {
      state.selectedMunicipality = action.payload;
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
      );
  },
});

export const { setSelectedMunicipality } = basicSlice.actions;
export default basicSlice.reducer;
