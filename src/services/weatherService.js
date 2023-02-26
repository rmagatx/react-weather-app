import { DateTime, FixedOffsetZone } from "luxon";

const API_KEY = "6188040df808286449230100ba7ab5aa";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    weather,
    speed,
    details,
    icon,
    timezone,
  };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedWeather = await getWeatherData("weather", {
    lat,
    lon,
    units: searchParams.units,
  }).then(formatCurrentWeather);

  return { ...formattedCurrentWeather, ...formattedWeather };
};

const formatToLocalTime = (
  secs,
  offsetInSeconds,
  format = "cccc, dd LLL yyyy' | 'hh:mm a"
) => {
  const timeZone = FixedOffsetZone.instance(offsetInSeconds / 60);
  return DateTime.fromSeconds(secs, { zone: timeZone }).toFormat(format);
};

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };
