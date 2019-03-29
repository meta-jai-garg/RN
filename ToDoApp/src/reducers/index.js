import { combineReducers } from "redux";
import todos from "./todos";
import visibiltyFilter from "./visibilityFilter";

export default combineReducers({
  todos,
  visibiltyFilter
});
