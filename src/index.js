import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import * as serviceWorker from './serviceWorker'
import * as cacheControl from './Scripts/cacheControl'

window.onload = e => {
	const data = cacheControl.onLoad() || null

	ReactDOM.render(<App updateCache={cacheControl.updateCache} data={data} /> , document.getElementById('root'))
}

serviceWorker.register();