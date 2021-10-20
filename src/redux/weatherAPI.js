import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export const getLocations = async (location) => {
  const { data } = await axios.get(
    `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${location}`
  );
  return data;
};

export const getCurrentLocation = async (id) => {
  const { data } = await axios.get(
    `https://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=${API_KEY}`
  );
  return data;
};

export const getFiveDayForecast = async (id) => {
  const { data } = await axios.get(
    `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${id}?apikey=${API_KEY}&metric=true`
  );
  return data;
};

export const getLocationByGeolocation = async (lat, lon) => {
  const { data } = await axios.get(
    `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${lon}`
  );
  return data;
};
