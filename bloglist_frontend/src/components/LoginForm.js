import React from 'react'

const LoginForm = (props) => (
    <div>
        <form onSubmit={props.handleLogin}>
          <div>
            käyttäjätunnus
              <input
              type="text"
              value={props.username}
              name="Username"
              onChange={props.handleUsernameChange}
            />
          </div>
          <div>
            salasana
              <input
              type="password"
              value={props.password}
              name="Password"
              onChange={props.handlePasswordChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
    </div>
)

export default LoginForm