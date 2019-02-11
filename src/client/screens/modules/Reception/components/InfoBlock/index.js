import React from 'react'

import './style.scss'

function InfoBlock(props){

  function handleClick(){
    if(props.handleClick){
      props.handleClick()
    }
  }

  return <div className="info-block" onClick={handleClick}>
    <span className="info-block-text">{props.text}</span>
    {(props.handleClick) ? <div className="info-block-arrow"></div> : ""}
  </div>
}

export default InfoBlock