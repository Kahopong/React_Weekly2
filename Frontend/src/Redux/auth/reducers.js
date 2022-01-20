import {
    LOGIN_SUCCESS_ACTION,
    LOGIN_FAILURE_ACTION,
    LOGOUT_NOW_ACTION,
} from "./actions";
  
const initialState = {
    // default false, if there is a token => true
    isAuthenticated: false || localStorage.getItem("token") != null,
    message:'',
};
  
export const authReducers = (state = initialState, action) =>{
    switch (action.type) {
      case LOGIN_SUCCESS_ACTION:
        return {isAuthenticated : true, message:''}
      case LOGIN_FAILURE_ACTION:
        return {isAuthenticated : false, message : action.message}
      case LOGOUT_NOW_ACTION:
        return {isAuthenticated : false, message:''}
      default:
        return state;
    }
}