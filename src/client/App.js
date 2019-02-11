import React, { Component } from 'react';
import routes from 'routes'
import { Switch, Route } from 'react-router-dom'

class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Switch>
        {routes.map((el) => {
          return <Route key={el.path} {...el}/>
        })}
      </Switch>
    )
  }
};

export default App;
