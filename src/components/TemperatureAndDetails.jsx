import React from "react";
import {
  UilArrowUp,
  UilArrowDown,
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";
import { formatToLocalTime, iconUrlFromCode } from "../services/weatherService";

function TemperatureAndDetails({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
  },
  loading,
}) {
  return (
    <div>
      {!loading && (
        <div>
          <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
            <p>{details}</p>
          </div>
          <div className="flex flex-row items-center justify-between text-white py-3">
            <img src={iconUrlFromCode(icon)} alt="" className="w-20" />
            <p className="text-5xl">{`${parseInt(temp)}`}°</p>
            <div className="flex flex-col space-y-2">
              <div className="flex font-light text-sm items-center">
                <UilTemperature size={18} className="mr-1" />
                Real Feel:
                <span className="font-medium ml-1">
                  {`${parseInt(feels_like)}`}°
                </span>
              </div>
              <div className="flex font-light text-sm items-center ">
                <UilTear size={18} className="mr-1" />
                Humidity:
                <span className="font-medium ml-1">{humidity}%</span>
              </div>
              <div className="flex font-light text-sm items-center ">
                <UilWind size={18} className="mr-1" />
                Wind Speed:
                <span className="font-medium ml-1">
                  {`${parseInt(speed)}`} km/h
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-center space-x-2 text-white text-sm py-3">
            <UilSun />
            <p className="font-light">
              Sunrise:{" "}
              <span className="font-medium">
                {formatToLocalTime(sunrise, timezone, "hh:mm a")}
              </span>
            </p>
            <p className="font-light">|</p>

            <UilSunset />
            <p className="font-light">
              Sunset:{" "}
              <span className="font-medium ml-1">
                {formatToLocalTime(sunset, timezone, "hh:mm a")}
              </span>
            </p>
            <p className="font-light">|</p>

            <UilArrowUp />
            <p className="font-light">
              High:{" "}
              <span className="font-medium ml-1">
                {`${parseInt(temp_max)}`}°
              </span>
            </p>
            <p className="font-light">|</p>

            <UilArrowDown />
            <p className="font-light">
              Low:{" "}
              <span className="font-medium ml-1">
                {`${parseInt(temp_min)}`}°
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TemperatureAndDetails;
