import React from 'react'

import './style.scss'

function Error(props){
  return <div className="error"><span className='text-danger'>{props.message}</span></div>
}

export default Error