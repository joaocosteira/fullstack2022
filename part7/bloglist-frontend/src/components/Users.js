import { Link } from "react-router-dom";

const Users = ({ users })  => {


  console.log(users)
  return(
    <>
      <h2>Users Page</h2>
      <table>
        <thead>
          <tr>
            <td></td>
            <td><b>Blogs Created</b></td>
          </tr>
        </thead>
        <tbody>
          { Object.keys(users).map(u =>
            <tr key={u} >
              <td><Link to={`/users/${users[u].user.id}`}>{u}</Link></td>
              <td>{users[u].blogs.length}</td>
            </tr>
          )
          }
        </tbody>
      </table>
    </>
  )
}

export default Users;