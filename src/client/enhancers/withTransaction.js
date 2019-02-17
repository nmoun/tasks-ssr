import React from 'react'
import { getTask } from 'state/reducers'
import { startTransaction, stopTransaction } from 'state/actions/transaction'
import { createTask } from 'state/actions/tasks'
import { connect } from 'react-redux'
import { generateTmpId } from 'utils/functions'
import { TASK_STATUS } from 'utils/constants'
import { openDialogInfo } from 'components/dialogs/DialogInfo'

/**
 * @param {React.Component} WrappedComponent - module needing transaction system
 * @param {Object} defaultTaskFields -
 */
function withTransaction(WrappedComponent, defaultTaskFields){
  class WithTransaction extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        currentTaskId: null
      }

      if(props.task && props.task.status === TASK_STATUS.LOADING){
        openDialogInfo({message: 'Task is being processed'})
        props.history.goBack()
      }

      if(props.location.hash.length > 0){
        this.state.currentTaskId = props.location.hash.slice(1)
        props.startTransaction(this.state.currentTaskId, props.task)
      }else {
        // Root route: create a temporary task and display it
        const { history } = props,
          newTaskId = generateTmpId()
        props.createTask({id: newTaskId, ...defaultTaskFields})
        props.startTransaction(newTaskId)
        this.state.currentTaskId = newTaskId
        history.replace(`${props.match.path}/${newTaskId}`)
      }
    }

    componentWillUnmount(){
      this.props.stopTransaction(this.state.currentTaskId)
    }

    render(){
      return <WrappedComponent {...this.props} />
    }
  }

  const mapDispatchToProps = {
    startTransaction,
    stopTransaction,
    createTask,
  }

  const mapStateToProps = (state, ownProps) => {
    return {
      task: getTask(state, ownProps.location.hash.slice(1))
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(WithTransaction)
}

export default withTransaction