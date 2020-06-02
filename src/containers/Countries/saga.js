import { call, put, takeLatest } from "redux-saga/effects"
import axios from "axios"
import { FETCH_DATA_REQUEST, REQUEST_DATA_FROM_DB } from "./constants"
import { fetchDataSuccess, fetchDataError, dataFromDbSuccess } from "./actions"
import localforage from "localforage"

export function* countriesRequest() {

  const requestURL = "https://api.hh.ru/areas"
  try {
    const { data } = yield call(({ method, url }) => axios({ method, url }), {
      method: "get",
      url: requestURL
    })

    yield put(fetchDataSuccess(data))

  } catch (err) {
    yield put(fetchDataError(err.response.data))
  }
}

export function* dataBaseRequest() {

  try {
    const dbData = yield localforage.getItem('areas')
    console.log("Значение areas из БД ", dbData)
    yield put(dataFromDbSuccess(dbData))
  } catch (err) {
    console.log(err)
  }
}

export default function* countriesData() {
  yield takeLatest(FETCH_DATA_REQUEST, countriesRequest)
  yield takeLatest(REQUEST_DATA_FROM_DB, dataBaseRequest)
}


