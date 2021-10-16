import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import { Redirect } from "react-router";
import "./favorites.scss";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as LightMode } from "../../images/light-mode.svg";
import {
  changeMode,
  getMode,
  getFavorites,
  changeSystem,
  fetchCurrentLocation,
  selectLocation,
  setCurrentLocationKey,
  setCurrentLocationName,
  fetchFiveDayForecast,
} from "../../redux/weatherSlice";
import cloudy from "../../images/cloudy.png";
import sunny from "../../images/sunny.png";
import clearNight from "../../images/clear-night.png";
import cloudyNight from "../../images/cloudy-night.png";
import rainyNight from "../../images/rainy-night.png";
import rainy from "../../images/rainy.png";
import snowy from "../../images/snowy.png";
import snowyNight from "../../images/snowy-night.png";

export function FavoriteLocation({ location }) {
  const dispatch = useDispatch();
  const isMetric = useSelector((state) => state.weatherSlice.isMetric);
  const [currentWeather, setCurrentWeather] = useState({});
  const checkWeatherIcon = () => {
    const weatherIcon = currentWeather.WeatherIcon;
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
    axios
      .get(
        `http://dataservice.accuweather.com/currentconditions/v1/${location.Key}?apikey=AD6Aw9K1zHJ2caXgNTvHA9elLcDQeGMb`
      )
      .then((res) => setCurrentWeather(res.data[0]));
  }, []);

  if (!currentWeather.Temperature) {
    return <div>loading</div>;
  }

  return (
    <div
      className="favorite_location"
      onClick={() =>
        dispatch(fetchCurrentLocation(location.Key))
          .then(dispatch(fetchFiveDayForecast(location.Key)))
          .then(
            dispatch(setCurrentLocationName(location.Name)),
            dispatch(setCurrentLocationKey(location.Key)),
            dispatch(selectLocation(true))
          )
      }
    >
      <div className="weather_image">
        <img src={checkWeatherIcon()} alt="img" />
      </div>
      <div className="weather_details">
        <h3>{location.Name}</h3>
        <h4>
          {isMetric
            ? currentWeather.Temperature.Metric.Value
            : currentWeather.Temperature.Imperial.Value}
          &#176;
          {isMetric
            ? currentWeather.Temperature.Metric.Unit
            : currentWeather.Temperature.Imperial.Unit}
        </h4>
        <div className="weather_description">
          <h4>
            {currentWeather.WeatherText ? currentWeather.WeatherText : ""}{" "}
          </h4>
        </div>
      </div>
    </div>
  );
}

export default function Favorites() {
  const dispatch = useDispatch();
  const locationFromFavorites = useSelector(
    (state) => state.weatherSlice.selectFromFavorites
  );
  const favorites = useSelector((state) => state.weatherSlice.favorites);
  const isMetric = useSelector((state) => state.weatherSlice.isMetric);
  const darkMode = useSelector((state) => state.weatherSlice.darkMode);

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
  }, []);

  useEffect(() => {
    localStorage.setItem("savedMode", JSON.stringify(darkMode));
  }, [darkMode]);
  useEffect(() => {
    localStorage.setItem("isMetric", JSON.stringify(isMetric));
  }, [isMetric]);
  if (locationFromFavorites) {
    return <Redirect to="/" />;
  }

  return (
    <div className={`favorites ${darkMode ? "dark_mode" : "light_mode"}`}>
      <ReactTooltip />
      <div
        data-tip={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        onClick={() => dispatch(changeMode(!darkMode))}
        className="change_mode"
      >
        <LightMode
          className={`change_mode_img ${darkMode ? "dark" : "light"}`}
        />
      </div>
      <div className="favorites_container">
        {favorites.map((location, index) => {
          return <FavoriteLocation location={location} key={index} />;
        })}
      </div>
    </div>
  );
}
