import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutNowThunk, signUpThunk } from "../Redux/auth/actions";
import { useNavigate } from "react-router-dom";

export const SignupForm = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isAuthenticated = useSelector((state) => state.authStore.isAuthenticated);
  const message = useSelector((state) => state.authStore.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const signup = () => {
    dispatch(signUpThunk(name, email, password));
  };

  // When isAuthenticated is changed to true, navigate...
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(logoutNowThunk())
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <>
    <div className="title form text-center">
                <h1>The Task Planner</h1>
                <h6>designed by Kaho Pong © 2022</h6>
    </div>

    <div className="form-container container d-flex flex-column align-items-center">
      <div className="element-container text-center"><h1>Sign Up</h1></div>
      <div className="element-container"> Name:
        <input className="name-input" onChange={(e) => setName(e.currentTarget.value)} type="text" value={name}/>
      </div>
      
      <div className="element-container"> Email:
        <input className="email-input" onChange={(e) => setEmail(e.currentTarget.value)} type="text" value={email}/>
      </div>
      
      <div className="element-container"> Password:
        <input className="pw-input" onChange={(e) => setPassword(e.currentTarget.value)} type="text" value={password}/>
      </div>

      <div className="login-btn-container d-flex justify-content-around align-items-center">
      <button className="signup-btn" onClick={signup}>SIGN UP</button>
      </div>
      {isAuthenticated ? null : <p className="signup-fail-msg">{message}</p>}
    </div>
    </>
  );
};
