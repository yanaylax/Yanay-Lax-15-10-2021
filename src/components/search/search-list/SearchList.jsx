import React, { useState } from "react";
import "./search-list.scss";
import {
  fetchCurrentLocation,
  fetchFiveDayForecast,
  setCurrentLocationName,
} from "../../../redux/weatherSlice";
import { useSelector, useDispatch } from "react-redux";

function ListItem({ item }) {
  const dispatch = useDispatch();
  const isMetric = useSelector((state) => state.weatherSlice.isMetric);

  return (
    <div
      onClick={() =>
        dispatch(fetchCurrentLocation(item.Key))
          .then(dispatch(fetchFiveDayForecast(item.Key, isMetric)))
          .then(dispatch(setCurrentLocationName(item.LocalizedName)))
      }
      className="list_item"
    >
      <h3>{`${item.LocalizedName}(${item.Country.LocalizedName}) `}</h3>
    </div>
  );
}

export default function SearchList({ list, focused }) {
  return (
    <div className={`search_list ${focused ? "is_focused" : ""}`}>
      {list.map((item) => {
        return <ListItem key={item.Key} item={item} />;
      })}
    </div>
  );
}
