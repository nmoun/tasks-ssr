import * as apiOrder from 'service/OrderService'
import { deleteTask } from './tasks'
import { updateTask } from './task'
import { displayNotification } from './ui'
import { saveChanges } from './transaction'
import { TASK_STATUS } from 'utils/constants'

export const validateTask = (task) => {
  return function(dispatch){
    dispatch(updateTask(task.id, {...task, status: TASK_STATUS.LOADING}))
    dispatch(saveChanges(task.id))
    apiOrder.validateTask(task)
      .then(() => {
        dispatch(deleteTask(task.id))
        dispatch(displayNotification("Order task has been validated"))
      })
      .catch((err) => {
        dispatch(updateTask(task.id, {status: null}))
        dispatch(displayNotification(err, 'error'))
      })
  }
}