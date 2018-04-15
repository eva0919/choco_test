import { combineReducers } from "redux";
import dramasReducer from "./dramas_reducer";

const rootReducer = combineReducers({
  dramas: dramasReducer
});

export default rootReducer;
