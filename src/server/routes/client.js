// Contains client generation
import express from 'express'
import App from 'App'
import React from 'react'
import { StaticRouter } from "react-router-dom"
import ReactDOMServer from 'react-dom/server'
import LabelProvider from 'labels/LabelProvider'
import defaultLang from 'labels/langs/en.json'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from "state/reducers"

let router = express.Router();

router.get('/',  (req, res) => {
  // Create a new Redux store instance
  const store = createStore(reducer)
  const context = {};
  const jsx = (
    <Provider store={store}>
      <LabelProvider>
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      </LabelProvider>
    </Provider>
  );
  const reactDom = ReactDOMServer.renderToString(jsx);

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(htmlTemplate(reactDom, store.getState(), defaultLang));
})


function htmlTemplate(reactDom, preloadedState, language) {
  return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <title>Tasks SSR</title>
          <link rel="stylesheet" href="./styles.css">
      </head>
      
      <body>
          <div id="root">${reactDom}</div>
          <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // http://redux.js.org/recipes/ServerRendering.html#security-considerations
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
            window.__LANG__ = ${JSON.stringify(language)}
          </script>
          <script src="./main.bundle.js"></script>
      </body>
      </html>
  `;
}

module.exports = router