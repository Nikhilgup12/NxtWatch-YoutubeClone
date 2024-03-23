import {Link} from 'react-router-dom'
import SaveContext from '../../context/SaveContext'
import './index.css'

const SaveItem = props => (
  <SaveContext.Consumer>
    {value => {
      const {isDark} = value
      const {video} = props
      const {title, name, id, thumbnailUrl, viewCount, publishedAt} = video
      const trendingDetailTitle = isDark
        ? 'trending-detail-dark-heading'
        : 'trending-detail-light-heading'
      const trendingDetailname = isDark
        ? 'trending-dark-name'
        : 'trending-light-name'

      return (
        <>
          <Link to={`/videos/${id}`} className="trending-link">
            <li className="trending-video-list">
              <img src={thumbnailUrl} className="save-video-image" />
              <div className="trending-video-detail-container">
                <h1 className={`trending-video-title ${trendingDetailTitle}`}>
                  {title}
                </h1>
                <p className={`trending-video-name ${trendingDetailname}`}>
                  {name}
                </p>
                <div className="trending-video-count-container">
                  <p className={trendingDetailname}> {viewCount} Views </p>
                  <p className={trendingDetailname}> {publishedAt} </p>
                </div>
              </div>
            </li>
          </Link>
        </>
      )
    }}
  </SaveContext.Consumer>
)

export default SaveItem
