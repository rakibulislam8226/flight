import { useState, useEffect } from "react";
import {
  FaSearch,
  FaCalendarAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { IoSwapHorizontal } from "react-icons/io5";

const url = import.meta.env.RAPIDAPI_BASE_URL;
const rapidapi_host = import.meta.env.RAPIDAPI_HOST;
const rapidapi_key = import.meta.env.RAPIDAPI_KEY;

export default function FlightSearch() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("2025-02-05");
  const [tripType, setTripType] = useState("One way");
  const tripOptions = ["One way", "Round trip", "Multi-city"];
  const [tripTypeOpen, setTripTypeOpen] = useState(false);
  const [tripCategoryType, setTripCategoryType] = useState("Economy");
  const tripCategory = ["Economy", "Premium economy", "Business", "First"];
  const [tripCategoryOpen, setTripCategoryOpen] = useState(false);

  useEffect(() => {}, []);

  const searchFlight = async (term) => {
    const resp = await fetch(
      `${url}/api/v1/flights/searchAirport?query=${term}&locale=en-US`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": rapidapi_host,
          "X-RapidAPI-Key": rapidapi_key,
        },
      }
    );
    const data = await resp.json();

    if (!resp.ok) {
      console.error("error happen", data);
    }

    console.log(data);
  };

  const handleInputSearch = (e) => {
    setFrom(e.target.value);
    searchFlight(e.target.value);
  };

  return (
    <div className="bg-[#202124] text-white">
      <div className="relative max-w-[1440px] m-auto text-center">
        <div className="lg:bg-[#35373A] p-4 lg:rounded-lg shadow-md  flex flex-col gap-4">
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
                      className="px-4 py-2 hover:lg:bg-[#3b3c3d]  cursor-pointer"
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
                  onChange={handleInputSearch}
                  className="w-full bg-transparent outline-none text-white placeholder-gray-400 p-3 rounded-lg border border-gray-600"
                />
              </div>
              <div className="flex items-center justify-center bg-gray-700 p-2 rounded-full">
                <IoSwapHorizontal className="text-white text-lg" />
              </div>
              <div className="relative w-1/2">
                <input
                  type="text"
                  placeholder="Where to?"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full bg-transparent outline-none text-white placeholder-gray-400 p-3 rounded-lg border border-gray-600"
                />
              </div>
            </div>
            <div className="flex w-full lg:w-1/3 bg-transparent border border-gray-600 rounded-lg p-3">
              <FaCalendarAlt className="text-gray-400 mr-2" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-transparent outline-none text-white cursor-pointer w-full"
              />
            </div>
          </div>

          <button className="bg-blue-500 hover:bg-blue-600 p-3 rounded-lg flex items-center justify-center gap-2 w-1/4 mx-auto">
            <FaSearch /> Search
          </button>
        </div>
      </div>
    </div>
  );
}
