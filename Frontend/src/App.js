import { Routes, BrowserRouter as Router, Link, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import { LoginForm } from './Components/LoginForm'
import { SignupForm } from './Components/SignupForm'
import { Todo } from './Components/Todo'
import { logoutNowThunk, loginFailureAction } from "./Redux/auth/actions";

// Font Awesome Template
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSearch } from '@fortawesome/free-solid-svg-icons'

const  RequireAuth = ({ children, redirectTo }) => {
  let isAuthenticated = useSelector((state) => state.authStore.isAuthenticated);
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

const App = () =>{
  let isAuthenticated = useSelector((state) => state.authStore.isAuthenticated);
  
  const dispatch = useDispatch();
  return (
    <Router>
      <div className="box container">
        <div className="nav d-flex justify-content-between"> 
          <label className="nav-tag" onClick={()=>dispatch(loginFailureAction())}><Link to='/login' className="nostyle">Login</Link></label>
          {!isAuthenticated? <label className="nav-tag" onClick={()=>dispatch(loginFailureAction())}><Link to='/signup' className="nostyle">Sign Up</Link></label> : null}
          <label className="nav-tag"><Link to='/todo' className="nostyle">To-Do</Link></label>
          {isAuthenticated? <label onClick={()=>dispatch(logoutNowThunk())} className="nostyle nav-tag">Logout</label> : null}
        </div>
        
      </div>

      <Routes>
        <Route path='/' element={<Navigate to='/login' />}/>
        
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      
        <Route path="/todo" element={
            <RequireAuth redirectTo='/login'>
              <Todo />
            </RequireAuth>
          }/>

      </Routes>

      
    </Router>
  )
}


export default App;


// yarn add axios
// yarn add react-router-dom
//yarn add @fortawesome/fontawesome-svg-core
// yarn add @fortawesome/free-solid-svg-icons
// yarn add @fortawesome/react-fontawesome
// yarn add redux react-redux
// yarn add redux-logger
// yarn add redux-thunk
// yarn add react-facebook-login