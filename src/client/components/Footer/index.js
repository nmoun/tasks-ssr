import React from 'react'

import './style.scss'

function Footer(props){
  return <div className="footer-container">
    {props.children}
  </div>
}

export default Footer