import {
  GET_CURRENCIES,
  GET_CURRENCIES_FAILURE,
  GET_CURRENCIES_SUCCESS,
  ON_CONVERT,
  ON_CONVERT_FAILURE,
  ON_CONVERT_SUCCESS,
  ON_DOWNLOAD,
  ON_DOWNLOAD_FAILURE,
  ON_DOWNLOAD_SUCCESS,
} from './constants';

export function getCurrencies() {
  return {
    type: GET_CURRENCIES,
  };
}

export function getCurrenciesSuccess(data) {
  return {
    type: GET_CURRENCIES_SUCCESS,
    data,
  };
}

export function getCurrenciesError() {
  return {
    type: GET_CURRENCIES_FAILURE,
  };
}


export function onConvertCurrencies(data) {
  return {
    type: ON_CONVERT,
    data,
  };
}

export function onConvertCurrenciesSuccess(data) {
  return {
    type: ON_CONVERT_SUCCESS,
    data,
  };
}

export function onConvertCurrenciesError() {
  return {
    type: ON_CONVERT_FAILURE,
  };
}

export function onDownload(data) {
  return {
    type: ON_DOWNLOAD,
    data,
  };
}

export function onDownloadSuccess(data) {
  return {
    type: ON_DOWNLOAD_SUCCESS,
    data,
  };
}

export function onDownloadError() {
  return {
    type: ON_DOWNLOAD_FAILURE,
  };
}