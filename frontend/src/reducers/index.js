import { combineReducers } from "redux";
import iris from "./iris";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";

export default combineReducers({
  iris,
  errors,
  messages,
  auth
});
