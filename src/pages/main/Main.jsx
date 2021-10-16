import React, { useEffect } from "react";
import Forecast from "../../components/forecast/Forecast";
import Search from "../../components/search/Search";
import ReactTooltip from "react-tooltip";
import "./main.scss";
import cloudy from "../../images/cloudy.png";
import sunny from "../../images/sunny.png";
import clearNight from "../../images/clear-night.png";
import cloudyNight from "../../images/cloudy-night.png";
import rainyNight from "../../images/rainy-night.png";
import rainy from "../../images/rainy.png";
import snowy from "../../images/snowy.png";
import snowyNight from "../../images/snowy-night.png";
import { ReactComponent as StarImage } from "../../images/star.svg";
import { ReactComponent as LightMode } from "../../images/light-mode.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFiveDayForecast,
  fetchLocationByGeolocation,
  setCurrentLocationName,
  setCurrentLocationKey,
  fetchCurrentLocation,
  changeSystem,
  addToFavorites,
  getFavorites,
  removeFromFavorites,
  changeMode,
  getMode,
  selectLocation,
} from "../../redux/weatherSlice";

export default function Main() {
  const dispatch = useDispatch();
  const currentLocation = useSelector(
    (state) => state.weatherSlice.currentLocation.location[0]
  );
  const currentLocationKey = useSelector(
    (state) => state.weatherSlice.currentLocation.Key
  );
  const currentName = useSelector(
    (state) => state.weatherSlice.currentLocation.Name
  );
  const status = useSelector(
    (state) => state.weatherSlice.currentLocation.status
  );
  const currentLocationGeo = useSelector(
    (state) => state.weatherSlice.currentLocationGeo
  );
  const forecast = useSelector((state) => state.weatherSlice.currentForecast);
  const isMetric = useSelector((state) => state.weatherSlice.isMetric);
  const favorites = useSelector((state) => state.weatherSlice.favorites);
  const selectFromFavorites = useSelector(
    (state) => state.weatherSlice.selectFromFavorites
  );
  const favoritesByKey = favorites.map((location) => location.Key);
  const darkMode = useSelector((state) => state.weatherSlice.darkMode);
  const checkWeatherIcon = () => {
    const weatherIcon = currentLocation.WeatherIcon;

    if (weatherIcon) {
      if (weatherIcon >= 1 && weatherIcon <= 5) return sunny;
      else if (weatherIcon >= 6 && weatherIcon <= 11) return cloudy;
      else if (weatherIcon >= 12 && weatherIcon <= 18) return rainy;
      else if (weatherIcon >= 19 && weatherIcon <= 29) return snowy;
      else if (weatherIcon >= 32 && weatherIcon <= 34) return clearNight;
      else if (weatherIcon >= 35 && weatherIcon <= 38) return cloudyNight;
      else if (weatherIcon >= 39 && weatherIcon <= 42) return rainyNight;
      else if (weatherIcon >= 43) return snowyNight;
    } else return "";
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("savedMode");
    if (savedMode) {
      dispatch(getMode(JSON.parse(savedMode)));
    }
    const savedSystem = localStorage.getItem("isMetric");
    if (savedSystem) {
      dispatch(changeSystem(JSON.parse(savedSystem)));
    }
    const savedFavorites = localStorage.getItem("favoriteLocations");
    if (savedFavorites) {
      dispatch(getFavorites(JSON.parse(savedFavorites)));
    }
    if (selectFromFavorites) return dispatch(selectLocation(false));
    else if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        dispatch(
          fetchLocationByGeolocation({
            lat: position.coords.latitude.toString(),
            lon: position.coords.longitude.toString(),
          })
        ).then((res) => {
          dispatch(fetchCurrentLocation(res.payload.Key)).then(
            dispatch(setCurrentLocationName(res.payload.LocalizedName)),
            dispatch(setCurrentLocationKey(res.payload.Key))
          );
        });
      });
    } else {
      dispatch(fetchCurrentLocation("215854"))
        .then(dispatch(fetchFiveDayForecast("215854")))
        .then(
          dispatch(setCurrentLocationName("Tel Aviv")),
          dispatch(setCurrentLocationKey("215854"))
        );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("savedMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("isMetric", JSON.stringify(isMetric));
  }, [isMetric]);

  useEffect(() => {
    localStorage.setItem("favoriteLocations", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (currentLocationGeo.location.Key) {
      dispatch(fetchFiveDayForecast(currentLocationGeo.location.Key));
    }
  }, [currentLocationGeo, dispatch]);

  if (
    status === "loading" ||
    (currentLocationGeo.status === "loading" && status === "loading")
  ) {
    return <h1>loading</h1>;
  }
  return (
    <div className={`main_page ${darkMode ? "dark_mode" : "light_mode"}`}>
      <div
        data-tip={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        onClick={() => dispatch(changeMode(!darkMode))}
        className="change_mode"
      >
        <LightMode
          className={`change_mode_img ${darkMode ? "dark" : "light"}`}
        />
      </div>
      <div className="search_wrapper">
        <Search />
      </div>

      <div className="weather">
        <div className="current_weather">
          <div className="weather_today">
            <div className="weather_image">
              <img src={checkWeatherIcon()} alt="img" />
            </div>
            <div className="weather_details">
              <h1>{currentName}</h1>
              <h2>
                {isMetric
                  ? currentLocation.Temperature.Metric.Value
                  : currentLocation.Temperature.Imperial.Value}
                &#176;
                {isMetric
                  ? currentLocation.Temperature.Metric.Unit
                  : currentLocation.Temperature.Imperial.Unit}
              </h2>
              <div className="weather_description">
                <h3>
                  {currentLocation.WeatherText
                    ? currentLocation.WeatherText
                    : ""}{" "}
                </h3>
              </div>
            </div>
          </div>

          <div className="add_to_favorites">
            <ReactTooltip />
            <button
              data-tip={
                favoritesByKey.includes(currentLocationKey)
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
              onClick={() => {
                if (favoritesByKey.includes(currentLocationKey))
                  dispatch(removeFromFavorites(currentLocationKey));
                else
                  dispatch(addToFavorites({ currentName, currentLocationKey }));
              }}
            >
              <StarImage
                className={`star ${
                  favoritesByKey.includes(currentLocationKey) ? "favorite" : ""
                }`}
              />
            </button>
          </div>
        </div>

        <div>
          {forecast.status === "loading" ? (
            <div>loading</div>
          ) : (
            <Forecast forecast={forecast.forecast.DailyForecasts} />
          )}
        </div>
      </div>
    </div>
  );
}
