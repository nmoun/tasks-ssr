import React from 'react'
import Menu from 'components/Menu'
import { withRouter } from 'react-router-dom'

import './style.scss'

class TaskMenu extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      activateTransitions: false
    }
  }

  componentDidMount(){
    this.timeOutID = setTimeout(() => {
      this.setState({activateTransitions: true})
    }, 500)
  }

  componentWillUnmount(){
    clearTimeout(this.timeOutID)
  }

  render(){
    let classMenu = this.props.isDisplayed ? "task-menu" : "task-menu hidden",
      { history } = this.props,
      // hard coded for now
      entries = [{
        handleClickEntry: () => {
          history.push('/order')
        },
        label: 'Order',
      },{
        handleClickEntry: () => {
        },
        label: 'Check in (WIP)',
      },{
        handleClickEntry: () => {
        },
        label: 'Inventory (WIP)',
      },{
        handleClickEntry: () => {
        },
        label: 'Transfer (WIP)',
      }]
    
    if(this.state.activateTransitions) classMenu += " task-menu-transitions"

    return <div className="task-menu-container">
      <div className={classMenu}>
        <Menu entries={entries}/>
      </div>
    </div>
  }
}

export default withRouter(TaskMenu)