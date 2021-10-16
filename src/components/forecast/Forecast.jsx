import React from "react";
import "./forecast.scss";
import cloudy from "../../images/cloudy.png";
import sunny from "../../images/sunny.png";
import clearNight from "../../images/clear-night.png";
import cloudyNight from "../../images/cloudy-night.png";
import rainyNight from "../../images/rainy-night.png";
import rainy from "../../images/rainy.png";
import snowy from "../../images/snowy.png";
import snowyNight from "../../images/snowy-night.png";

import { useSelector } from "react-redux";

function ForecastDay({ day }) {
  const isMetric = useSelector((state) => state.weatherSlice.isMetric);
  const dayNum = new Date(day.Date).getDay();
  const checkWeatherIcon = (weatherIcon) => {
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
  return (
    <div className="forecast_day">
      <h2>
        {dayNum === 1
          ? "Monday"
          : dayNum === 2
          ? "Tuesday"
          : dayNum === 3
          ? "Wednesday"
          : dayNum === 4
          ? "Thursday"
          : dayNum === 5
          ? "Friday"
          : dayNum === 6
          ? "Saturday"
          : dayNum === 0
          ? "Sunday"
          : ""}
      </h2>
      <div className="temperature">
        <div className="day">
          <img src={checkWeatherIcon(day.Day.Icon)} alt="day icon" />

          <h3>
            {isMetric
              ? day.Temperature.Maximum.Value
              : Math.round(day.Temperature.Maximum.Value * 1.8 + 32)}
            &#176;
            <span>{isMetric ? "C" : "F"}</span>
          </h3>
        </div>
        <div className="night">
          <img src={checkWeatherIcon(day.Night.Icon)} alt="night icon" />
          <h3>
            {isMetric
              ? day.Temperature.Minimum.Value
              : Math.round(day.Temperature.Minimum.Value * 1.8 + 32)}
            &#176;
            <span>{isMetric ? "C" : "F"}</span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default function Forecast({ forecast }) {
  const darkMode = useSelector((state) => state.weatherSlice.darkMode);

  return (
    <div className={`forecast_list ${darkMode ? "dark_mode" : "light_mode"}`}>
      {forecast.map((day, index) => {
        return <ForecastDay key={index} day={day} />;
      })}
    </div>
  );
}
