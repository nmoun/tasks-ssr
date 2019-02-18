import React from 'react'
import { Route, withRouter} from 'react-router-dom'
import DeliveryHome from './DeliveryHome'
import withTransaction from 'enhancers/withTransaction'

class Delivery extends React.Component{

  constructor(props){
    super(props)
  }

  render(){
    return <React.Fragment>
      <Route path={`${this.props.match.path}/:taskId`} exact render={(props) => { return <DeliveryHome taskId={props.match.params.taskId} {...props}/> }} />
    </React.Fragment>
  }
}

export default withRouter(withTransaction(Delivery, {type: 'delivery', title: 'Delivery'}))