import { combineReducers } from "redux";
import Reducer from "../reducer/reducer";

const rootReducer = combineReducers({
  data: Reducer,
});

export default rootReducer;
