import React from 'react'
import {Route, withRouter} from 'react-router-dom'
import OrderArticleList from './OrderArticleList'
import OrderArticleDetail from './OrderArticleDetail'
import withTransaction from 'enhancers/withTransaction'

class Order extends React.Component{

  constructor(props){
    super(props)
  }

  render(){
    return <React.Fragment>
      <Route path={`${this.props.match.path}/:taskId`} exact render={(props) => (<OrderArticleList taskId={props.match.params.taskId} {...props}/>) } />
      <Route path={`${this.props.match.path}/:taskId/:articleId`} exact render={(props) => (<OrderArticleDetail taskId={props.match.params.taskId} articleId={props.match.params.articleId} {...props}/>)} />
    </React.Fragment>
  }
}

export default withRouter(withTransaction(Order, {type: 'order', title: 'Order'}))