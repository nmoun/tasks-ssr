import React from 'react'
import * as fromDialog from 'components/dialogs/Dialog'

import './style.scss'

function DialogConfirm(props) {
  return <div>
    <div className="dialog-confirm-msg-container">{props.message}</div>
    <div className="dialog-confirm-buttons">
      <button className="dialog-confirm-button dialog-confirm-button-yes clickable" onClick={props.handleYes}>Yes</button>
      <button className="dialog-confirm-button clickable" onClick={props.handleNo}>No</button>
    </div>
  </div>
}

export function openDialogConfirm(props){
  fromDialog.openDialog(DialogConfirm, props)
}

export function closeDialogConfirm(){
  fromDialog.closeDialog()
}