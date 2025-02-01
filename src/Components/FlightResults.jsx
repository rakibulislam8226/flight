import React from "react";
import { FaChevronDown } from "react-icons/fa";

const formatTime = (isoString) => {
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export default function FlightResults({ results }) {
  if (!results || !Array.isArray(results) || results.length === 0) {
    return (
      <p className="text-center text-lg font-semibold text-gray-400">
        No flights found
      </p>
    );
  }

  return (
    <div className="mt-6 p-2 px-4">
      <div className="relative max-w-[1280px] lg:m-auto">
        <h2 className="text-lg font-semibold mb-4">All Flights</h2>
        <div className="py-4 text-center">
          {results.map((flight, index) => (
            <div
              key={index}
              className={`p-1 ${
                index === 0
                  ? "border border-gray-400"
                  : "border-b border-l border-r border-gray-400"
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img
                    src={flight.airlineLogo || "/default-airline.png"}
                    alt={flight.airlineName}
                    className="w-10 h-10"
                  />
                  <div className="flex flex-col">
                    <p className="text-lg font-medium">{flight.airlineName}</p>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      {formatTime(flight.legs[0].departure)} -{" "}
                      {formatTime(flight.legs[0].arrival)}
                    </p>

                    <p className="text-gray-400 hidden sm:block">
                      {flight.legs[0].segments[0].marketingCarrier.name}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-lg font-semibold hidden sm:block">
                    {flight.legs[0].durationInMinutes} min
                  </p>
                  <p className=" text-gray-400 text-xs sm:text-sm">
                    {flight.legs[0].origin.displayCode} -{" "}
                    {flight.legs[0].destination.displayCode}
                  </p>
                </div>
                <p className="text-gray-300 hidden sm:block">
                  {flight.duration} • {flight.stops} stops
                </p>
                <div className="flex flex-row gap-2 items-center">
                  <p className="text-lg font-semibold text-green-400">
                    {flight.price?.formatted || "N/A"}
                  </p>
                  <p className="text-sm text-gray-400">{flight.cabinClass}</p>
                  <FaChevronDown className="text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
