import { apiSlice } from "../api/apiSlice";

export const flightsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFlights: builder.query({
      query: ({ origin, location, date, rDate, passengers, accessToken }) => ({
        url: `/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${location}&departureDate=${date}${
          rDate ? `&returnDate=${rDate}` : ""
        }&adults=${passengers}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.amadeus+json",
        },
      }),
      providesTags: ["flight"],
    }),
    postFlight: builder.mutation({
      query: (data) => ({
        url: "/v1/security/oauth2/token",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(data),
      }),
      invalidatesTags: ["flight"],
    }),
  }),
});
export const { useGetFlightsQuery, usePostFlightMutation } = flightsApi;
