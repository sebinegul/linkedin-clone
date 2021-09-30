import { SET_USER } from "../actions/actionType";
const INITIAL_STATE = {
  user: null,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
    case SET_USER: {
      return {
        ...state,
        user: action.user,
      };
    }
  }
};
export default userReducer;
