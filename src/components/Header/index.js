import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const logoutButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    const token = Cookies.get('jwt_token')
    console.log(token)
    history.replace('/login')
  }
  return (
    <nav className="navBar">
      <ul className="unordered">
        <Link to="/" className="LinkElement">
          <li className="listItem">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="websiteLogoHome"
            />
          </li>
        </Link>
        <div className="navItems">
          <Link to="/" className="LinkElement">
            <li className="listItem item">Home</li>
          </Link>
          <Link to="/jobs" className="LinkElement">
            <li className="listItem item">Jobs</li>
          </Link>
        </div>
        <li className="listItem">
          <button className="logoutButton" type="button" onClick={logoutButton}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
