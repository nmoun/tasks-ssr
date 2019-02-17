import React from 'react'
import QuantityBlock from 'components/QuantityBlock'

import './style.scss'

class ArticleCell extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      removeDisplayed: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClickLeft = this.handleClickLeft.bind(this)
    this.handleClickRemoval = this.handleClickRemoval.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleChange(quantity){
    if(this.props.handleChangeValue){
      this.props.handleChangeValue(this.props.id, quantity)
    }
  }

  handleClickLeft(){
    if(this.props.handleClickLeft)
      this.props.handleClickLeft(this.props.id)
  }

  handleClickRemoval(){
    if(this.props.handleClickRemoval)
      this.props.handleClickRemoval(this.props.id)
  }

  handleFocus(){
    this.setState({
      removeDisplayed: true
    })
  }

  handleBlur(){
    this.setState({
      removeDisplayed: false
    })
  }

  render(){
    const classTop = 'article-cell-top' + (this.props.handleClickLeft ? ' clickable' : '')
    const classRemove = this.state.removeDisplayed ? 'clickable' : 'article-cell-bottom-hidden'

    return <div className="article-cell ">
      <div className={classTop}>
        <div className="article-cell-left" onClick={this.handleClickLeft}>
          <div><span className="article-cell-description">{this.props.description}</span></div>
          <div><span className="article-cell-composition">{this.props.composition}</span></div>
        </div>
        <div className="article-cell-right">
          <QuantityBlock
            quantity={this.props.quantity}
            handleChangeQuantity={this.handleChange}
            handleFocus={this.handleFocus}
            handleBlur={this.handleBlur}/>
        </div>
      </div>
      <div className={classRemove} onMouseDown={this.handleClickRemoval}>
        <span className="article-cell-bottom-label">Remove this article</span>
      </div>
    </div>
  }
}

export default ArticleCell