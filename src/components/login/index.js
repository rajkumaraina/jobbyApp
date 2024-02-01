import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', error: false, errorMsg: ''}

  detailSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      const {history} = this.props
      history.replace('/')
      this.setState({username: '', password: ''})
    } else {
      this.setState({error: true, errorMsg: data.error_msg})
    }
  }

  usernameChange = event => {
    this.setState({username: event.target.value})
  }

  passwordChange = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {error, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="loginPage">
        <div className="loginContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="websiteLogo"
          />
          <form onSubmit={this.detailSubmit} className="formElement">
            <label className="labelElement" htmlFor="username">
              USERNAME
            </label>
            <input
              onChange={this.usernameChange}
              type="text"
              id="username"
              placeholder="Username"
              className="inputElement"
            />
            <label className="labelElement" htmlFor="password">
              PASSWORD
            </label>
            <input
              onChange={this.passwordChange}
              type="password"
              id="password"
              placeholder="Password"
              className="inputElement"
            />
            <button type="submit" className="loginButton">
              Login
            </button>
            {error ? <p className="error">*{errorMsg}</p> : null}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
