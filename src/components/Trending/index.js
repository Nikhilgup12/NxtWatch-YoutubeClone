import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaFireAlt} from 'react-icons/fa'
import Navbar from '../Navbar'
import FilterVideo from '../FilterVideo'
import SaveContext from '../../context/SaveContext'

import './index.css'

const apiConstrants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Trending extends Component {
  state = {trendingVideo: [], apiStatus: apiConstrants.initial}

  componentDidMount() {
    this.getTrendingVideo()
  }

  getFormateData = each => ({
    id: each.id,
    title: each.title,
    thumbnailUrl: each.thumbnail_url,
    name: each.channel.name,
    profileImageUrl: each.channel.profile_image_url,
    viewCount: each.view_count,
    publishedAt: each.published_at,
  })

  getTrendingVideo = async () => {
    this.setState({apiStatus: apiConstrants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formateData = data.videos.map(each => this.getFormateData(each))
      this.setState({
        trendingVideo: formateData,
        apiStatus: apiConstrants.success,
      })
    } else {
      this.setState({apiStatus: apiConstrants.failure})
    }
  }

  onfailureRetryBtn = () => {
    this.getTrendingVideo()
  }

  renderTrendingThumbnail = () => (
    <SaveContext.Consumer>
      {value => {
        const {isDark} = value
        const trendingThumbnailContainer = isDark
          ? 'trending-dark-thumbnail'
          : 'trending-light-thumbnail'
        const trendingIcon = isDark
          ? 'dark-icon-container'
          : 'light-icon-container'
        const trendingThumbnailHeading = isDark
          ? 'trending-thumbnail-dark-heading'
          : 'trending-thumbnail-light-heading'

        return (
          <div
            className={`trending-thumbnail-container ${trendingThumbnailContainer}`}
          >
            <div className={`trending-icon-container ${trendingIcon}`}>
              <FaFireAlt size={25} color="#ff0000" />
            </div>
            <h1
              className={`trending-thumbnail-heading ${trendingThumbnailHeading}`}
            >
              Trending
            </h1>
          </div>
        )
      }}
    </SaveContext.Consumer>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#00306e" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="home-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        className="home-failure-image"
        alt="failure view"
      />
      <h1 className="home-failure-heading"> Oops Something Went Wrong </h1>
      <p className="home-failure-para">
        We are having some trouble to complete your request Please try again{' '}
      </p>
      <button className="home-failure-btn" onClick={this.onfailureRetryBtn}>
        Retry
      </button>
    </div>
  )

  renderTrendingVideo = () => (
    <SaveContext.Consumer>
      {value => {
        const {isDark} = value
        const {trendingVideo} = this.state

        const trendingVideoContainer = isDark
          ? 'trending-video-dark-container'
          : 'trending-video-light-container'
        const trendingDetailTitle = isDark
          ? 'trending-detail-dark-heading'
          : 'trending-detail-light-heading'
        const trendingDetailname = isDark
          ? 'trending-dark-name'
          : 'trending-light-name'

        return (
          <div
            className={`trending-video-container ${trendingVideoContainer}`}
            data-testid="trending"
          >
            {this.renderTrendingThumbnail()}
            <ul className="trending-All-video-list">
              {trendingVideo.map(each => (
                <Link to={`/videos/${each.id}`} className="trending-link">
                  <li className="trending-video-list">
                    <img
                      src={each.thumbnailUrl}
                      className="trending-video-image"
                    />
                    <div className="trending-video-detail-container">
                      <h1
                        className={`trending-video-title ${trendingDetailTitle}`}
                      >
                        {each.title}
                      </h1>
                      <p
                        className={`trending-video-name ${trendingDetailname}`}
                      >
                        {each.name}
                      </p>
                      <div className="trending-video-count-container">
                        <p className={trendingDetailname}>
                          {each.viewCount} Views
                        </p>
                        <p className={trendingDetailname}>{each.publishedAt}</p>
                      </div>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )
      }}
    </SaveContext.Consumer>
  )

  renderShowResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstrants.success:
        return this.renderTrendingVideo()
      case apiConstrants.failure:
        return this.renderFailureView()
      case apiConstrants.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="trending-main-container">
          <FilterVideo />
          {this.renderShowResult()}
        </div>
      </>
    )
  }
}

export default Trending
