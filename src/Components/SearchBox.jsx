import { useState, useEffect } from "react";
import { FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoSwapHorizontal } from "react-icons/io5";
import UseDebounce from "../CustomHooks/UseDebounce";

const RAPIDAPI_BASE_URL = import.meta.env.VITE_RAPIDAPI_BASE_URL;
const RAPIDAPI_HOST = import.meta.env.VITE_RAPIDAPI_HOST;
const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

export default function FlightSearch() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("2025-02-05");
  const [returnDate, setReturnDate] = useState("2025-02-06");
  const [tripType, setTripType] = useState("One way");
  const tripOptions = ["One way", "Round trip", "Multi-city"];
  const [tripTypeOpen, setTripTypeOpen] = useState(false);
  const [tripCategoryType, setTripCategoryType] = useState("economy");
  const tripCategory = ["Economy", "Premium economy", "Business", "First"];
  const [tripCategoryOpen, setTripCategoryOpen] = useState(false);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [selectedFromAirport, setSelectedFromAirport] = useState(null);
  const [selectedToAirport, setSelectedToAirport] = useState(null);

  const debouncedFrom = UseDebounce(from, 500);
  const debouncedTo = UseDebounce(to, 500);

  useEffect(() => {
    if (debouncedFrom) {
      searchFlight(debouncedFrom, "from");
    }
  }, [debouncedFrom]);

  useEffect(() => {
    if (debouncedTo) {
      searchFlight(debouncedTo, "to");
    }
  }, [debouncedTo]);

  const searchFlight = async (term, type) => {
    const url = `${RAPIDAPI_BASE_URL}/api/v1/flights/searchAirport?query=${term}&locale=en-US`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": RAPIDAPI_KEY,
        "x-rapidapi-host": RAPIDAPI_HOST,
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const suggestionsArray = result.data || [];
      if (type === "from") {
        setFromSuggestions(suggestionsArray);
      } else if (type === "to") {
        setToSuggestions(suggestionsArray);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFromInputSearch = (e) => {
    setFrom(e.target.value);
  };

  const handleToInputSearch = (e) => {
    setTo(e.target.value);
  };

  const SearchSelectedFlight = async () => {
    if (!selectedFromAirport || !selectedToAirport) {
      alert("Please select a valid airport from the suggestions.");
      return;
    }

    console.log("Selected from airport:", selectedFromAirport);
    console.log("Selected to airport:", selectedToAirport);

    const fromId = selectedFromAirport?.skyId;
    const toId = selectedToAirport?.skyId;
    const fromEntityId = selectedFromAirport.entityId;
    const toEntityId = selectedToAirport.entityId;

    if (!fromId || !toId) {
      alert("Invalid airport data. Please try selecting again.");
      return;
    }

    const deptureDate = date || "2025-02-05";
    const validTripType = tripType || "One way";
    const validTripCategoryType = tripCategoryType || "economy";

    console.log(fromId, toId, fromEntityId, toEntityId, date, returnDate);
    const flightUrl = `${RAPIDAPI_BASE_URL}/api/v2/flights/searchFlights?originSkyId=${fromId}&destinationSkyId=${toId}&originEntityId=${fromEntityId}&destinationEntityId=${toEntityId}&date=${deptureDate}&cabinClass=${validTripCategoryType}&adults=1&sortBy=best&currency=USD&market=en-US&countryCode=US`;
    console.log("Flight search URL:", flightUrl);

    try {
      const response = await fetch(flightUrl, {
        method: "GET",
        headers: {
          "x-rapidapi-key": RAPIDAPI_KEY,
          "x-rapidapi-host": RAPIDAPI_HOST,
        },
      });
      const result = await response.json();
      console.log("Flight search result:", result);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  return (
    <div className="bg-[#202124] text-white">
      <div className="relative max-w-[1440px] m-auto text-center">
        <div className="lg:bg-[#35373A] p-4 lg:rounded-lg shadow-md flex flex-col gap-4">
          <div className="flex items-center gap-2 text-gray-400 text-sm z-100">
            <div className="relative">
              <button
                className="px-4 py-2 rounded-lg flex items-center gap-2"
                onClick={() => setTripTypeOpen(!tripTypeOpen)}
              >
                {tripType} {tripTypeOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {tripTypeOpen && (
                <div className="absolute bg-[#35373A] mt-1 rounded-lg shadow-md w-full">
                  {tripOptions.map((option) => (
                    <div
                      key={option}
                      className="px-4 py-2 hover:lg:bg-[#3b3c3d] cursor-pointer"
                      onClick={() => {
                        setTripType(option);
                        setTripTypeOpen(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <span>1</span>

            <div className="relative">
              <button
                className="px-4 py-2 rounded-lg flex items-center gap-2"
                onClick={() => setTripCategoryOpen(!tripCategoryOpen)}
              >
                {tripCategoryType}{" "}
                {tripCategoryOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {tripCategoryOpen && (
                <div className="absolute bg-[#35373A] rounded-lg shadow-md w-full">
                  {tripCategory.map((option) => (
                    <div
                      key={option}
                      className="px-4 py-2 hover:lg:bg-[#3b3c3d] cursor-pointer"
                      onClick={() => {
                        setTripCategoryType(option);
                        setTripCategoryOpen(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center px-3 rounded-lg gap-2 w-full">
            <div className="flex w-full lg:w-2/3 gap-2">
              <div className="relative w-1/2">
                <input
                  type="text"
                  placeholder="Where from?"
                  value={from}
                  onChange={handleFromInputSearch}
                  className="w-full bg-transparent outline-none text-white placeholder-gray-400 p-3 rounded-lg border border-gray-600"
                />
                {/* Display suggestions for "Where from?" */}
                {from && fromSuggestions.length > 0 && (
                  <div className="absolute bg-[#35373A] w-full mt-1 rounded-lg shadow-md max-h-40 overflow-y-auto">
                    {fromSuggestions.map((suggestion) => (
                      <div
                        key={suggestion.entityId}
                        className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                        onClick={() => {
                          console.log("first", fromSuggestions);
                          setFrom(
                            suggestion.navigation.relevantHotelParams
                              .localizedName
                          );
                          setSelectedFromAirport(suggestion);
                          setFromSuggestions([]);
                        }}
                      >
                        {suggestion.presentation.suggestionTitle}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center bg-gray-700 p-2 rounded-full">
                <IoSwapHorizontal className="text-white text-lg" />
              </div>
              <div className="relative w-1/2">
                <input
                  type="text"
                  placeholder="Where to?"
                  value={to}
                  onChange={handleToInputSearch}
                  className="w-full bg-transparent outline-none text-white placeholder-gray-400 p-3 rounded-lg border border-gray-600"
                />
                {/* Display suggestions for "Where to?" */}
                {to && toSuggestions.length > 0 && (
                  <div className="absolute bg-[#35373A] w-full mt-1 rounded-lg shadow-md max-h-40 overflow-y-auto">
                    {toSuggestions.map((suggestion) => (
                      <div
                        key={suggestion.entityId}
                        className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                        onClick={() => {
                          setTo(
                            suggestion.navigation.relevantHotelParams
                              .localizedName
                          );
                          setSelectedToAirport(suggestion);
                          setToSuggestions([]);
                        }}
                      >
                        {suggestion.presentation.suggestionTitle}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Date section */}
            <div className="flex flex-row w-full lg:w-1/3 bg-transparent border border-gray-600 rounded-lg p-3">
              {tripType === "One way" ? (
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-transparent outline-none text-white cursor-pointer w-full"
                />
              ) : (
                <>
                  <div className="flex flex-col w-full">
                    <input
                      placeholder="Departure"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="bg-transparent outline-none text-white cursor-pointer w-full"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <input
                      placeholder="Return"
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="bg-transparent outline-none text-white cursor-pointer w-full"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-600 p-3 rounded-lg flex items-center justify-center gap-2 w-1/4 mx-auto"
            onClick={SearchSelectedFlight}
          >
            <FaSearch /> Search
          </button>
        </div>
      </div>
    </div>
  );
}
