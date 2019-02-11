import React from 'react'
import Menu from 'components/Menu'

import './style.scss'

class SidePanel extends React.Component {
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
    let className = this.props.isDisplayed === true ? "side-panel displayed" : "side-panel";
    if(this.state.activateTransitions) className += " side-panel-transitions"
    return <div className='side-panel-container'>
      <div className={className}>
        <Menu entries={this.props.entries}/>
      </div>
    </div>
  }
}
export default SidePanel
