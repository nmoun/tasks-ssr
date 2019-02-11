export function discardChanges(taskId){
  return {
    type: 'DISCARD',
    taskId,
  }
}

export function saveChanges(taskId){
  return {
    type: 'SAVE',
    taskId,
  }
}

export function startTransaction(taskId, task){
  return {
    type: 'START_TRANSACTION',
    taskId,
    task,
  }
}

export function stopTransaction(taskId){
  return {
    type: 'STOP_TRANSACTION',
    taskId
  }
}