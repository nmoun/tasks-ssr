import React from 'react'
import * as fromDialog from 'components/dialogs/Dialog'
import Autocomplete from 'components/Autocomplete'
import './style.scss'
import cacheImages from 'utils/cacheImages'
import throttle from 'lodash.throttle'

class DialogScan extends React.Component {
  /**
   * 
   * @param {Object} props 
   * @param {Object} props.callWebServiceSuggest - must return a promise giving server's response in parameter
   */
  constructor(props){
    super(props)
    this.state = {
      value: "",
      options: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.throttledCallWebService = throttle(() => {
      props.callWebServiceSuggest(this.state.value)
        .then((response) => {
          this.setState({
            options: response
          })
        })
        .catch(() => {
          this.setState({
            options: []
          })
        })
    }, 250);
  }

  handleSubmit(value){
    if(this.props.handleSubmit){
      this.props.handleSubmit(value)
    }
    closeDialogScan()
  }

  handleChange(e){
    const value = e.target.value
    this.setState({
      value
    }, () => {
      if(value.length >= 2 && this.props.callWebServiceSuggest){
        this.throttledCallWebService()
      }else{
        this.setState({
          options: []
        })
      }
    })
  }

  handleClick(optionId){
    if(this.props.handleSubmit){
      this.props.handleSubmit(optionId)
    }
    closeDialogScan()
  }
  
  handleKeyDown(e){
    if(e.nativeEvent.keyCode === 27){
      // escape
      closeDialogScan()
    }
  }

  componentDidMount(){
    this.codeInput.focus()
  }

  componentWillUnmount(){
    this.throttledCallWebService.cancel()
  }

  render(){
    return (
      <div onKeyDown={this.handleKeyDown}>
        <div className="dialog-scan-img-container">
          <img src={cacheImages["./barcode.svg"]}
            alt="Barcode" />
        </div>
        <div className="dialog-scan-msg-container">{this.props.message}</div>
        <div className="dialog-scan-input-container">
          <Autocomplete
            ref={(input) => { this.codeInput = input; }}
            handleChange={this.handleChange}
            handleClick={this.handleClick}
            handleSubmit={this.handleSubmit}
            value={this.state.value}
            options={this.state.options}/>
        </div>
      </div>
    )
  }
}

export function openDialogScan(props){
  fromDialog.openDialog(DialogScan, {...props, showOverflow: true})
}

export function closeDialogScan(){
  fromDialog.closeDialog();
}