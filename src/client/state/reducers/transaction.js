import task from './task'
import tasks from './tasks'
import * as fromTasks from './tasks'

/**
 * Keep track of the task being currently modified by the user
 * @param {function} tasksReducer - reducer handling actions affecting the list of tasks
 * @param {function} taskReducer - reducer handling actions affecting one task
 */
function transaction(tasksReducer, taskReducer){
  // Call the reducer with empty action to populate the initial state
  const initialState = {
    tasks: tasksReducer(undefined, {}),
    snapshots: {},
  }

  return function(state = initialState, action) {
    let { tasks, snapshots } = state,
      newSnapshots,
      newTasks,
      newById
    switch (action.type) {
    case 'DISCARD':
      // discard changes of current task
      if(!action.taskId){
        throw new Error('Reducer transaction: taskId required')
      }
      newSnapshots = {...snapshots}
      newById = {...tasks.byId}
      newTasks = { byId: newById }
      if(tasks.byId[action.taskId].temporary === true){
        // task on client only, just delete the task locally
        delete newById[action.taskId]
        newTasks.allIds = tasks.allIds.filter((id) => (id != action.taskId))
      } else {
        // task existing on the server, use the snapshot
        newById[action.taskId] = snapshots[action.taskId]
        newTasks.allIds = [...tasks.allIds]
      }
      delete newSnapshots[action.taskId]
      return {
        tasks: newTasks,
        snapshots: newSnapshots
      }

    case 'SAVE':
      // save changes of current task
      if(!action.taskId){
        throw new Error('Reducer transaction: taskId required')
      }
      newSnapshots = {...snapshots}
      delete newSnapshots[action.taskId]
      return {
        tasks,
        snapshots: newSnapshots,
      }

    case 'START_TRANSACTION':
      // save snapshot of current task
      if(!action.taskId){
        throw new Error('Reducer transaction: taskId required')
      }
      return {
        tasks,
        snapshots: snapshots[action.taskId] ? snapshots : {...snapshots, [action.taskId]: tasks.byId[action.taskId] },
      }

    case 'STOP_TRANSACTION':
      // ...
      if(!action.taskId){
        throw new Error('Reducer transaction: taskId required')
      }
      newSnapshots = {...snapshots}
      delete newSnapshots[action.taskId]
      return {
        tasks,
        snapshots: newSnapshots,
      }
    default:
      newTasks = {...tasks}
      if(action.type.startsWith('TASK_')){
        newTasks.byId[action.taskId] = taskReducer(tasks.byId[action.taskId], action)
      } else {
        newTasks = tasksReducer(tasks, action)
      }
      return {
        tasks: newTasks,
        snapshots
      }
    }
  }
}

export default transaction(tasks, task)

export const getTasks = function(state){
  return fromTasks.getTasks(state.tasks)
}

export const getTask = function(state, taskId){
  return fromTasks.getTask(state.tasks, taskId)
}

export const getTaskArticles = function(state, taskId){
  return fromTasks.getTaskArticles(state.tasks, taskId)
}

export const getTaskArticle = function(state, taskId, articleId){
  return fromTasks.getTaskArticle(state.tasks, taskId, articleId)
}

export const getTaskArticleIndex = function(state, taskId, articleId){
  return fromTasks.getTaskArticleIndex(state.tasks, taskId, articleId)
}

export const getTaskArticleNext = function(state, taskId, articleId){
  return fromTasks.getTaskArticleNext(state.tasks, taskId, articleId)
}

export const getTaskArticlePrevious = function(state, taskId, articleId){
  return fromTasks.getTaskArticlePrevious(state.tasks, taskId, articleId)
}

export const hasTaskChanged = function(state, taskId){
  return state.tasks.byId[taskId] !== state.snapshots[taskId]
}