import React from 'react'

var currentLang = {}

/**
 * Closure on currentLang:
 * TODO use state to dynamically change language
 */
class LabelProvider extends React.Component {
  constructor(props){
    super(props)
    currentLang = props.lang
  }

  render() {
    return <React.Fragment>{ this.props.children }</React.Fragment>
  }
}
export default LabelProvider

export function getLabel(id){
  return currentLang[id] || `No label: ${id}`
}