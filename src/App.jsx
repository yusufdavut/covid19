import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import CountryDetail from "./CountryDetail";
import NotFound from "./NotFound";
import Map from "./Map";
import { getCountryFetch } from "./redux/countrySlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountryFetch());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/:countryName" element={<CountryDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
