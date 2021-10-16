import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeSystem } from "../../redux/weatherSlice";
import "./nav.scss";

export default function Nav() {
  const dispatch = useDispatch();
  const isMetric = useSelector((state) => state.weatherSlice.isMetric);
  return (
    <div className="nav">
      <div>
        <Link to="/">Main</Link>
        <Link to="/favorites">Favorites</Link>
      </div>
      <div className="choose_degree_system">
        <span
          onClick={() => dispatch(changeSystem(true))}
          className={isMetric ? "active" : "not_active"}
        >
          Metric( &#176;C )
        </span>
        /
        <span
          onClick={() => dispatch(changeSystem(false))}
          className={!isMetric ? "active" : "not_active"}
        >
          Imperial( &#176;F )
        </span>
      </div>
    </div>
  );
}
