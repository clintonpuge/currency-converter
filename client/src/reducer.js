  import {
  GET_CURRENCIES,
  GET_CURRENCIES_SUCCESS,
  ON_CONVERT,
  ON_CONVERT_SUCCESS,
} from './constants';

const initialState = {
  loading: false,
  error: false,
  currencies: [],
  total: 0,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENCIES:
      return { ...state, loading: true, error: false }
    case GET_CURRENCIES_SUCCESS:
      return { ...state, loading: false, error: false, currencies: action.data}
    case ON_CONVERT:
      return { ...state, error: false }
    case ON_CONVERT_SUCCESS:
      return { ...state, error: false, total: action.data}
    default:
      return state;
  }
}
