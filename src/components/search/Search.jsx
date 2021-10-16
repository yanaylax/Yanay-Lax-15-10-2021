import React, { useEffect, useState, useRef } from "react";
import "./search.scss";
import searchIcon from "../../images/search.png";
import SearchList from "./search-list/SearchList";
import { useSelector, useDispatch } from "react-redux";
import { fetchLocations, searchLocation } from "../../redux/weatherSlice";

export default function Search() {
  const dispatch = useDispatch();
  const locationList = useSelector(
    (state) => state.weatherSlice.locationList.list
  );
  const searchString = useSelector((state) => state.weatherSlice.search);
  const [focused, setFocused] = useState(false);
  const wrapperRef = useRef(null);

  function useClickOutside(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setFocused(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useEffect(() => {
    dispatch(fetchLocations(searchString));
  }, [searchString, dispatch]);

  useClickOutside(wrapperRef);

  return (
    <div ref={wrapperRef} className="search_owner">
      <div className="search">
        <img src={searchIcon} alt="search icon" />
        <input
          onFocus={() => setFocused(true)}
          value={searchString}
          onChange={(e) => dispatch(searchLocation(e.target.value))}
          type="text"
        />
      </div>
      <SearchList focused={focused} list={locationList} />
    </div>
  );
}
