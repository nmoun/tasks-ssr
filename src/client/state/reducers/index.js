import { combineReducers } from 'redux'
import transaction from './transaction'
import ui from './ui'
import * as fromTransaction from './transaction'
import * as fromUI from './ui'

export default combineReducers({
  transaction,
  ui
})

export const getTaskArticles = function(state, taskId){
  return fromTransaction.getTaskArticles(state.transaction, taskId)
}

export const getTaskArticle = function(state, taskId, articleId){
  return fromTransaction.getTaskArticle(state.transaction, taskId, articleId)
}

export const getTaskArticleIndex = function(state, taskId, articleId){
  return fromTransaction.getTaskArticleIndex(state.transaction, taskId, articleId)
}

export const getTaskArticleNext = function(state, taskId, articleId){
  return fromTransaction.getTaskArticleNext(state.transaction, taskId, articleId)
}

export const getTaskArticlePrevious = function(state, taskId, articleId){
  return fromTransaction.getTaskArticlePrevious(state.transaction, taskId, articleId)
}

export const getTasks = function(state){
  return fromTransaction.getTasks(state.transaction)
}

export const getTask = function(state, taskId){
  return fromTransaction.getTask(state.transaction, taskId)
}

export const hasTaskChanged = function(state, taskId){
  return fromTransaction.hasTaskChanged(state.transaction, taskId)
}

export const getIsFetching = function(state){
  return fromUI.getIsFetching(state.ui)
}

export const getNotification = function(state){
  return fromUI.getNotification(state.ui)
}