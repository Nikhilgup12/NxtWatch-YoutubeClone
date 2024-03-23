import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {MdSave} from 'react-icons/md'
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

class VideoItemDetails extends Component {
  state = {
    videoDetailList: {},
    isLike: false,
    isDisLike: false,
    apiStatus: apiConstrants.initial,
  }

  componentDidMount() {
    this.getVideoDetail()
  }

  getFormattedData = each => ({
    id: each.video_details.id,
    title: each.video_details.title,
    videoUrl: each.video_details.video_url,
    thumbnailUrl: each.video_details.thumbnail_url,
    name: each.video_details.channel.name,
    profileImageUrl: each.video_details.channel.profile_image_url,
    subscriberCount: each.video_details.channel.subscriber_count,
    viewCount: each.video_details.view_count,
    publishedAt: each.video_details.published_at,
    description: each.video_details.description,
  })

  getVideoDetail = async () => {
    this.setState({apiStatus: apiConstrants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = this.getFormattedData(data)
      this.setState({
        videoDetailList: formattedData,
        apiStatus: apiConstrants.success,
      })
    } else {
      this.setState({apiStatus: apiConstrants.failure})
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
  onLike = () => {
    const {isDisLike} = this.state
    this.setState(prevState => ({
      isLike: !prevState.isLike,
    }))
    if (isDisLike) {
      this.setState(prevState => ({
        isDisLike: !prevState.isDisLike,
      }))
    }
  }

  onDisLike = () => {
    const {isLike} = this.state
    this.setState(prevState => ({
      isDisLike: !prevState.isDisLike,
    }))
    if (isLike) {
      this.setState(prevState => ({
        isLike: !prevState.isLike,
      }))
    }
  }

  renderVideoDetailView = () => (
    <SaveContext.Consumer>
      {value => {
        const {videoDetailList, isDisLike, isLike} = this.state
        const {
          profileImageUrl,
          videoUrl,
          publishedAt,
          viewCount,
          description,
          subscriberCount,
          name,
          title,
        } = videoDetailList

        const like = isLike ? 'like' : ''
        const dislike = isDisLike ? 'dislike' : ''
        const {isSave, addVideo, isDark} = value
        const isSaveClass = isSave ? 'saved' : 'trending-dark-name'
        const save = isSave ? 'Saved' : 'save'

        const trendingDetailTitle = isDark
          ? 'trending-detail-dark-heading'
          : 'trending-detail-light-heading'
        const trendingDetailname = isDark
          ? 'trending-dark-name'
          : 'trending-light-name'

        const onSaveVideo = () => {
          addVideo(videoDetailList)
        }

        return (
          <div className="video-detail-container">
            <ReactPlayer
              url={videoUrl}
              className="video-player"
              width="100%"
              controls
            />
            <h1 className={`video-detail-item-title ${trendingDetailTitle}`}>
              {title}
            </h1>
            <div className="video-item-detail">
              <div className="video-detail-views">
                <p className={`video-detail-views-para ${trendingDetailname}`}>
                  {viewCount} views
                </p>
                <p className={`video-detail-views-para ${trendingDetailname}`}>
                  {publishedAt}
                </p>
              </div>
              <div className="video-detail-like-dislike-container">
                <div className="video-detail-like-container">
                  <button onClick={this.onLike} className="like-btn">
                    <AiOutlineLike
                      className={`${like} ${trendingDetailTitle}`}
                      size={20}
                    />
                  </button>
                  <p
                    className={`video-detail-like ${like} ${trendingDetailTitle}`}
                  >
                    Like
                  </p>
                </div>
                <div className="video-detail-like-container">
                  <button onClick={this.onDisLike} className="like-btn">
                    <AiOutlineDislike
                      className={`${dislike} ${trendingDetailTitle}`}
                      size={20}
                    />
                  </button>
                  <p
                    className={`video-detail-like ${dislike} ${trendingDetailTitle}`}
                  >
                    DisLike
                  </p>
                </div>
                <div className="video-detail-like-container">
                  <button onClick={onSaveVideo} className="like-btn">
                    <MdSave size={20} className={trendingDetailTitle} />
                  </button>
                  <p
                    className={`video-detail-like ${isSaveClass} ${trendingDetailname}`}
                  >
                    {save}
                  </p>
                </div>
              </div>
            </div>
            <hr />
            <div className="video-detail-profile-container">
              <img
                src={profileImageUrl}
                className="video-detail-profile-image"
              />
              <div>
                <h1
                  className={`video-detail-profile-name ${trendingDetailTitle}`}
                >
                  {name}
                </h1>
                <p className={`video-detail-subscribe ${trendingDetailname}`}>
                  {subscriberCount} subscriber
                </p>
                <p
                  className={`video-detail-description ${trendingDetailTitle}`}
                >
                  {description}
                </p>
              </div>
            </div>
          </div>
        )
      }}
    </SaveContext.Consumer>
  )

  renderShowResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstrants.success:
        return this.renderVideoDetailView()
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
      <SaveContext.Consumer>
        {value => {
          const {isDark} = value

          const trendingVideoContainer = isDark
            ? 'trending-video-dark-container'
            : 'trending-video-light-container'

          return (
            <>
              <Navbar />
              <div className="video-detail-main-container">
                <FilterVideo />
                <div
                  className={`video-detail-item-container ${trendingVideoContainer}`}
                  data-testid="videoItemDetails"
                >
                  {this.renderShowResult()}
                </div>
              </div>
            </>
          )
        }}
      </SaveContext.Consumer>
    )
  }
}

export default VideoItemDetails
