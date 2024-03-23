import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoItemDetails from './components/VideoItemDetails'
import SavedVideos from './components/SavedVideos'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import SaveContext from './context/SaveContext'
import './App.css'

class App extends Component {
  state = {saveList: [], isSave: false, isDark: false}

  addVideo = saveVideo => {
    const {saveList} = this.state
    const existingVideo = saveList.find(video => video.id === saveVideo.id)

    if (existingVideo) {
      const updatedSaveList = saveList.filter(
        video => video.id !== saveVideo.id,
      )
      this.setState({
        saveList: updatedSaveList,
        isSave: false, // Video is being removed, so it's not saved anymore
      })
    } else {
      this.setState(prevState => ({
        saveList: [...prevState.saveList, saveVideo],
        isSave: true, // Video is being added, so it's saved now
      }))
    }
  }

  onToggleButton = () => {
    this.setState(prevState => ({
      isDark: !prevState.isDark,
    }))
  }

  render() {
    const {saveList, isSave, isDark} = this.state
    return (
      <SaveContext.Provider
        value={{
          saveList,
          isSave,
          isDark,
          addVideo: this.addVideo,
          onToggleButton: this.onToggleButton,
        }}
      >
        <>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/trending" component={Trending} />
            <ProtectedRoute exact path="/gaming" component={Gaming} />
            <ProtectedRoute
              exact
              path="/videos/:id"
              component={VideoItemDetails}
            />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={SavedVideos}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </>
      </SaveContext.Provider>
    )
  }
}

export default App
