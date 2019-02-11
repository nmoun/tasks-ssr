const task = (state = {articles: []}, action) => {
  switch (action.type) {

  case 'TASK_UPDATE_TASK':
    return {
      ...state,
      ...action.fields
    }
  case 'TASK_ADD_ARTICLE': 
    return {
      ...state,
      articles: state.articles.concat({...action.article, quantity: 1})
    }

  case 'TASK_DELETE_ARTICLE': 
    return {
      ...state,
      articles: state.articles.filter((article) => {
        return (article.id !== action.articleId)
      })
    }

  case 'TASK_UPDATE_QUANTITY': 
    return {
      ...state,
      articles: state.articles.map((article) => {
        return (article.id == action.articleId) ? {...article, quantity: action.quantity} : article
      })
    }

  case 'TASK_INC_QUANTITY':
    return {
      ...state,
      articles: state.articles.map((article) => {
        return (article.id == action.articleId) ? {...article, quantity: parseInt(article.quantity, 10) + 1} : article
      })
    }
  default:
    return state
  }
}

export default task