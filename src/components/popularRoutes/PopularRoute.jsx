import React from "react";

const PopularRoute = ({route}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer group">
      <div className="flex items-center p-4 gap-4">
        <div className="flex-shrink-0">
          <img
            src={route.image || "/placeholder.svg"}
            alt={`${route.location2} destination`}
            className="w-16 h-16 rounded-lg object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        <div className="flex-1">
          <div className="text-gray-900 font-medium text-lg">
            {route.location1} <span className="text-purple-600 mx-2">⇄</span>{" "}
            {route.location2}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularRoute;
