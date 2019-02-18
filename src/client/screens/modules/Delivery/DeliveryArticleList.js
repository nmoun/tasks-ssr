import React from 'react'
import Header, { ICONS } from 'components/Header'
import ThemedPage from 'components/layout/ThemedPage'
import ArticleList from 'components/ArticleList'
import { connect } from 'react-redux'
import { updateQuantity, addArticle, deleteArticle, incrementArticle } from 'state/actions/task'
import { openDialogScan } from 'components/dialogs/DialogScan'
import { openDialogInfo } from 'components/dialogs/DialogInfo'
import * as apiArticle from 'service/ArticleService'

class DeliveryArticleList extends React.Component{
  constructor(props){
    super(props)
    this.handleChangeValue = this.handleChangeValue.bind(this)
    this.handleClickLeft = this.handleClickLeft.bind(this)
    this.handleSubmitArticleCode = this.handleSubmitArticleCode.bind(this)
    this.handleClickRemoval = this.handleClickRemoval.bind(this)
    this.openDialogScan = this.openDialogScan.bind(this)
    this.goBack = this.goBack.bind(this)
  }

  handleChangeValue(articleId, quantity){
    this.props.updateQuantity(this.props.taskId, articleId, quantity)
  }

  handleClickLeft(articleId){
    const {history, match} = this.props
    history.push(match.url + '/' + articleId)
  }

  handleSubmitArticleCode(articleCode){
    apiArticle.fetchArticle(articleCode)
      .then((res) => {
        if(res.length > 0){
          let tmp = this.props.articles.filter((article) => (article.id == res[0].id))
          if(tmp.length === 0){
            this.props.addArticle(res[0], this.props.task.id)
          }else{
            this.props.incrementArticle(tmp[0].id, this.props.task.id)
          }
        }else{
          openDialogInfo({message: `Article not found for code: ${articleCode}`})
        }
      })
  }

  handleClickRemoval(articleId){
    this.props.deleteArticle(articleId, this.props.task.id)
  }

  openDialogScan() {
    openDialogScan({
      isDismissible: true,
      message: 'Scan article code',
      handleSubmit: this.handleSubmitArticleCode,
      callWebServiceSuggest: apiArticle.fetchArticleSuggest
    })
  }

  componentDidMount(){
    // Display the popup to scan an article if there are no articles
    if(this.props.articles.length === 0)
      this.openDialogScan()
  }

  /**
   * Go back to the task list
   */
  goBack(){
    this.props.history.goBack()
  }

  render(){
    return <ThemedPage fab={true} handleClickFab={this.openDialogScan}>
      <Header title={this.props.task.title} leftIcon={ICONS.LEFT} handleClickLeft={this.goBack}/>
      {this.props.articles.length > 0 ?
        <ArticleList
          articles={this.props.articles}
          handleChangeValue={this.handleChangeValue}
          handleClickLeft={this.handleClickLeft}
          handleClickRemoval={this.handleClickRemoval}/>
        : <div>No articles</div>
      }
    </ThemedPage>
  }
}

const mapDispatchToProps = {
  updateQuantity,
  addArticle,
  deleteArticle,
  incrementArticle,
}

export default connect(
  null,
  mapDispatchToProps
)(DeliveryArticleList)