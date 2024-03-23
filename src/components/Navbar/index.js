import {Component} from 'react'
import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import {IoIosMoon} from 'react-icons/io'
import {BsBrightnessHigh} from 'react-icons/bs'
import {GiHamburgerMenu} from 'react-icons/gi'
import NavbarMobile from '../NavbarMobile'
import SaveContext from '../../context/SaveContext'

import './index.css'

class Navbar extends Component {
  state = {isNavbarOpen: false}

  ontogglebar = () => {
    this.setState(prevState => ({
      isNavbarOpen: !prevState.isNavbarOpen,
    }))
  }

  onLogoutBtn = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const {isNavbarOpen} = this.state
    return (
      <SaveContext.Consumer>
        {value => {
          const {isDark, onToggleButton} = value

          const onClickToggle = () => {
            onToggleButton()
          }
          const isDarkLightIcon = isDark ? (
            <BsBrightnessHigh aria-label="close" size={30} color="#ffffff" />
          ) : (
            <IoIosMoon aria-label="close" size={30} />
          )
          const navLogo = isDark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          const navContainer = isDark
            ? 'navContainer-dark'
            : 'navContainer-light'

          const navLogoutButton = isDark
            ? 'isDark-logout-btn'
            : 'isLight-logout-btn'
          return (
            <nav className={`nav-container ${navContainer}`}>
              <div className="nav-content">
                <Link to="/">
                  <img src={navLogo} className="nav-logo" />
                </Link>
                <div className="nav-section-desktop">
                  <button
                    className="nav-dark-light-btn-desktop"
                    onClick={onClickToggle}
                  >
                    {isDarkLightIcon}
                  </button>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    className="nav-profile" alt="profile"
                  />
                  <Popup
                    modal
                    trigger={
                      <button
                        className={`nav-logut-btn-desktop ${navLogoutButton}`}
                      >
                        Logout
                      </button>
                    }
                    position="bottom-center"
                  >
                    {close => (
                      <div className="home-logout-container">
                        <h1 className="logout-heading">
                          Are you sure, you want to logout?
                        </h1>
                        <div className="logout-option-btn">
                          <button
                            className="logout-cancel-btn"
                            onClick={() => close()}
                          >
                            Cancel
                          </button>
                          <button
                            className="logout-confirm-btn"
                            onClick={this.onLogoutBtn}
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    )}
                  </Popup>
                </div>

                <div className="nav-section-mobile">
                  <button className="nav-dark-light-btn-mobile">
                    <IoIosMoon aria-label="close" size={30} />
                  </button>
                  <button
                    className="nav-hamburger-icon"
                    onClick={this.ontogglebar}
                  >
                    <GiHamburgerMenu aria-label="close" size={28} />
                  </button>
                </div>
              </div>
              {isNavbarOpen && <NavbarMobile closeNavbar={this.ontogglebar} />}
            </nav>
          )
        }}
      </SaveContext.Consumer>
    )
  }
}

export default withRouter(Navbar)
