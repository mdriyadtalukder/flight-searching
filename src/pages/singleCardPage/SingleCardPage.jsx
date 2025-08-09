import React, { use } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import useAccessToken from "../../hooks/useAccessToken";
import { useGetFlightsQuery } from "../../rtk-query/features/flights/flightsApi";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  Plane,
  Clock,
  MapPin,
  ArrowLeft,
  Luggage,
  Users,
  Calendar,
  CreditCard,
  Utensils,
} from "lucide-react";
import Loading from "../../components/Loading";

const SingleCardPage = () => {
  const { id } = useParams();
  const { origin, destination, departureDate, returnDate, passengers } =
    useSelector((state) => state?.flights);
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
  console.log(data?.data);

  let flightData;
  if (isLoading) return <Loading isLoad={isLoading}></Loading>;
  if (!isLoading && isError) return <p>{err?.message}</p>;
  if (!isLoading && !isError && data?.data?.length === 0)
    flightData = <p>No data</p>;
  if (!isLoading && !isError && data?.data?.length > 0) {
    flightData = data?.data?.find((d) => String(d?.id) === String(id));
  }
  console.log("Single Card Data:", flightData);

  const itinerary = flightData?.itineraries[0];
  const segments = itinerary?.segments;
  const departure = segments[0]?.departure;
  const arrival = segments[segments?.length - 1]?.arrival;
  const numberOfStops = segments?.length - 1;
  const totalPrice = flightData?.price.total;
  const currency = flightData?.price?.currency;

  const formatTime = (isoString) => {
    return new Date(isoString)?.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (isoString) => {
    return new Date(isoString)?.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDuration = (duration) => {
    const match = duration?.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    if (!match) return duration;
    const hours = match[1] ? Number?.parseInt(match[1]) : 0;
    const minutes = match[2] ? Number?.parseInt(match[2]) : 0;
    return `${hours}h ${minutes}m`;
  };

  const getAmenityIcon = (amenityType) => {
    switch (amenityType) {
      case "BAGGAGE":
        return <Luggage className="w-5 h-5 text-purple-600" />;
      case "PRE_RESERVED_SEAT":
        return <Users className="w-5 h-5 text-purple-600" />;
      case "MEAL":
        return <Utensils className="w-5 h-5 text-purple-600" />;
      default:
        return <CreditCard className="w-5 h-5 text-purple-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-purple-100 to-blue-200 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <Link
            variant="ghost"
            to={"/flights"}
            className="text-purple-600 hover:text-purple-700 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Results</span>
          </Link>
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-1">
              Flight Details
            </h1>
            <p className="text-sm text-gray-500">
              Flight ID: <span className="font-semibold">{flightData?.id}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-lg border-0 bg-white/90">
              <CardHeader>
                <CardTitle className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-tr from-purple-200 to-blue-200 rounded-full flex items-center justify-center shadow">
                    <Plane className="w-7 h-7 text-purple-700" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-purple-800">
                      {flightData?.validatingAirlineCodes[0]}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {numberOfStops === 0
                        ? "Direct Flight"
                        : `${numberOfStops} Stop${
                            numberOfStops > 1 ? "s" : ""
                          }`}
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-8">
                  <div className="text-left">
                    <p className="text-4xl font-extrabold text-gray-900">
                      {formatTime(departure?.at)}
                    </p>
                    <p className="text-base text-gray-500">
                      {formatDate(departure?.at)}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <MapPin className="w-4 h-4 text-purple-400" />
                      <span className="text-base font-medium text-gray-700">
                        {departure?.iataCode}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Terminal {departure?.terminal}
                    </p>
                  </div>

                  <div className="flex-1 flex flex-col items-center px-8">
                    <div className="flex items-center gap-2 text-base text-gray-500 mb-2">
                      <Clock className="w-5 h-5" />
                      <span>{formatDuration(itinerary?.duration)}</span>
                    </div>
                    <div className="w-full relative">
                      <div className="h-1 bg-gradient-to-r from-purple-200 via-purple-400 to-blue-200 w-full rounded"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Plane className="w-6 h-6 text-purple-500 rotate-90" />
                      </div>
                    </div>
                    <p className="text-xs text-purple-600 mt-3 font-semibold tracking-wide uppercase">
                      {numberOfStops === 0
                        ? "Non-stop"
                        : `${numberOfStops} stop${
                            numberOfStops > 1 ? "s" : ""
                          }`}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-4xl font-extrabold text-gray-900">
                      {formatTime(arrival?.at)}
                    </p>
                    <p className="text-base text-gray-500">
                      {formatDate(arrival?.at)}
                    </p>
                    <div className="flex items-center justify-end gap-1 mt-2">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span className="text-base font-medium text-gray-700">
                        {arrival?.iataCode}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Terminal {arrival?.terminal}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow border-0 bg-white/90">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-purple-800">
                  Flight Segments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {segments?.map((segment, index) => (
                  <div
                    key={segment?.id}
                    className="border rounded-xl p-5 bg-gradient-to-tr from-purple-200 to-blue-100 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="outline"
                          className="text-purple-700 border-purple-200 bg-white"
                        >
                          {segment?.carrierCode} {segment?.number}
                        </Badge>
                        <span className="text-sm text-gray-600">
                          Aircraft:{" "}
                          <span className="font-medium">
                            {segment?.aircraft?.code}
                          </span>
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 font-semibold">
                        {formatDuration(segment?.duration)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs text-gray-500 uppercase">
                          Departure
                        </p>
                        <p className="font-semibold text-lg text-purple-800">
                          {formatTime(segment?.departure?.at)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {segment?.departure?.iataCode}
                        </p>
                        <p className="text-xs text-gray-400">
                          Terminal {segment?.departure?.terminal}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase">
                          Arrival
                        </p>
                        <p className="font-semibold text-lg text-blue-800">
                          {formatTime(segment?.arrival?.at)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {segment?.arrival?.iataCode}
                        </p>
                        <p className="text-xs text-gray-400">
                          Terminal {segment?.arrival?.terminal}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow border-0 bg-white/90">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-purple-800">
                  Services & Amenities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {flightData?.travelerPricings[0]?.fareDetailsBySegment[0]?.amenities?.map(
                    (amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 bg-gradient-to-tr from-purple-200 to-blue-100 rounded-xl shadow-sm"
                      >
                        {getAmenityIcon(amenity?.amenityType)}
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {amenity?.description}
                          </p>
                          <p
                            className={`text-xs ${
                              amenity?.isChargeable
                                ? "text-red-500"
                                : "text-green-600"
                            } font-medium`}
                          >
                            {amenity?.isChargeable
                              ? "Additional fee applies"
                              : "Included"}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow border-0 bg-white/90">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-purple-800">
                  Baggage Allowance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {flightData?.travelerPricings[0]?.fareDetailsBySegment?.map(
                    (segment, index) => (
                      <div
                        key={index}
                        className="border rounded-xl p-5 bg-gradient-to-tr from-blue-100 to-purple-200 shadow-sm"
                      >
                        <h4 className="font-semibold mb-2 text-purple-700">
                          Segment {index + 1} - {segment?.cabin}
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500">
                              Checked Baggage
                            </p>
                            <p className="font-medium text-gray-800">
                              {segment?.includedCheckedBags?.weight}{" "}
                              {segment?.includedCheckedBags?.weightUnit}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">
                              Cabin Baggage
                            </p>
                            <p className="font-medium text-gray-800">
                              {segment?.includedCabinBags?.weight
                                ? `${segment?.includedCabinBags?.weight} ${segment?.includedCabinBags?.weightUnit}`
                                : `${segment?.includedCabinBags?.quantity} piece`}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 flex gap-2">
                          {segment?.brandedFareLabel && (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-purple-100 text-purple-700"
                            >
                              {segment?.brandedFareLabel}
                            </Badge>
                          )}
                          <Badge
                            variant="outline"
                            className="text-xs border-purple-200 text-purple-700"
                          >
                            Class {segment?.class}
                          </Badge>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="shadow-xl border-0 bg-gradient-to-br from-purple-300 to-blue-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-purple-800">
                  Price Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <p className="text-4xl font-extrabold text-purple-700">
                    {currency} {totalPrice}
                  </p>
                  <p className="text-sm text-gray-500">
                    per{" "}
                    {flightData?.travelerPricings[0]?.travelerType?.toLowerCase()}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-purple-200">
                  <div className="flex justify-between text-sm">
                    <span>Base Price</span>
                    <span>
                      {currency} {flightData?.price?.base}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Taxes & Fees</span>
                    <span>
                      {currency}{" "}
                      {(
                        Number?.parseFloat(totalPrice) -
                        Number?.parseFloat(flightData?.price?.base)
                      )?.toFixed(2)}
                    </span>
                  </div>
                  {flightData?.price?.fees?.map((fee, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-xs text-gray-500"
                    >
                      <span>{fee?.type} Fee</span>
                      <span>
                        {currency} {fee?.amount}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between font-semibold pt-2 border-t border-purple-200">
                    <span>Grand Total</span>
                    <span>
                      {currency} {flightData?.price?.grandTotal}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow border-0 bg-white/90">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-purple-800">
                  Flight Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <span>
                    Booking deadline:{" "}
                    <span className="font-semibold">
                      {formatDate(flightData?.lastTicketingDate)}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span>
                    <span className="font-semibold">
                      {flightData?.numberOfBookableSeats}
                    </span>{" "}
                    seats available
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Luggage className="w-4 h-4 text-purple-400" />
                  <span>
                    Source:{" "}
                    <span className="font-semibold">{flightData?.source}</span>
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  <Badge
                    variant="outline"
                    className="text-purple-700 border-purple-200 bg-white"
                  >
                    {flightData?.travelerPricings[0]?.fareOption}
                  </Badge>
                  <div className="flex gap-2 flex-wrap"></div>
                  {flightData?.pricingOptions?.fareType?.map((type, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs bg-purple-100 text-purple-700"
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCardPage;
