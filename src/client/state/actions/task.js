export const updateTask = (taskId, fields) =>{
  return  {
    type: "TASK_UPDATE_TASK",
    taskId,
    fields,
  }
}

export function updateQuantity(taskId, articleId, quantity){
  return {
    type: 'TASK_UPDATE_QUANTITY',
    taskId,
    articleId,
    quantity,
  }
}

export function addArticle(article, taskId){
  return {
    type: 'TASK_ADD_ARTICLE',
    taskId,
    article
  }
}

export function deleteArticle(articleId, taskId){
  return {
    type: 'TASK_DELETE_ARTICLE',
    taskId,
    articleId
  }
}

export function incrementArticle(articleId, taskId){
  return {
    type: 'TASK_INC_QUANTITY',
    taskId,
    articleId
  }
}
