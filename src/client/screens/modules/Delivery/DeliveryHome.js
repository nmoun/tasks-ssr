import React from 'react'
import Header, { ICONS } from 'components/Header'
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
    console.log('TODO launch delivery validation')
    this.props.history.goBack()
  }

  render(){
    let { task, articles } = this.props

    return <ThemedPage>
      <Header title="Delivery" leftIcon={ICONS.LEFT} handleClickLeft={this.props.exitTask} rightText={getLabel('task.validate')} handleClickRight={this.validateTask}/>
      <InfoBlock text={'Supplier: ' + task.content.supplier.description} />
      <InfoBlock text={`${articles.length} articles to check`} handleClick={this.handleClickArticleBlock}/>
    </ThemedPage>
  }
}

export default DeliveryHome
