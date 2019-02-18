import React from 'react'
import { Route } from 'react-router-dom'
import OrderArticleList from './OrderArticleList'
import OrderArticleDetail from './OrderArticleDetail'
import withTransaction from 'enhancers/withTransaction'

/**
 * Handles navigation in module to order articles
 */
class Order extends React.Component{

  constructor(props){
    super(props)
  }

  render(){
    const { taskId } = this.props
    return <React.Fragment>
      <Route path={`${this.props.match.path}`} exact render={(props) => {
        return <OrderArticleList taskId={taskId} {...this.props} {...props}/>
      }} />
      <Route path={`${this.props.match.path}/:articleId`} exact render={(props) => {
        return <OrderArticleDetail taskId={taskId} articleId={props.match.params.articleId}  {...this.props} {...props}/>
      }} />
    </React.Fragment>
  }
}

export default withTransaction(Order, {type: 'order', title: 'Order'})