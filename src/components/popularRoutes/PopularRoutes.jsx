import React from "react";
import { popularRoutes } from "../../assets/data";
import PopularRoute from "./PopularRoute";

const PopularRoutes = () => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular flights
          </h2>
          <p className="text-gray-600 text-lg">
            Check these popular routes on our platform.
          </p>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularRoutes.map((route) => (
            <PopularRoute key={route?.numId} route={route} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;
