import React from 'react'
import Header, { ICONS } from 'components/Header'
import { getTask } from 'state/reducers'
import ThemedPage from 'components/layout/ThemedPage'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import InfoBlock from './components/InfoBlock'

function Reception(props){
  let {history, task} = props
  let goBack = () => {
    history.goBack()
  }
  return <ThemedPage>
    <Header title="Reception" leftIcon={ICONS.LEFT} handleClickLeft={goBack}/>
    <InfoBlock text={'Supplier: '+task.header.supplier} />
    <InfoBlock text="0/12 articles to be checked" />
  </ThemedPage>
}

Reception = withRouter(Reception)

const mapStateToProps = (state, ownProps) => ({
  task: getTask(state, ownProps.taskId),
})

export default withRouter(connect(
  mapStateToProps
)(Reception))
