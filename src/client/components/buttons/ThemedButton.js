import React from 'react'

import 'scss/custom.scss'

function ThemedButton(props){
  const type = (props.type) ? props.type : 'button'
  return <button type={type} className="btn btn-lg btn-emo-dark border-emo text-emo" onClick={props.onClick}>{props.text}</button>
}

export default ThemedButton