import React from 'react'
import Widget, { ICONS }from '../Widget'
import { TASK_STATUS } from 'utils/constants'
import {Link} from 'react-router-dom'

import './style.scss'

class TaskWidget extends React.Component {

  constructor(props){
    super(props)
  }

  render(){
    const icon = (this.props.status === TASK_STATUS.LOADING) ? ICONS.LOADING : null;
    return <Link to={'/' + this.props.type + '/' + this.props.id + "#" + this.props.id }>
      <Widget {...this.props} className="task-widget" icon={icon}/>
    </Link>
  }
}

export default TaskWidget