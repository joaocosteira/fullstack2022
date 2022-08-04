import { Link } from "react-router-dom";

const User = ({ user }) => {

  if(!user){
    return null
  }else{
    console.log(user)
    return(
      <>
        <h2>{user.user.username}</h2>
        <h3>added blogs</h3>
        <ul>
          {
            user.blogs.map( b =>
              <li key={b.id}><Link to={`/blogs/${b.id}`}>{b.title}</Link></li>
            )
          }
        </ul>
      </>
    )
  }
}

export default User;