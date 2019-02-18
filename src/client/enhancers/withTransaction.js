import React from 'react'
import { getTask, getTaskArticles, hasTaskChanged } from 'state/reducers'
import { startTransaction, stopTransaction, discardChanges } from 'state/actions/transaction'
import { createTask, saveTask } from 'state/actions/tasks'
import { openDialogConfirm, closeDialogConfirm } from 'components/dialogs/DialogConfirm'
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

      this.exitTask = this.exitTask.bind(this)

      if(props.task && props.task.status === TASK_STATUS.LOADING){
        openDialogInfo({message: 'Task is being processed'})
        props.history.goBack()
      }

      let taskId
      if(props.match.params.taskId){
        taskId = props.match.params.taskId
      }

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
        history.replace(`${props.match.path}/${newTaskId}`)
      }
    }

    /**
     * Exits the task and go back to the task list
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
              subtitle: this.props.articles.length + ' article(s)'
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

    componentWillUnmount(){
      this.props.stopTransaction(this.state.currentTaskId)
    }

    render(){
      return <WrappedComponent taskId={this.state.currentTaskId} exitTask={this.exitTask} {...this.props} />
    }
  }

  const mapDispatchToProps = {
    startTransaction,
    stopTransaction,
    createTask,
    discardChanges,
    saveTask,
  }

  const mapStateToProps = (state, ownProps) => {
    return {
      task: getTask(state, ownProps.match.params.taskId),
      articles: getTaskArticles(state, ownProps.match.params.taskId),
      hasTaskChanged: hasTaskChanged(state, ownProps.match.params.taskId)
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(WithTransaction)
}

export default withTransaction