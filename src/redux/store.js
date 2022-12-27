import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import showMore from "./reducers/showMore";

export default createStore(
  combineReducers({ showMore }),
  applyMiddleware(thunk)
);
