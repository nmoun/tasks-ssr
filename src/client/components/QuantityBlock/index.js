import React from 'react'

import './style.scss'

function QuantityBlock(props){
  let textInput = React.createRef();

  function handleClick() {
    textInput.current.focus()
  }

  function handleChange(event){
    if(props.handleChangeQuantity){
      props.handleChangeQuantity(event.target.value)
    }
  }

  return <div className="quantity-block clickable" onClick={handleClick}>
    <input
      className="clickable"
      type="number"
      value={props.quantity}
      name="quantity"
      id="quantity"
      ref={textInput}
      onChange={handleChange}
      onFocus={props.handleFocus}
      onBlur={props.handleBlur}
      maxLength="4"/>
  </div>
}


export default QuantityBlock