import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import userReducer, {
  initialState as userState,
} from "libs/reducers/userReducer";
import pageNavReducer, {
  initialState as pageNavState,
} from "libs/reducers/pageNavReducer";
import competitionsReducer, {
  initialState as competitionsState,
} from "./competitionsReducer";
import usersReducer, { initialState as usersState } from "./usersReducer";

export const initialStates = {
  competitions: competitionsState,
  current_user: {},
  user: userState,
  users: usersState,
  pageNav: pageNavState,
};

export default combineReducers({
  competitions: competitionsReducer,
  current_user: (state = {}) => state,
  user: userReducer,
  users: usersReducer,
  pageNav: pageNavReducer,
  routerReducer,
});
