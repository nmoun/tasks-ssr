import React from 'react'
import { Route, withRouter} from 'react-router-dom'
import ReceptionHome from './ReceptionHome'
import withTransaction from 'enhancers/withTransaction'

class Reception extends React.Component{

  constructor(props){
    super(props)
  }

  render(){
    return <React.Fragment>
      <Route path={`${this.props.match.path}/:taskId`} exact render={(props) => { return <ReceptionHome taskId={props.match.params.taskId} {...props}/> }} />
    </React.Fragment>
  }
}

export default withRouter(withTransaction(Reception, {type: "reception", title: "Reception"}))