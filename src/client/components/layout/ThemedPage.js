import React from 'react'
import Fab from 'components/Fab'
import Notify from 'components/Notify'
import { hideNotification } from 'state/actions/ui'
import { connect } from 'react-redux'
import { getNotification } from 'state/reducers'

const ThemedPage = function(props){
  if(props.fab === true && !props.handleClickFab){
    throw new Error('FAB button displayed but no given handler')
  }

  return (<div className="container-all">
    {props.notification.isDisplayed === true ? <Notify message={props.notification.message} status={props.notification.status} handleClick={props.hideNotification}/> : ""} 
    {props.children}
    {props.fab === true ? <Fab handleClickFab={props.handleClickFab} icon={props.fabIcon}/> : ""}
  </div>)
}

const mapStateToProps = (state) => ({
  notification: getNotification(state),
})

const mapDispatchToProps = {
  hideNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemedPage)