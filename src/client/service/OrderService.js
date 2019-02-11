import { JWT_TOKEN } from 'utils/constants'
import { denormalizeTask } from 'schemas'

export function validateTask(task) {
  const taskId = task.id,
    body = JSON.stringify(denormalizeTask(task))
  return fetch(`/api/order/${taskId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + localStorage.getItem(JWT_TOKEN),
    },
    credentials: 'same-origin',
    body
  }).catch(error => {
    console.log('error: ' + error)
    throw new Error(error)
  });
};