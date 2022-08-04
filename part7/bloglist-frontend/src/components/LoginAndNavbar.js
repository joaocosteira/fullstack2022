import { Link } from "react-router-dom"
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Togglable from "./Togglable";
import LoginForm from "./LoginForm";
import { logUser,logoutUser } from "../reducers/userReducer";
import loginService from "../services/login";
import blogService from '../services/blogs'


const LoginAndNavbar = (props) => {

  const padding = {
    paddingRight: 5
  }

  const { user } = useSelector(s => s.user);
  const dispatch = useDispatch();
  const loginFormRef = useRef();


  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(logUser(user))
      props.sendNotification(`Logged in as '${user.username}'`, "succ");
    } catch (exception) {
      props.sendNotification("Wrong credentials", "err");
    }
  };

  const logout = () => { dispatch(logoutUser()) };

  return(
    <>
      {
        !user ? (
          <Togglable buttonLabel="Login" ref={loginFormRef}>
            <LoginForm handleLogin={handleLogin} />
          </Togglable>
        ) :
          <div>
            <Link to='/' style={padding}>blogs</Link>
            <Link to='/users' style={padding}>users</Link>
            <span>{user.username} logged in <button onClick={logout}>Logout</button></span>
          </div>
      }
    </>
  )
}


export default LoginAndNavbar