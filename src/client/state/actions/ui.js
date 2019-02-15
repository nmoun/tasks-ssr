export const startFetchingTasks = () => {
  return {
    type: 'UI_START_FETCHING_TASKS'
  }
}

export const stopFetchingTasks = () => {
  return {
    type: 'UI_STOP_FETCHING_TASKS'
  }
}

const showNotification = (message, status) => {
  return {
    type: 'UI_DISPLAY_NOTIFICATION',
    message,
    status
  }
}

export const hideNotification = () => {
  return {
    type: 'UI_HIDE_NOTIFICATION',
  }
}

export const displayNotification = (message, status, time = 3000) => {
  return (dispatch) => {
    dispatch(showNotification(message, status))
    setTimeout(() => {
      dispatch(hideNotification())
    }, time)
  }
}