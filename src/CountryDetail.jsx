import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountryHistoryFetch } from "./redux/countrySlice";

import Spinner from "../src/assets/spinner.svg";

function CountryDetail() {
  const { countryName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { countryHistory, status, error } = useSelector(
    (state) => state.country
  );

  useEffect(() => {
    if (countryName) {
      dispatch(getCountryHistoryFetch(countryName));
    }
  }, [countryName, dispatch]);

  if (status === "loading")
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <img src={Spinner} alt="Loading Spinner" width={100} height={100} />
      </div>
    );
  if (status === "failed")
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="p-5 flex flex-col">
      <div
        onClick={() => navigate("/")}
        className="w-[150px] py-3 px-1 bg-slate-700 text-white flex items-center justify-center rounded-md mb-5 cursor-pointer hover:bg-slate-600 transition-all duration-300"
      >
        Back to map
      </div>
      <div className="flex flex-col">
        <h1 className="font-bold text-blue-600 uppercase mb-3 text-5xl">
          {countryName}
        </h1>

        {countryHistory && countryHistory.response.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {countryHistory.response.slice(0, 13).map((item, index) => (
              <div
                key={index}
                className="flex flex-col rounded-md shadow-md p-5 mb-10"
              >
                <div className="flex justify-between items-center mb-5">
                  <h2 className="font-bold">Day</h2>
                  <p>{item.day}</p>
                </div>
                <div className="bg-black w-full h-[1px] mb-5"></div>
                <div className="flex flex-col mb-5">
                  <h2 className="font-bold">Cases</h2>
                  <p className="italic">
                    Active:
                    <span className="text-[#478CCF] ml-1">
                      {item.cases.active ? item.cases.active : "No data."}
                    </span>
                  </p>
                  <p className="italic">
                    Recovered:
                    <span className="text-[#50B498] ml-1">
                      {item.cases.recovered ? item.cases.recovered : "No data."}
                    </span>
                  </p>
                  <p className="italic">
                    Total:
                    <span className="text-[#FF8225] ml-1">
                      {item.cases.total}
                    </span>
                  </p>
                </div>
                <div className="bg-black w-full h-[1px] mb-5"></div>
                <div className="flex flex-col">
                  <h2 className="font-bold">Total Deaths</h2>
                  <p className="text-[#B43F3F]">{item.deaths.total}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No historical data available</p>
        )}
      </div>
    </div>
  );
}

export default CountryDetail;
