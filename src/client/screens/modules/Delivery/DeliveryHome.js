import React from 'react'
import Header, { ICONS } from 'components/Header'
import { validateTask } from 'state/actions/delivery'
import { connect } from 'react-redux'
import ThemedPage from 'components/layout/ThemedPage'
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
    this.props.validateTask({
      ...this.props.task,
      subtitle: this.props.task.articles.length + ' article(s)'
    })
    this.props.history.goBack()
  }

  render(){
    let { task } = this.props

    return <ThemedPage>
      <Header title="Delivery" leftIcon={ICONS.LEFT} handleClickLeft={this.props.exitTask} rightText={getLabel('task.validate')} handleClickRight={this.validateTask}/>
      <InfoBlock text={'Supplier: ' + task.content.supplier.description} />
      <InfoBlock text={`${task.articles.length} articles to check`} handleClick={this.handleClickArticleBlock}/>
    </ThemedPage>
  }
}

export default connect(null, {validateTask})(DeliveryHome)
