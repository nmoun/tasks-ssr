import React from 'react'

import './style.scss'

function InfoBlock(props){

  function handleClick(){
    if(props.handleClick){
      props.handleClick()
    }
  }

  const clickable = typeof props.handleClick !== 'undefined',
    blockClass = 'info-block' + ((clickable) ? ' clickable' : '')

  return <div className={blockClass} onClick={handleClick}>
    <span className="info-block-text">{props.text}</span>
    {(clickable) ? <div className="info-block-arrow"></div> : ''}
  </div>
}

export default InfoBlock