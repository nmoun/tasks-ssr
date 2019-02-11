import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { configureStore } from "state/store/configureStore";
import { Provider } from 'react-redux'
import LabelProvider from 'labels/LabelProvider'
import defaultLang from 'labels/langs/en.json'
import { BrowserRouter as Router } from 'react-router-dom'


ReactDOM.render(<Provider store={configureStore()}>
  <LabelProvider lang={defaultLang}>
    <Router>
      <App />
    </Router>
  </LabelProvider>
</Provider>, document.getElementById('root'));