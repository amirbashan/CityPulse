import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMunicipalityData } from "../../utils/interfaces";

export const eliabsApi = createApi({
  reducerPath: "eliabsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/data",
    responseHandler: async (response) => {
      const text = await response.text();
      try {
        return JSON.parse(text);
      } catch {
        return text;
      }
    },
  }),
  endpoints: (builder) => ({
    getBucket: builder.query<string, void>({
      query: () => "",
    }),
    getMunicipalityData: builder.query<IMunicipalityData, void>({
      query: () => "municipalities_multi.geojson",
    }),
    getSiriDataByKey: builder.query<any, string>({
      query: (filename) => `siri-data/${filename}.json`,
    }),
  }),
});

export const { useGetBucketQuery, useGetMunicipalityDataQuery, useLazyGetSiriDataByKeyQuery } = eliabsApi;
