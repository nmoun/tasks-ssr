import React from 'react'

import './style.scss'

class Widget extends React.Component {

  constructor(props){
    super(props)
  }

  render(){
    const classWidget = 'rounded widget text-white' + (this.props.className ? ' ' + this.props.className : ''),
      classIcon = 'widget-right' + (this.props.icon ? ' ' + this.props.icon : '')
    return <div className={classWidget}>
      <div className="widget-left">
        <span>{this.props.title}</span>
        <span>{this.props.subtitle}</span>
      </div>
      <div className={classIcon}>
      </div>
    </div>
  }
}

export const ICONS = {
  LOADING: 'widget-icon-loading'
}

export default Widget