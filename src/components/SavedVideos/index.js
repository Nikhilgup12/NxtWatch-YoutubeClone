import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import FilterVideo from '../FilterVideo'
import {FaFireAlt} from 'react-icons/fa'
import SaveContext from '../../context/SaveContext'
import SaveItem from '../SaveItem'
import './index.css'

const SavedVideos = () => (
  <SaveContext.Consumer>
    {value => {
      const {saveList, isDark} = value
      const trendingThumbnailContainer = isDark
        ? 'trending-dark-thumbnail'
        : 'trending-light-thumbnail'
      const trendingIcon = isDark
        ? 'dark-icon-container'
        : 'light-icon-container'
      const trendingThumbnailHeading = isDark
        ? 'trending-thumbnail-dark-heading'
        : 'trending-thumbnail-light-heading'

      const trendingVideoContainer = isDark
        ? 'trending-video-dark-container'
        : 'trending-video-light-container'

      const renderTrendingThumbnail = () => (
        <div
          className={`trending-thumbnail-container ${trendingThumbnailContainer}`}
        >
          <div className={`trending-icon-container ${trendingIcon}`}>
            <FaFireAlt size={25} color="#ff0000" />
          </div>
          <h1
            className={`trending-thumbnail-heading ${trendingThumbnailHeading}`}
          >
            Saved Videos
          </h1>
        </div>
      )

      return (
        <>
          <Navbar />
          <div className="trending-main-container">
            <FilterVideo />
            {saveList.length === 0 ? (
              <div className="no-saved-video-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                  className="no-saved-video"
                />
                <h1 className="no-saved-video-heading">
                  No saved videos found
                </h1>
                <p className="no-saved-video-para">
                  You can save your videos while watching them
                </p>
              </div>
            ) : (
              <div
                className={`trending-video-container ${trendingVideoContainer}`}
                data-testid="savedVideos"
              >
                {renderTrendingThumbnail()}

                <ul className="save-video-list-container">
                  {saveList.map(each => (
                    <SaveItem video={each} key={each.id} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )
    }}
  </SaveContext.Consumer>
)

export default SavedVideos
