import React from 'react'
import Header, { ICONS } from 'components/Header'
import { getTask, getTaskArticles } from 'state/reducers'
import ThemedPage from 'components/layout/ThemedPage'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import InfoBlock from './components/InfoBlock'
import { getLabel } from 'labels/LabelProvider'

class DeliveryHome extends React.Component {

  constructor(props){
    super(props)
    this.validateTask = this.validateTask.bind(this)
    this.handleClickArticleBlock = this.handleClickArticleBlock.bind(this)
  }

  handleClickArticleBlock(){
    this.props.history.push(`${this.props.match.url}/articles`)
  }

  validateTask(){
    console.log('TODO launch delivery validation')
    this.props.history.goBack()
  }

  render(){
    let { history, task, articles } = this.props
    let goBack = () => {
      history.goBack()
    }

    return <ThemedPage>
      <Header title="Delivery" leftIcon={ICONS.LEFT} handleClickLeft={goBack} rightText={getLabel('task.validate')} handleClickRight={this.validateTask}/>
      <InfoBlock text={'Supplier: ' + task.content.supplier.description} />
      <InfoBlock text={`${articles.length} articles to check`} handleClick={this.handleClickArticleBlock}/>
    </ThemedPage>
  }
}

const mapStateToProps = (state, ownProps) => ({
  task: getTask(state, ownProps.taskId),
  articles: getTaskArticles(state, ownProps.taskId),
})

export default withRouter(connect(
  mapStateToProps
)(DeliveryHome))
