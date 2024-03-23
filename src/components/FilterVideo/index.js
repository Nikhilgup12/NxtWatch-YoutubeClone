import {Link} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {FaFireAlt} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {MdSave} from 'react-icons/md'
import SaveContext from '../../context/SaveContext'
import './index.css'

const FilterVideo = () => (
  <SaveContext.Consumer>
    {value => {
      const {isDark} = value
      const dashboardContainer = isDark
        ? 'dashboardContainer-dark'
        : 'dashboardContainer-light'
      const navItem = isDark ? 'navItem-dark' : 'navItem-light'
      return (
        <>
          <div className={`home-dashboard-container ${dashboardContainer}`}>
            <div>
              <Link to="/">
                <div className={`nav-items ${navItem}`}>
                  <IoMdHome size={20} />
                  <p className={`nav-menu-items ${navItem}`}> Home </p>
                </div>
              </Link>
              <Link to="trending">
                <div className={`nav-items ${navItem}`}>
                  <FaFireAlt />
                  <p className={`nav-menu-items ${navItem}`}> Trending </p>
                </div>
              </Link>
              <Link to="/gaming">
                <div className={`nav-items ${navItem}`}>
                  <SiYoutubegaming />
                  <p className={`nav-menu-items ${navItem}`}> Gaming </p>
                </div>
              </Link>
              <Link to="/saved-videos">
                <div className={`nav-items ${navItem}`}>
                  <MdSave />
                  <p className={`nav-menu-items ${navItem}`}> Save videos </p>
                </div>
              </Link>
            </div>
            <div className="home-user-detail-container">
              <h1 className={`home-contact-heading ${navItem}`}>
                {' '}
                Contact Us{' '}
              </h1>
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  className="facebook-image"
                  alt="facebook logo"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
                  className="facebook-image"
                  alt="twitter logo"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  className="facebook-image"
                  alt="linked in logo"
                />
              </div>
              <p className={`home-contact-para ${navItem}`}>
                {' '}
                Enjoy! Now to see your channel and recommendations!
              </p>
            </div>
          </div>
        </>
      )
    }}
  </SaveContext.Consumer>
)
export default FilterVideo
