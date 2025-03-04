import { call, put, takeEvery } from "redux-saga/effects";
import { getDataFromAPI } from "./userListReducer";
import { Data } from "./data";

function getData() {
  return Data;
}

function* workFromApi() {
  

  const dataw = yield call(getData);
  yield put(getDataFromAPI(dataw));
}

export default function* mySaga() {
  yield takeEvery("GET_DATA_FROM_API", workFromApi);
}
