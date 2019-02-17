import { schema } from 'normalizr'

export const task = new schema.Entity('tasks', {}, {
  processStrategy: (entity) => {
    // add fields concerning UI state
    return {...entity, status: null}
  }
})
export const tasks = [task]

/**
 * normalizr does not take processStrategy into account for denormalization
 * Removes fields concerning UI state
 * @param {*} task 
 */
export const denormalizeTask = (task) => {
  /* eslint-disable no-unused-vars */
  const { status, temporary,  ...rest } = task
  return rest
}