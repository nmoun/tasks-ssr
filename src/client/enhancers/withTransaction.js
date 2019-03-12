import React from 'react'
import { getTask, hasTaskChanged } from 'state/reducers'
import { startTransaction, stopTransaction, discardChanges } from 'state/actions/transaction'
import { createTask, saveTask } from 'state/actions/tasks'
import { openDialogConfirm, closeDialogConfirm } from 'components/dialogs/DialogConfirm'
import { connect } from 'react-redux'
import { generateTmpId } from 'utils/functions'
import { TASK_STATUS } from 'utils/constants'
import { openDialogInfo } from 'components/dialogs/DialogInfo'

/**
 * Entry in a task starts a transaction: a snapshot of the task is saved.
 * Leaving the task stops the transaction: the snapshot is deleted.
 * @param {React.Component} WrappedComponent - module needing transaction system
 * @param {object} defaultTaskFields -
 */
function withTransactionInit(WrappedComponent, defaultTaskFields){
  class WithTransactionInit extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        currentTaskId: null
      }

      let taskId = /[^\/]+\/?([^\/]*)/.exec(props.location.pathname)[1]

      if(taskId){
        this.state.currentTaskId = taskId
        props.startTransaction(this.state.currentTaskId)
      }else {
        // Create a temporary task and display it
        const { history } = props,
          newTaskId = generateTmpId()
        props.createTask({id: newTaskId, ...defaultTaskFields})
        props.startTransaction(newTaskId)
        this.state.currentTaskId = newTaskId
        history.replace(`${props.match.url}/${newTaskId}`)
      }
    }

    componentWillUnmount(){
      this.props.stopTransaction(this.state.currentTaskId)
    }

    render(){
      return <WrappedComponent taskId={this.state.currentTaskId} {...this.props}/>
    }
  }

  const mapDispatchToProps = {
    startTransaction,
    stopTransaction,
    createTask,
  }

  return connect(null, mapDispatchToProps)(WithTransactionInit)
}

/**
 * Add functionalities:
 * - Prevent task entry if the task is being processed
 * - Save or discard task's changes made during a transaction
 * @param {Reac.Component} WrappedComponent 
 * @param {object} defaultTaskFields 
 */
function withTransaction(WrappedComponent, defaultTaskFields){

  class WithTransaction extends React.Component {
    constructor(props){
      super(props)
      this.exitTask = this.exitTask.bind(this)

      // prevent task entry if the task is being processed
      if(props.task && props.task.status === TASK_STATUS.LOADING){
        openDialogInfo({message: 'Task is being processed'})
        props.history.goBack()
      }
    }

    /**
     * Exits the task and go back to the task list.
     * If the task was modified, ask to save the modifications or discard them.
     */
    exitTask(){
      const { history } = this.props
      if(!this.props.hasTaskChanged){
        history.goBack()
      } else {
        openDialogConfirm({
          isDismissible: true,
          message: 'Save changes?', 
          handleYes: () => {
            this.props.saveTask({
              ...this.props.task,
              subtitle: this.props.task.articles.length + ' article(s)'
            })
            closeDialogConfirm()
            history.goBack()
          }, 
          handleNo: () => {
            this.props.discardChanges(this.props.task.id)
            closeDialogConfirm()
            history.goBack()
          }
        })
      }
    }

    render(){
      return <WrappedComponent exitTask={this.exitTask} {...this.props} />
    }
  }

  const mapDispatchToProps = {
    discardChanges,
    saveTask,
  }

  const mapStateToProps = (state, ownProps) => {
    return {
      task: getTask(state, ownProps.taskId),
      hasTaskChanged: hasTaskChanged(state, ownProps.taskId)
    }
  }

  return withTransactionInit(connect(mapStateToProps, mapDispatchToProps)(WithTransaction), defaultTaskFields)
}

export default withTransaction