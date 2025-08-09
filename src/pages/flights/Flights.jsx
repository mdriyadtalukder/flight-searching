import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetFlightsQuery,
  usePostFlightMutation,
} from "../../rtk-query/features/flights/flightsApi";
import FlightCard from "../../components/FlightCard";
import useAccessToken from "../../hooks/useAccessToken";
import Loading from "../../components/Loading";
import { SearchBox } from "../../components/SearchBox";

const Flights = () => {
  const { origin, destination, departureDate, returnDate, passengers } =
    useSelector((state) => state.flights);
  const { token, error, isLoading: load } = useAccessToken();

  const {
    data,
    isLoading,
    isError,
    error: err,
  } = useGetFlightsQuery({
    origin: origin,
    location: destination,
    date: departureDate,
    rDate: returnDate,
    passengers: 1,
    accessToken: token,
  });
  console.log(origin, destination, departureDate, returnDate, passengers);
  console.log("Token:", token);
  console.log(data?.data);

  let content = null;
  if (isLoading) content = <Loading isLoad={isLoading}></Loading>;
  if (!isLoading && isError) content = <p>{err?.message}</p>;
  if (!isLoading && !isError && data?.data?.length === 0)
    content = <p>No data</p>;
  if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data?.map((d, idx) => (
      <FlightCard d={d} key={idx}></FlightCard>
    ));
  }

  return (
    <div className="min-h-screen bg-purple-200 p-4 lg:p-6">
      <SearchBox></SearchBox>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Flight Search Results
          </h1>
          <p className="text-gray-600">
            Found {data?.data?.length || 0}{" "}
            {data?.data?.length > 1 ? "flights" : "flight"} for your search
          </p>
        </div>

        {/* Responsive Grid - 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {content}
        </div>

        {/* Load More Button */}
      </div>
    </div>
  );
};

export default Flights;
