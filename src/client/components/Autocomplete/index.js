import React from 'react'

import './style.scss'


class Autocomplete extends React.Component {
  /**
   * @param {Object} props 
   * @param {Array} props.options - suggestions displayed below text input (e.g: [{id: 5, label: "Item 1"}, {id: 2, label: "Item 5"}])
   * @param {function} props.handleClick - called when an suggestion is clicked. Parameter is the id of the selected option.
   * @param {function} props.handleChange - called when input's value changes
   * @param {Number} props.value - value in the input
   * @param {Number} props.width - (optional) width of input and suggestions
   */
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleMouseOverEntry = this.handleMouseOverEntry.bind(this)
    this.state = {
      selected: null
    }
  }

  focus(){
    this.input.focus()
  }

  handleClick(optionId){
    return () => {
      if(this.props.handleClick)
        this.props.handleClick(optionId)
    }
  }

  handleMouseOverEntry(entryIndex){
    return () => {
      this.setState({
        selected: entryIndex
      })
    }
  }

  handleKeyDown(e){
    switch(e.nativeEvent.keyCode){
    case 40:
      // up arrow
      if(this.props.options.length > 0){
        if(this.state.selected === null){
          this.setState({
            selected: 0
          })
        }else{
          this.setState({
            selected: Math.min(this.state.selected + 1, this.props.options.length - 1)
          })
        }
      }
      break
    case 38:
      // down arrow
      if(this.props.options.length > 0){
        if(this.state.selected === null){
          this.setState({
            selected: this.props.options.length - 1
          })
        }else{
          this.setState({
            selected: Math.max(this.state.selected - 1, 0)
          })
        }
      }
      break

    case 13:
      // enter
      if(this.state.selected !== null){
        this.props.handleSubmit(this.props.options[this.state.selected].id)
      } else {
        this.props.handleSubmit(this.props.value)
      }
      break
    default:
      this.setState({
        selected: null
      })
    }
  }

  render(){
    const width = this.props.width ? this.props.width : "200px",
      options = this.props.options ? this.props.options : []
    return <div className="autocomplete"  >
      <input
        onKeyDown={this.handleKeyDown}
        style={{width: width}}
        ref={(input) => { this.input = input; }}
        type="text"
        value={this.props.value}
        className="autocomplete-input"
        onChange={this.props.handleChange}/>
      <ul style={{width: width}} className="autocomplete-list">
        {options.map((option, index) => {
          let classEntry = "autocomplete-entry clickable"
          classEntry += index === this.state.selected ? " autocomplete-entry-selected" : ""
          return (
            <li
              key={option.id}
              className={classEntry}
              onClick={this.handleClick(option.id)}
              onMouseOver={this.handleMouseOverEntry(index)}>
              <span>{option.label}</span>
            </li>
          )
        })}
      </ul>
    </div>
  }
}

export default Autocomplete