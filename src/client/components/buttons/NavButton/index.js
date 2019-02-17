import React from 'react'

import './style.scss'

function NavButton(props){
  let classNavButton = 'navbutton-container' +  ((props.disabled === true) ? ' disabled' : ' clickable')
  const Img = props.img
  return <div className={classNavButton} onClick={props.handleClick}>
    <span>{props.text}</span><Img style={{height: '20px', marginLeft: '10px'}} />
  </div>
}

export default NavButton