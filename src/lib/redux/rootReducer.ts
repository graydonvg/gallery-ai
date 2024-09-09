import { combineReducers } from "@reduxjs/toolkit";
import { resourceReducer } from "./features/resourceSlice";

export const rootReducer = combineReducers({
  resources: resourceReducer,
});
