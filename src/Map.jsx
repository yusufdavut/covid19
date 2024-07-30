import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { getCountryHistoryFetch } from "./redux/countrySlice";

// eslint-disable-next-line react/prop-types
function Map() {
  const [content, setContent] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCountry = (countryName) => {
    if (countryName === "United States") {
      countryName = "USA";
    } else if (countryName === "South Korea") {
      countryName = "S-Korea";
    } else {
      countryName = countryName.split(" ").join("-");
    }

    if (countryName) {
      dispatch(getCountryHistoryFetch(countryName));
      navigate(`/${countryName}`);
    }
  };

  return (
    <div className="py-10">
      <Tooltip id="my-tooltip" content={content} />
      <div>
        <h1 className="flex items-center justify-center w-full text-6xl uppercase font-bold">
          Covid 19 Map Tracker
        </h1>
        <ComposableMap width={1000}>
          <Geographies geography="/features.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  data-tooltip-id="my-tooltip"
                  key={geo.rsmKey}
                  geography={geo}
                  name={geo.name}
                  fill="#E7D4B5"
                  stroke="#000"
                  onClick={() => {
                    handleCountry(geo.properties.name);
                  }}
                  onMouseEnter={() => {
                    const { name } = geo.properties;
                    setContent(`${name}`);
                  }}
                  onMouseLeave={() => {
                    setContent("");
                  }}
                  style={{
                    default: { outline: "none" },
                    hover: {
                      cursor: "pointer",
                      fill: "#A0937D",
                      outline: "none",
                    },
                    pressed: {
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div>
    </div>
  );
}

export default Map;
