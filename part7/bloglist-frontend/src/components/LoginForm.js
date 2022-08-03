import { useState } from 'react'
import PropTypes from 'prop-types'


const LoginForm = ({ handleLogin }) => {

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  const processCredentials = (event) => {
    event.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }
  return(
    <div>
      <h2>Login</h2>
      <form onSubmit={processCredentials}>
        <div>
                username
          <input
            type="text"
            id='username'
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
                password
          <input
            type="password"
            id='password'
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm