import * as api from 'service/TaskService'
import { startFetchingTasks, stopFetchingTasks, displayNotification } from './ui'
import { saveChanges } from './transaction'
import { updateTask } from './task'
import { TASK_STATUS } from 'utils/constants'

export const receiveTasks = (response) => {
  return {
    type: "RECEIVE_TASKS",
    response
  }
}

export const createTask = (task) => {
  return {
    type: "CREATE_TASK",
    task,
  }
}

export const deleteTask = (taskId) => {
  return {
    type: "DELETE_TASK",
    taskId,
  }
}

const receiveTask = (response) => {
  return {
    type: "RECEIVE_TASK",
    response
  }
}

/**
 * Fetch all the tasks
 */
export const fetchTasks = function(){
  return function(dispatch){
    dispatch(startFetchingTasks());
    return api
      .fetchTasks()
      .then((response) => {
        dispatch(receiveTasks(response))
        dispatch(stopFetchingTasks())
      })
      .catch(() => {
        dispatch(stopFetchingTasks())
        dispatch(displayNotification("Error occured while fetching tasks", 'error'))
      });
  };
}

/**
 * Creates/updates task
 * @param {*} task 
 */
export const saveTask = function(task){
  return function(dispatch){
    dispatch(updateTask(task.id, {...task, status: TASK_STATUS.LOADING}));
    dispatch(saveChanges(task.id));
    return api
      .saveTask(task)
      .then((response) => {
        dispatch(receiveTask(response))
        dispatch(deleteTask(response.tmpId))
        dispatch(displayNotification("Task has been updated"))
      })
      .catch(() => {
        dispatch(updateTask(task.id, {status: null}))
        dispatch(displayNotification("Error occured while saving the task", 'error'))
      });
  };
}