import Navbar from '../Navbar'
import FilterVideo from '../FilterVideo'
import './index.css'

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="trending-main-container">
        <FilterVideo />

        <div className="not-found-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
            className="not-found-image"
          />
          <h1 className="not-found-heading"> Page Not Found </h1>
          <p className="not-found-para">
            We are sorry, the page you requested could not be found
          </p>
        </div>
      </div>
    </>
  )
}

export default NotFound
