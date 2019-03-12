import React from 'react'
import { Route, withRouter} from 'react-router-dom'
import DeliveryHome from './DeliveryHome'
import DeliveryArticleList from './DeliveryArticleList'
import DeliveryArticleDetail from './DeliveryArticleDetail'
import withTransaction from 'enhancers/withTransaction'

/**
 * Handles navigation in module to check in deliveries
 */
class Delivery extends React.Component{

  constructor(props){
    super(props)
  }

  render(){
    const { taskId } = this.props
    return <React.Fragment>
      <Route path={`${this.props.match.path}/:taskId`} exact render={(props) => {
        return <DeliveryHome taskId={taskId} {...this.props} {...props}/>
      }} />
      <Route path={`${this.props.match.path}/:taskId/articles`} exact render={(props) => {
        return <DeliveryArticleList taskId={taskId} {...this.props} {...props}/>
      }} />
      <Route path={`${this.props.match.path}/:taskId/articles/:articleId`} exact render={(props) => {
        return <DeliveryArticleDetail taskId={taskId} articleId={props.match.params.articleId} {...this.props} {...props}/>
      }} />
    </React.Fragment>
  }
}
export default withRouter(withTransaction(Delivery, {type: 'delivery', title: 'Delivery'}))