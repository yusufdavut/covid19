import { call, put, takeEvery } from "redux-saga/effects";
import {
  getCountryFailure,
  getCountrySuccess,
  getCountryHistorySuccess,
  getCountryHistoryFailure,
} from "./countrySlice";

const statisticsUrl = "https://covid-193.p.rapidapi.com/statistics";
const historyUrl = "https://covid-193.p.rapidapi.com/history";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "a05d7bee86msh276e6a663214b40p1bd7c0jsn2ab8523e30ba",
    "x-rapidapi-host": "covid-193.p.rapidapi.com",
  },
};

function* fetchCountryData(action) {
  try {
    const response = yield call(() =>
      fetch(`${statisticsUrl}?country=${action.payload}`, options)
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = yield response.json();
    yield put(getCountrySuccess(data));
  } catch (error) {
    yield put(getCountryFailure(error));
  }
}

function* fetchCountryHistoryData(action) {
  try {
    const response = yield call(() =>
      fetch(`${historyUrl}?country=${action.payload}`, options)
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = yield response.json();
    yield put(getCountryHistorySuccess(data));
  } catch (error) {
    yield put(getCountryHistoryFailure(error.message));
  }
}

function* countrySaga() {
  yield takeEvery("country/getCountryFetch", fetchCountryData);
  yield takeEvery("country/getCountryHistoryFetch", fetchCountryHistoryData);
}

export default countrySaga;
