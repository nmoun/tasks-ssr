import React from 'react'
import './style.scss'

function Fab(props){
  function handleClick(){
    if(props.handleClickFab)
      props.handleClickFab()
  }
  const classImage = 'fab-image ' + (props.icon ? props.icon : ICONS.BARCODE)
  return <div className="fab clickable" onClick={handleClick}><div className={classImage}/></div>
}

export const ICONS = {
  BARCODE: 'fab-image-barcode',
  PLUS: 'fab-image-plus',
}

export default Fab