import React from 'react'
import ReactDOM from 'react-dom'

function init() {
  const App = require('./index').default
  ReactDOM.render(<App />, document.getElementById('root'))
}

if (module.hot) {
  module.hot.accept('./index', init)
}

init()
