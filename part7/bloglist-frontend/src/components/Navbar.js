import { Link } from "react-router-dom"

const Navbar = (props) => {

  const padding = {
    paddingRight: 5
  }

  if(!props.user){
    return null
  }else{
    return (
      <div>
        <Link to='/' style={padding}>blogs</Link>
        <Link to='/users' style={padding}>users</Link>
        <span>{props.user.username} logged in <button onClick={props.logout}>Logout</button></span>
      </div>
    )
  }
}

export default Navbar