import React from 'react'
import ArticleCell from 'components/ArticleCell'
import ThemedPage from 'components/layout/ThemedPage'
import Header, { ICONS } from 'components/Header'
import * as selectors from 'state/reducers'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateQuantity } from 'state/actions/task'
import Footer from 'components/Footer'
import NavButton from 'components/buttons/NavButton'
import cacheImages from 'utils/cacheImages'

class OrderArticleDetail extends React.Component{

  constructor(props){
    super(props)
    this.handleChangeValue = this.handleChangeValue.bind(this)
    this.handleClickNext = this.handleClickNext.bind(this)
    this.handleClickPrevious = this.handleClickPrevious.bind(this)
    this.goBack = this.goBack.bind(this)
  }

  handleChangeValue(articleId, quantity){
    this.props.updateQuantity(this.props.taskId, articleId, quantity);
  }

  goBack(){
    this.props.history.goBack();
  }
  
  handleClickNext(){
    if(this.props.nextId){
      this.props.history.replace(`/order/${this.props.taskId}/${this.props.nextId}`)
    }
  }

  handleClickPrevious(){
    if(this.props.previousId){
      this.props.history.replace(`/order/${this.props.taskId}/${this.props.previousId}`)
    }
  }

  render(){
    const title = `Article detail ${this.props.articleIndex !== -1 ? this.props.articleIndex + 1 : 'X'}/${this.props.articles.length}`
    return <ThemedPage>
      <Header title={title} leftIcon={ICONS.LEFT} handleClickLeft={this.goBack}/>
      <ArticleCell {...this.props.article} handleChangeValue={this.handleChangeValue}/>
      <Footer>
        <NavButton text="Next" imgSrc={cacheImages["./downArrow.svg"]} handleClick={this.handleClickNext} disabled={this.props.nextId === null}/>
        <NavButton text="Prev" imgSrc={cacheImages["./upArrow.svg"]} handleClick={this.handleClickPrevious} disabled={this.props.previousId === null}/>
      </Footer>
    </ThemedPage>
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    articles: selectors.getTaskArticles(state, ownProps.taskId),
    article: selectors.getTaskArticle(state, ownProps.taskId, ownProps.articleId),
    nextId: selectors.getTaskArticleNext(state, ownProps.taskId, ownProps.articleId),
    previousId: selectors.getTaskArticlePrevious(state, ownProps.taskId, ownProps.articleId),
    articleIndex:  selectors.getTaskArticleIndex(state, ownProps.taskId, ownProps.articleId),
  }
}

const mapDispatchToProps = {
  updateQuantity
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderArticleDetail))