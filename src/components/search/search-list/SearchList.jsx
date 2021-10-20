import React from "react";
import "./search-list.scss";
import {
  fetchCurrentLocation,
  fetchFiveDayForecast,
  setCurrentLocationName,
  setCurrentLocationKey,
  searchLocation,
} from "../../../redux/weatherSlice";
import { useSelector, useDispatch } from "react-redux";

function ListItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() =>
        dispatch(fetchCurrentLocation(item.Key))
          .then(dispatch(fetchFiveDayForecast(item.Key)))
          .then(
            dispatch(setCurrentLocationName(item.LocalizedName)),
            dispatch(setCurrentLocationKey(item.Key)),
            dispatch(searchLocation(""))
          )
      }
      className="list_item"
    >
      <h3>{`${item.LocalizedName}(${item.Country.LocalizedName}) `}</h3>
    </div>
  );
}

export default function SearchList({ list, focused }) {
  const darkMode = useSelector((state) => state.weatherSlice.darkMode);

  return (
    <div
      className={`search_list ${focused ? "is_focused" : ""} ${
        darkMode ? "dark_mode" : "light_mode"
      }`}
    >
      {list.map((item) => {
        return <ListItem key={item.Key} item={item} />;
      })}
    </div>
  );
}
