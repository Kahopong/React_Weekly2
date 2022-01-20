import axios from "axios";

export const LOGIN_SUCCESS_ACTION = "LOGIN_SUCCESS_ACTION";
export const LOGIN_FAILURE_ACTION = "LOGIN_FAILURE_ACTION";
export const LOGOUT_NOW_ACTION = "LOGOUT_NOW_ACTION";

//Action creators
export const loginSuccessAction = () =>{
    return({
        type: LOGIN_SUCCESS_ACTION,
    })
}

export const loginFailureAction = (message)=>{
    return({
        type: LOGIN_FAILURE_ACTION,
        message: message
    })
}

export const logoutNowAction = () =>{
    return({
        type: LOGOUT_NOW_ACTION,
    })
}



//Thunk action
//=============
export const signUpThunk = (name, email, password)=>{
    return async(dispatch)=>{
        try{
            const { data } = await axios.post(`${process.env.REACT_APP_API_SERVER}/api/signup`,{
                name: name,
                email: email,
                password: password,
            })
            //if successful, data = {token: token}
            //wrong pw, data = {message: 'Wrong pw'}
            if(data == null) {
                dispatch(loginFailureAction('Unknown error'))
            } else if(!data.token) {
                dispatch(loginFailureAction(data.message || 'No token'))
            } else {
                console.log('successful sign up')
                dispatch(loginSuccessAction())
            }
        } catch (err) {
            console.log(err);
        } 
    }
}

export const loginUserThunk = (email, password) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API_SERVER}/api/login`,{
                email: email,
                password: password,
            })
            //if successful, data = {token: token}
            //wrong pw, data = {message: 'Wrong pw'}
            if(data == null) {
                dispatch(loginFailureAction('Unknown error'))
            } else if(!data.token) {
                dispatch(loginFailureAction(data.message || 'No token'))
            } else {
                localStorage.setItem("token", data.token);
                localStorage.setItem("name", data.name);
                console.log('success user login')
                dispatch(loginSuccessAction())
            }

        } catch (err) {
            console.log(err);
        } 
  }};

export const logoutNowThunk = () => {
    return (dispatch) => {
        localStorage.clear("token");
        dispatch(logoutNowAction());
    };
}

export const loginFacebookThunk = (info) =>{
    return async(dispatch) => {
        const response = await axios.post(`${process.env.REACT_APP_API_SERVER}/api/login/facebook`, {
            info: info,
        })

        // console.log(response.data)
        if (response.data == null) {
            dispatch(loginFailureAction("Unknown Error"));
        } else if (!response.data.token) {
            dispatch(loginFailureAction(response.data.message || "No token"));
        } else {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("name", response.data.name);
            console.log('success FB login')
            dispatch(loginSuccessAction())
        }
    }
};

