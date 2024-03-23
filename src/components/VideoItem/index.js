import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const VideoItem = props => {
  const {video} = props
  const {
    title,
    name,
    profileImageUrl,
    thumbnailUrl,
    publishedAt,
    viewCount,
    id,
  } = video
  const dateObject = new Date(publishedAt)
  const formattedDate = `${dateObject.getFullYear()}-${
    dateObject.getMonth() + 1
  }-${dateObject.getDate()}`
  const publishDate = formatDistanceToNow(new Date(formattedDate), {
    addSuffix: true,
  })
  return (
    <>
      <Link to={`/videos/${id}`}>
        <li className="video-item">
          <img
            src={thumbnailUrl}
            className="video-item-thumbnailUrl"
            alt="video thumbnail"
          />
          <div className="video-item-profile-container">
            <img
              src={profileImageUrl}
              className="video-profile-image"
              alt="channel logo"
            />
            <div>
              <h1 className="video-item-heading">{title} </h1>
              <p className="video-item-para"> {name} </p>
              <div className="video-item-count-container">
                <p className="video-item-view">{viewCount} views</p>
                <p className="video-image-published"> {publishDate}</p>
              </div>
            </div>
          </div>
        </li>
      </Link>
    </>
  )
}

export default VideoItem
