import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {IoMdClose} from 'react-icons/io'
import {IoSearch} from 'react-icons/io5'
import VideoItem from '../VideoItem'
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

class Home extends Component {
  state = {
    closeThumbnail: true,
    videoList: [],
    searchInput: '',
    apiStatus: apiConstrants.initial,
  }

  componentDidMount() {
    this.getAllVideoList()
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

  getAllVideoList = async () => {
    this.setState({apiStatus: apiConstrants.loading})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
      this.setState({videoList: formateData, apiStatus: apiConstrants.success})
    } else {
      this.setState({apiStatus: apiConstrants.failure})
    }
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearch = event => {
    if (event.key === 'Enter') {
      this.getAllVideoList()
    }
  }

  onfailureRetryBtn = () => {
    this.getAllVideoList()
  }

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

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#00306e" height="50" width="50" />
    </div>
  )

  onThumbnailToggle = () => {
    this.setState({closeThumbnail: false})
  }

  renderThumbnail = () => {
    const {closeThumbnail} = this.state
    return (
      <>
        {closeThumbnail ? (
          <div className="home-thumbnail-image-container" data-testid="banner">
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                className="thumbnail-logo"
                alt="channel logo"
              />
              <p className="thumbnail-para">
                {' '}
                Buy Nxt Watch premium prepaid plans with UPI{' '}
              </p>
              <button className="thumbnail-btn"> GET IT NOW </button>
            </div>
            <div>
              <button
                className="thumbnail-close-btn"
                onClick={this.onThumbnailToggle}
                data-testid="close"
              >
                <IoMdClose aria-label="close" size={20} />
              </button>
            </div>
          </div>
        ) : (
          ''
        )}
      </>
    )
  }

  renderHomeVideo = () => (
    <SaveContext.Consumer>
      {value => {
        const {isDark} = value
        const {videoList} = this.state
        const homeContainer = isDark
          ? 'dark-video-container'
          : 'light-video-container'
        const homeInputContainer = isDark
          ? 'dark-input-container'
          : 'light-input-container'
        const homeSearchInput = isDark
          ? 'dark-search-input'
          : 'light-search-input'
        const searchBtn = isDark ? 'dark-search-btn' : 'light-search-btn'
        return (
          <>
            <div
              className={`home-video-container ${homeContainer}`}
              data-testid="home"
            >
              {this.renderThumbnail()}
              <div className="home-video-list-container">
                <div className={`home-input-container ${homeInputContainer}`}>
                  <input
                    type="search"
                    placeholder="Search"
                    className={`home-search-input ${homeSearchInput}`}
                    onChange={this.onSearchInput}
                    onKeyDown={this.onEnterSearch}
                  />
                  <div>
                    <button
                      className={`home-search-icon-btn ${searchBtn}`}
                      data-testid="searchButton"
                    >
                      <IoSearch size={20} />
                    </button>
                  </div>
                </div>
                {videoList.length === 0 ? (
                  <div className="no-video-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                      className="no-video-found"
                      alt="no videos"
                    />
                    <h1 className="no-video-heading">
                      {' '}
                      No Search results found{' '}
                    </h1>
                    <p className="no-video-para">
                      {' '}
                      Try different key words or remove search filter{' '}
                    </p>
                    <button className="no-video-btn"> Retry </button>
                  </div>
                ) : (
                  <ul className="video-list">
                    {videoList.map(each => (
                      <VideoItem video={each} />
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </>
        )
      }}
    </SaveContext.Consumer>
  )

  renderShowResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstrants.success:
        return this.renderHomeVideo()
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
        <div className="home-main-container">
          <FilterVideo />
          {this.renderShowResult()}
        </div>
      </>
    )
  }
}

export default Home
