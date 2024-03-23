import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {FaFireAlt} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {MdSave} from 'react-icons/md'
import './index.css'

const NavbarMobile = props => {
  const {closeNavbar} = props
  const onLogoutBtn = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <>
      <div className="navbar">
        <div>
          <div className="user-section">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              className="nav-profile"
            />
            <div className="close-button" onClick={closeNavbar}>
              &times;
            </div>
          </div>
          <div className="navbar-mobile-user-detail-container">
            <div>
              <Link to="/">
                <div className="nav-item">
                  <IoMdHome color="#ff0000" size={20} />
                  <p className="nav-menu-items"> Home </p>
                </div>
              </Link>
              <Link to="/trending">
                <div className="nav-item">
                  <FaFireAlt color="#ff0000" size={20} />
                  <p className="nav-menu-items"> Trending </p>
                </div>
              </Link>
              <Link to="/gaming">
                <div className="nav-item">
                  <SiYoutubegaming color="#ff0000" size={20} />
                  <p className="nav-menu-items"> Gaming </p>
                </div>
              </Link>
              <Link to="/saved-videos">
                <div className="nav-item">
                  <MdSave color="#ff0000" size={20} />
                  <p className="nav-menu-items"> Save videos </p>
                </div>
              </Link>
              <Popup
                modal
                trigger={
                  <div className="navbar-mobile-logout-container">
                    <button className="nav-logut-btn-mobile">Logout</button>
                  </div>
                }
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
                        onClick={onLogoutBtn}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
            <div className="home-user-detail-container">
              <h1 className="home-contact-heading"> Contact Us </h1>
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  className="facebook-image"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
                  className="facebook-image"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  className="facebook-image"
                />
              </div>
              <p> Enjoy! Now to see your channel and recommendations!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(NavbarMobile)
