import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://test.api.amadeus.com/",
  }),
  tagTypes: ["flight"],
  endpoints: (builder) => ({}),
});
