
import {expect} from 'chai'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import task from 'state/reducers/task'
import * as actions from 'state/actions/task'

export function taskTests(){

  describe('task', () => {
    let store

    before(function() {
      // const logger = createLogger({});
      // const middlewares = [logger]
      store = createStore(task)
    });

    describe('actions', () => {

      it('should add 1 article', () => {
        const newArticle = {
          "id": "123",
          "description": "Coca Cola 1.5L"
        }

        store.dispatch(actions.addArticle(newArticle));

        expect(store.getState().articles).to.be.an('array').that.have.lengthOf(1)
      })

      it('should update quantity', () => {

        store.dispatch(actions.updateQuantity(null, "123", 10));

        expect(store.getState().articles[0].quantity).to.equal(10)
      })
    })

  })

}