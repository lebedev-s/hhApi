import produce from "immer"
import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, EDIT_ITEM_DATA, REQUEST_DATA_FROM_DB, DATA_FROM_DB_SUCCESS } from "./constants"
import flatten from "../../lib/flatten"
import localforage from "localforage"


export const initialState = {
  data: [],
  loading: false,
  error: undefined,
};

const countriesReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FETCH_DATA_REQUEST:
        draft.loading = true
        draft.error = undefined
        break
      case FETCH_DATA_SUCCESS:
        const flattenData = flatten(action.data)
        draft.loading = false
        draft.data = flattenData
        localforage.setItem('areas', flattenData)
        break
      case FETCH_DATA_FAILURE:
        draft.loading = false
        draft.error = action.error
        break
      case EDIT_ITEM_DATA:
        draft.data.filter((item, index) => {
          if (item.id === action.newData.data.id) {
            draft.data.splice(index, 1)
          }
        })
        draft.data.push(action.newData.data)
        break
      case REQUEST_DATA_FROM_DB:
        draft.loading = true
        draft.error = undefined
        break
      case DATA_FROM_DB_SUCCESS:
        draft.loading = false
        draft.data = action.data
        break

      default:
        return state
    }
  })

export default countriesReducer
