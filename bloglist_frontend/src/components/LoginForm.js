import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, password }) => (
  <div>
    <form onSubmit={handleLogin}>
      <div>
        käyttäjätunnus
        <input {...username}/>
      </div>
      <div>
        salasana
        <input {...password} />
      </div>
      <button type="submit">kirjaudu</button>
    </form>
  </div>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default LoginForm