import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Plane, Clock, MapPin, Plus } from "lucide-react";
import { Link } from "react-router-dom";
const FlightCard = ({ d }) => {
  const itinerary = d.itineraries[0];
  const segments = itinerary.segments;
  const departure = segments[0]?.departure;
  const arrival = segments[segments.length - 1]?.arrival;
  const numberOfStops = segments.length - 1;
  const totalPrice = d.price?.total;
  const currency = d.price?.currency;

  // Get unique airline codes from segments
  const airlineCodes = [
    ...new Set(segments.map((segment) => segment.carrierCode)),
  ];
  const hasMultipleAirlines = airlineCodes.length > 1;

  // Format time from ISO string
  const formatTime = (isoString) => {
    return new Date(isoString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  // Format date from ISO string
  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Calculate duration in a readable format
  const formatDuration = (duration) => {
    if (!duration) return "N/A";
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    if (!match) return duration;
    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    return `${hours}h ${minutes}m`;
  };

  return (
    <Card className="w-full h-full hover:shadow-lg transition-shadow duration-200 border-purple-100 flex flex-col">
      <CardContent className="p-4 flex-1 flex flex-col">
        {/* Header - Airlines and Price */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Plane className="w-6 h-6 text-purple-600" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1 flex-wrap">
                {airlineCodes.slice(0, 1).map((code) => (
                  <Badge
                    key={code}
                    variant="outline"
                    className="text-xs font-semibold border-purple-200 text-purple-700"
                  >
                    {code}
                  </Badge>
                ))}
                {airlineCodes.length > 1 && (
                  <Badge
                    variant="outline"
                    className="text-xs font-semibold border-purple-200 text-purple-700 flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    {airlineCodes.length - 1}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-gray-500 truncate">
                {hasMultipleAirlines ? "Multiple" : "Single"}
              </p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-2xl font-bold text-purple-600">
              {currency} {totalPrice}
            </p>
          </div>
        </div>

        {/* Flight Route */}
        <div className="flex-1 mb-4">
          <div className="flex items-center justify-between">
            {/* Departure */}
            <div className="text-left">
              <p className="text-2xl font-bold text-gray-900">
                {formatTime(departure.at)}
              </p>
              <p className="text-sm text-gray-500">
                {formatDate(departure.at)}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="w-4 h-4 text-gray-400" />
                <p className="text-sm font-medium text-gray-700">
                  {departure.iataCode}
                </p>
              </div>
            </div>

            {/* Flight Path */}
            <div className="flex-1 flex flex-col items-center px-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <Clock className="w-4 h-4" />
                <span>{formatDuration(itinerary.duration)}</span>
              </div>
              <div className="w-full relative">
                <div className="h-0.5 bg-gray-300 w-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Plane className="w-5 h-5 text-purple-500 rotate-90" />
                </div>
              </div>
              {numberOfStops > 0 && (
                <p className="text-xs text-purple-600 mt-2 font-medium">
                  {numberOfStops} stop{numberOfStops > 1 ? "s" : ""}
                </p>
              )}
            </div>

            {/* Arrival */}
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">
                {formatTime(arrival.at)}
              </p>
              <p className="text-sm text-gray-500">{formatDate(arrival.at)}</p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <MapPin className="w-4 h-4 text-gray-400" />
                <p className="text-sm font-medium text-gray-700">
                  {arrival.iataCode}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Duration and Details */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Duration: {formatDuration(itinerary.duration)}</span>
            {numberOfStops === 0 ? (
              <Badge
                variant="secondary"
                className="text-xs bg-green-50 text-green-700"
              >
                Direct
              </Badge>
            ) : (
              <Badge
                variant="secondary"
                className="text-xs bg-orange-50 text-orange-700"
              >
                {numberOfStops} stop{numberOfStops > 1 ? "s" : ""}
              </Badge>
            )}
          </div>
          {hasMultipleAirlines && (
            <div className="mt-2">
              <p className="text-xs text-gray-500">
                Airlines: {airlineCodes.join(", ")}
              </p>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          <div className="text-center">
            <Link
              to={`/flights/${d?.id}`}
              className="text-purple-600 font-medium cursor-pointer hover:text-purple-700 text-sm"
            >
              View details →
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightCard;
