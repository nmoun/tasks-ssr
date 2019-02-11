import React from 'react'

import './style.scss'

function NavButton(props){
  let classNavButton = "navbutton-container" +  ((props.disabled === true) ? " disabled" : " clickable")

  return <div className={classNavButton} onClick={props.handleClick}>
    <span>{props.text}</span><img className="navbutton-img" alt="navbutton" src={props.imgSrc}/>
  </div>
}

export default NavButton