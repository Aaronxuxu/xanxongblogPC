import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import showMore from "./reducers/showMore";
import sampleReelsPage from "./reducers/sampleReelsPage";
export default createStore(
  combineReducers({ showMore, sampleReelsPage }),
  applyMiddleware(thunk)
);
