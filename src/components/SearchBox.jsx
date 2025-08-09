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

    // Add "fromLocation - toLocation" only if fromLocation or toLocation exists
    if (displayedSearchData.fromLocation || displayedSearchData.toLocation) {
      const from = displayedSearchData.fromLocation || "";
      const to = displayedSearchData.toLocation || "";

      // If both exist, join with ' - ', else show whichever exists
      parts.push(from && to ? `${from} - ${to}` : from || to);
    }

    // Add dateRange if departDate exists
    if (displayedSearchData.departDate) {
      const dateRange =
        displayedSearchData.returnDate &&
        displayedSearchData.returnDate !== displayedSearchData.departDate
          ? `${displayedSearchData.departDate} - ${displayedSearchData.returnDate}`
          : displayedSearchData.departDate;

      parts.push(dateRange);
    }

    // Add passengers if exists
    if (displayedSearchData.passengers) {
      parts.push(displayedSearchData.passengers);
    }

    // Join all parts with ' • '
    return parts.length > 1 ? parts.join(" • ") : "";
  };

  const handleInputClick = () => {
    setIsExpanded(true);
  };

  // This function now handles both closing the form and triggering the search
  const handleFormClose = (currentSearchData) => {
    setDisplayedSearchData(currentSearchData); // Update displayed data with the form's final state
    setIsExpanded(false); // Close the form

    // Trigger search logic here, as the form is now closed and data is ready
    console.log("Search triggered with:", currentSearchData);
    // In a real app, you would likely navigate or fetch data here
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Compact Input Display */}
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

      {/* Imported Search Form Component */}
      {isExpanded && (
        <InputForm
          onClose={handleFormClose} // Only pass the onClose callback
          isVisible={isExpanded}
          initialSearchData={displayedSearchData}
          ok={true} // Pass current displayed data to pre-fill the form
        />
      )}
    </div>
  );
};
