import React from 'react'
import ArticleCell from 'components/ArticleCell'

import './style.scss'

function ArticleList(props){
  let args = {}

  if(props.handleChangeValue){
    args.handleChangeValue = props.handleChangeValue
  }

  if(props.handleClickLeft){
    args.handleClickLeft = props.handleClickLeft
  }

  if(props.handleClickRemoval){
    args.handleClickRemoval = props.handleClickRemoval
  }

  return <ul className="article-list">
    {props.articles.map((article) => {
      let articleProps = {...article}
      return <li key={article.id}><ArticleCell {...articleProps} {...args}/></li>
    })}
  </ul>
}


export default ArticleList