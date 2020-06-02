import { 
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  EDIT_ITEM_DATA,
  REQUEST_DATA_FROM_DB,
  DATA_FROM_DB_SUCCESS
} from "./constants"

export const fetchData = () => ({
  type: FETCH_DATA_REQUEST,
})

export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  data,
})

export const fetchDataError = (error) => ({
  type: FETCH_DATA_FAILURE,
  error,
})

export const editItem = (newData) => ({
  type: EDIT_ITEM_DATA,
  newData,
})

export const loadFromDB = () => ({
  type: REQUEST_DATA_FROM_DB,
})

export const dataFromDbSuccess = (data) => ({
  type: DATA_FROM_DB_SUCCESS,
  data
})


