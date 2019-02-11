import React from 'react'
import * as fromDialog from 'components/dialogs/Dialog'

import './style.scss'

function DialogInfo(props) {
  const close = () => {
    fromDialog.closeDialog();
  }
  return <div>
    <div className="dialog-info-msg-container">{props.message}</div>
    <div className="dialog-info-buttons">
      <button className="dialog-info-button dialog-info-button-ok clickable" onClick={close}>OK</button>
    </div>
  </div>
}

export function openDialogInfo(props){
  fromDialog.openDialog(DialogInfo, props)
}