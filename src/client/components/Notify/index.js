import React from 'react'
import './style.scss'

function Notify(props){
  const handleClick = () => {
    if(props.handleClick){
      props.handleClick()
    }
  }
  let classText = "notify-text"
  switch(props.status){
  case 'error':
    classText += ' notify-error'
    break;
  case 'success':
    classText += ' notify-success'
    break;
  default:
    classText += ' notify-info'
  }
  return <div className="notify-container" onClick={handleClick}>
    <span className={classText}>{props.message}</span>
  </div>
}

export default Notify