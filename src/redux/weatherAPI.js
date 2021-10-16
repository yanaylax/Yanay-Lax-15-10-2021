import axios from "axios";

export const getLocations = async (location) => {
  const { data } = await axios.get(
    `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=AD6Aw9K1zHJ2caXgNTvHA9elLcDQeGMb&q=${location}`
  );
  return data;
};

export const getCurrentLocation = async (id) => {
  const { data } = await axios.get(
    `http://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=AD6Aw9K1zHJ2caXgNTvHA9elLcDQeGMb`
  );
  return data;
};

export const getFiveDayForecast = async (id) => {
  const { data } = await axios.get(
    `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${id}?apikey=AD6Aw9K1zHJ2caXgNTvHA9elLcDQeGMb&metric=true`
  );
  return data;
};

export const getLocationByGeolocation = async (lat, lon) => {
  const { data } = await axios.get(
    `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=AD6Aw9K1zHJ2caXgNTvHA9elLcDQeGMb&q=${lat},${lon}`
  );
  return data;
};
