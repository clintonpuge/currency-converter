import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import { GET_CURRENCIES, ON_CONVERT, ON_DOWNLOAD } from './constants';
import {
  onConvertCurrenciesSuccess,
  onConvertCurrenciesError,
  getCurrenciesSuccess, 
  getCurrenciesError,
  onDownloadError,
} from './actions';

// to avoid proxy error
const api_url = 'http://localhost:1234/api';

export function* watcherSaga() {
  yield takeLatest(GET_CURRENCIES, getCurrenciesWorkerSaga);
  yield takeLatest(ON_CONVERT, convertCurrenciesWorkerSaga);
  yield takeLatest(ON_DOWNLOAD, downloadCurrenciesWorkerSaga);
}

// get list of currencies
function fetchCurrencies() {
  return axios(`${api_url}/currencies`);
}

function* getCurrenciesWorkerSaga() {
  try {
    const response = yield call(fetchCurrencies);
    yield put(getCurrenciesSuccess(response.data));
  } catch (error) {
    yield put(getCurrenciesError());
  }
}

// convert currencies
function convertCurrencies(currencies, amount) {
  return axios(`${api_url}/converters?currency=${currencies}&amount=${amount}`);
}

function* convertCurrenciesWorkerSaga(data) {
  try {
    const { fromCurrency, toCurrency, amount } = data.data;
    const currencies = `${fromCurrency}_${toCurrency}`
    const response = yield call(convertCurrencies, currencies, amount);
    yield put(onConvertCurrenciesSuccess(response.data.result));
  } catch (error) {
    yield put(onConvertCurrenciesError());
  }
}

// download currencies
function downloadCurrencies(amountForcsv, currencies, fromCurrencyForCsv) {
  const queryStr = currencies.join('&fields=');
  return window
    .open(`${api_url}/converters/download?fields=${queryStr}&amount=${amountForcsv}&from=${fromCurrencyForCsv}`, '_self');
}

function* downloadCurrenciesWorkerSaga(data) {
  try {
    const { amountForcsv, fromCurrencyForCsv } = data.data;
    const currencies = mapCurrency(data.data.currencies);
    yield call(downloadCurrencies, amountForcsv, currencies, fromCurrencyForCsv);
  } catch (error) {
    yield put(onDownloadError());
  }
}

const mapCurrency = (currencies) => {
  return currencies.map((currency) => currency.key);
};
