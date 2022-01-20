import FacebookLogin from "react-facebook-login";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUserThunk, loginFacebookThunk } from "../Redux/auth/actions";
import { useNavigate } from "react-router-dom";

export const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isAuthenticated = useSelector((state) => state.authStore.isAuthenticated);
  const message = useSelector((state) => state.authStore.message);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = () => {
    dispatch(loginUserThunk(email, password));
  };

  const loginFacebook = (userInfo) =>{
    // check if accessToken exists from facebook
    if (userInfo.accessToken) {
      dispatch(loginFacebookThunk(userInfo));
    }
    return null;
  }

  // When isAuthenticated is changed to true, navigate...todo
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/todo");
    }
  }, [isAuthenticated]);

  
  return (
    //Normal Input login input fields
    //===============================
    <>
    <div className="title form text-center">
                <h1>The Task Planner</h1>
                <h6>designed by Kaho Pong © 2022</h6>
    </div>

    <div className="form-container container d-flex flex-column align-items-center">
      <div className="element-container text-center"><h1>Log In</h1></div>
      <div className="element-container"> Email:
        <input className="email-input" onChange={(e) => setEmail(e.currentTarget.value)} type="text" value={email}/>
      </div>
      
      <div className="element-container"> Password: 
          <input className="pw-input" onChange={(e) => setPassword(e.currentTarget.value)} type="text" value={password}/>
      </div>
      
      <div className="login-btn-container d-flex justify-content-around align-items-center">
            <button className="login-btn" onClick={login}>LOGIN</button>

            {/* //Facebook login component
            //========================= */}
            <FacebookLogin
                appId={process.env.REACT_APP_FACEBOOK_APP_ID || ""}
                autoLoad={false}
                fields="name,email,picture"
                // onClick={componentClicked}
                callback={loginFacebook}
                icon="fa-facebook"
            />
      </div>
      {/* {/* //Displaying message, if not logged in */}
      {isAuthenticated ? null : <p className="login-fail-msg">{message}</p>}
      
    </div>
    </>
    
  );
};
