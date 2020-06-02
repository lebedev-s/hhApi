import { combineReducers } from "redux";
import countriesReducer from "../containers/Countries/reducer";

const rootReducer = combineReducers({
  countries: countriesReducer,
});

export default rootReducer;
