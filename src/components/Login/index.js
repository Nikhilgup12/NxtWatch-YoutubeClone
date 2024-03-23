import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isShowPassword: false,
    errorMsg: '',
    onSubmitError: false,
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  onUsername = event => {
    this.setState({username: event.target.value})
  }

  onShowPassword = () => {
    this.setState(prevState => ({
      isShowPassword: !prevState.isShowPassword,
    }))
  }

  onSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }
  onFailure = errorMsg => {
    this.setState({onSubmitError: true, errorMsg})
  }
  getLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {password, isShowPassword, username, errorMsg, onSubmitError} =
      this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <>
        <div className="login-container">
          <form className="login-form-container" onSubmit={this.getLoginForm}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              className="login-image"
            />
            <div className="username-container">
              <label htmlFor="username" className="username-label">
                USERNAME
              </label>
              <br />
              <input
                type="text"
                id="username"
                placeholder="Username"
                className="username-input"
                onChange={this.onUsername}
                value={username}
              />
            </div>
            <div className="password-container">
              <label htmlFor="password" className="username-label">
                PASSWORD
              </label>
              <br />
              {isShowPassword ? (
                <input
                  type="text"
                  id="password"
                  placeholder="Password"
                  className="username-input"
                  onChange={this.onPassword}
                  value={password}
                />
              ) : (
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="username-input"
                  onChange={this.onPassword}
                  value={password}
                />
              )}
            </div>
            <div>
              <input
                type="checkbox"
                id="showPassword"
                onClick={this.onShowPassword}
              />
              <label htmlFor="showPassword"> Show Password </label>
            </div>
            <button className="login-button" type="submit">
              {' '}
              Login{' '}
            </button>
            {onSubmitError && <p> *{errorMsg} </p>}
          </form>
        </div>
      </>
    )
  }
}

export default Login
