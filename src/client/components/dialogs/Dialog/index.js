import ReactDOM from 'react-dom'
import React from 'react'

import './style.scss'

function Dialog(props){

  function handleClickOverlay(){
    if(props.isDismissible === true){
      closeDialog()
    }
  }

  function handleClickPopup(e){
    e.stopPropagation()
  }

  const dialogStyle = props.showOverflow === true ? {overflow: 'visible'} : {}

  return <div className="overlay" onClick={handleClickOverlay}>
    <div style={dialogStyle} className="dialog" onClick={handleClickPopup}>{props.children}</div>
  </div>
}

export function openDialog(content, props){
  const container = document.createElement('div')
  container.setAttribute('id', 'dialog-container')
  const {isDismissible, showOverflow, ...rest} = props
  const Content = content
  ReactDOM.render(<Dialog isDismissible={isDismissible} showOverflow={showOverflow}>
    <Content {...rest}/>
  </Dialog>, document.body.appendChild(container))
}

export function closeDialog(){
  const container = document.getElementById('dialog-container')
  if(container){
    ReactDOM.unmountComponentAtNode(container)
    document.body.removeChild(container) 
  } 
}