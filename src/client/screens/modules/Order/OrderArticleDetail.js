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
import DownArrow from 'assets/downArrow.svg'
import UpArrow from 'assets/upArrow.svg'

class OrderArticleDetail extends React.Component{

  constructor(props){
    super(props)
    this.handleChangeValue = this.handleChangeValue.bind(this)
    this.handleClickNext = this.handleClickNext.bind(this)
    this.handleClickPrevious = this.handleClickPrevious.bind(this)
    this.goBack = this.goBack.bind(this)
  }

  handleChangeValue(articleId, quantity){
    this.props.updateQuantity(this.props.taskId, articleId, quantity)
  }

  goBack(){
    this.props.history.goBack()
  }
  
  handleClickNext(){
    if(this.props.nextId){
      const newUrl = this.props.match.url.replace(/[^/]+$/, this.props.nextId)
      this.props.history.replace(newUrl)
    }
  }

  handleClickPrevious(){
    if(this.props.previousId){
      const newUrl = this.props.match.url.replace(/[^/]+$/, this.props.previousId)
      this.props.history.replace(newUrl)
    }
  }

  render(){
    const title = `Article detail ${this.props.articleIndex !== -1 ? this.props.articleIndex + 1 : 'X'}/${this.props.articles.length}`
    return <ThemedPage>
      <Header title={title} leftIcon={ICONS.LEFT} handleClickLeft={this.goBack}/>
      <ArticleCell {...this.props.article} handleChangeValue={this.handleChangeValue}/>
      <Footer>
        <NavButton text="Next" img={DownArrow} handleClick={this.handleClickNext} disabled={this.props.nextId === null}/>
        <NavButton text="Prev" img={UpArrow} handleClick={this.handleClickPrevious} disabled={this.props.previousId === null}/>
      </Footer>
    </ThemedPage>
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    article: selectors.getTaskArticle(state, ownProps.taskId, ownProps.articleId),
    nextId: selectors.getTaskArticleNext(state, ownProps.taskId, ownProps.articleId),
    previousId: selectors.getTaskArticlePrevious(state, ownProps.taskId, ownProps.articleId),
    articleIndex:  selectors.getTaskArticleIndex(state, ownProps.taskId, ownProps.articleId),
  }
}

const mapDispatchToProps = {
  updateQuantity
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderArticleDetail)