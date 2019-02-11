
import * as actions from 'actions/tasks'
import {expect} from 'chai'
import { createStore, applyMiddleware } from 'redux'
import tasks, * as selectors from 'reducers/tasks'
import { normalize } from 'normalizr'
import { tasks as tasksSchema } from 'schemas'
import { createLogger } from 'redux-logger'

export function tasksTests(){

  describe('tasks', () => {
    let store

    before(function() {
      const logger = createLogger({});
      const middlewares = [logger]
      store = createStore(tasks, applyMiddleware(...middlewares))
    });

    describe('actions', () => {

      it('should add 1 task to the store', () => {
        const newTask = {
          "id": "56",
          "title": "Order",
          "type": "order",
          "content": {},
          "header": {},
          "articles": []
        }

        store.dispatch(actions.createTask(newTask));

        expect(store.getState().allIds).to.be.an('array').that.have.lengthOf(1)
      })

      it('should replace the task in the store by the one received from the server', () => {
        const newId = "4",
          previousTaskId = "56"
        const response = [{
          "id": newId,
          "title": "Order",
          "type": "order",
          "content": {},
          "articles": []
        }]

        const normalizedData = normalize(response, tasksSchema)

        store.dispatch(actions.receiveTasks(normalizedData));

        expect(store.getState().allIds).to.be.an('array').that.have.lengthOf(1)
        expect(store.getState().byId[newId]).to.be.an('object')
        expect(store.getState().byId[previousTaskId]).to.be.an('undefined')
      })

      it('should delete 1 task to the store', () => {
        const taskIdToDelete = "4"
        store.dispatch(actions.deleteTask(taskIdToDelete));

        expect(store.getState().allIds).to.be.an('array').that.have.lengthOf(0)
        expect(store.getState().byId[taskIdToDelete]).to.be.an('undefined')
      })
    })

    describe('selectors', () => {

      before(function() {
        // Add 2 tasks
        const response = [{
          "id": "4",
          "title": "Order",
          "type": "order",
          "content": {},
          "articles": []
        },{
          "id": "88",
          "title": "Order",
          "type": "order",
          "content": {},
          "articles": []
        }]

        const normalizedData = normalize(response, tasksSchema)

        store.dispatch(actions.receiveTasks(normalizedData));
      });

      it('should return one task', () => {
        expect(selectors.getTask(store.getState(), "4")).to.be.an('object')
      })

      it('should return an array containing 2 tasks', () => {
        expect(selectors.getTasks(store.getState())).to.be.an('array').to.have.lengthOf(2)
      })
    })

  })

}