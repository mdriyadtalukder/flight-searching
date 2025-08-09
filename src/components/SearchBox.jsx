import React, { useState } from "react";
import { useSelector } from "react-redux";
import InputForm from "./InputForm";
import { Search } from "lucide-react";

export const SearchBox = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { origin, destination, departureDate, returnDate, passengers } =
    useSelector((state) => state.flights);
  const [displayedSearchData, setDisplayedSearchData] = useState({
    fromLocation: origin || "",
    toLocation: destination || "",
    departDate: departureDate || "",
    returnDate: returnDate || "",
    passengers: passengers || 1,
  });

  const formatDisplayText = () => {
    const parts = [];

    if (displayedSearchData.fromLocation || displayedSearchData.toLocation) {
      const from = displayedSearchData.fromLocation || "";
      const to = displayedSearchData.toLocation || "";

      parts.push(from && to ? `${from} - ${to}` : from || to);
    }

    if (displayedSearchData.departDate) {
      const dateRange =
        displayedSearchData.returnDate &&
        displayedSearchData.returnDate !== displayedSearchData.departDate
          ? `${displayedSearchData.departDate} - ${displayedSearchData.returnDate}`
          : displayedSearchData.departDate;

      parts.push(dateRange);
    }

    if (displayedSearchData.passengers) {
      parts.push(displayedSearchData.passengers);
    }

    return parts.length > 1 ? parts.join(" • ") : "";
  };

  const handleInputClick = () => {
    setIsExpanded(true);
  };

  const handleFormClose = (currentSearchData) => {
    setDisplayedSearchData(currentSearchData); 
    setIsExpanded(false); 

    console.log("Search triggered with:", currentSearchData);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div
        className={`transition-all duration-300 ease-in-out ${
          isExpanded
            ? "opacity-0 scale-95 pointer-events-none"
            : "opacity-100 scale-100"
        }`}
      >
        <div
          onClick={handleInputClick}
          className="relative w-full bg-white rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-200 cursor-pointer group"
        >
          <div className="flex items-center px-6 py-4">
            <Search className="w-5 h-5 text-gray-400 mr-4 group-hover:text-gray-600 transition-colors" />
            <span className="text-gray-700 flex-1 text-lg">
              {formatDisplayText()}
            </span>
          </div>
        </div>
      </div>

      {isExpanded && (
        <InputForm
          onClose={handleFormClose} 
          isVisible={isExpanded}
          initialSearchData={displayedSearchData}
          ok={true} 
        />
      )}
    </div>
  );
};
