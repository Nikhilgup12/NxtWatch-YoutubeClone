import React from 'react'

const SaveContext = React.createContext({
  saveList: [],
  isSave: false,
  addVideo: () => {},
  isDark: false,
  onToggleButton: () => {},
})

export default SaveContext
