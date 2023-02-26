import React, { useState } from "react";
import { UilSearch, UilLocationArrow } from "@iconscout/react-unicons";

function Inputs({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");
  const [defaultCity, setDefaultCity] = useState("winnipeg");

  const handleSearchClick = () => {
    if (city !== "") {
      setQuery({ q: city, units: units });
      setDefaultCity(city);
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
          units: units,
        });
      });
    }
  };

  const handleUnitsClick = (e) => {
    if (e.currentTarget.name != units) {
      setQuery({ q: defaultCity, units: e.currentTarget.name });
      setUnits(e.currentTarget.name);
    }
  };

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-start space-x-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          placeholder="City"
          className="text-xl font-light w-[300px] p-2 focus:outline-none capitalize"
        />
        <UilSearch
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearchClick}
        />
        <UilLocationArrow
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationClick}
        />
      </div>
      <div className="flex flex-row w-1/4 items-center justify-end">
        <button
          name="metric"
          className="text-xl text-white font-light cursor-pointer transition ease-out hover:scale-125"
          onClick={handleUnitsClick}
        >
          °C
        </button>
        <p className="text-xl font-light text-white mx-1">|</p>
        <button
          name="imperial"
          className="text-xl text-white font-light cursor-pointer transition ease-out hover:scale-125"
          onClick={handleUnitsClick}
        >
          °F
        </button>
      </div>
      {/* <div className="flex flex-row w-1/4 items-center justify-end ml-2">
        {" "}
        <UilPlusCircle
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
        />
      </div> */}
    </div>
  );
}

export default Inputs;
