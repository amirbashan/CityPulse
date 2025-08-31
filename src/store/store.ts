import { configureStore } from "@reduxjs/toolkit";
import baseReducer from "./slices/baseSlice";
import { eliabsApi } from "./slices/eliabsApi";

export const store = configureStore({
  reducer: {
    base: baseReducer,
    [eliabsApi.reducerPath]: eliabsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      eliabsApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
