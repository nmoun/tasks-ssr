import React from 'react'

var currentLang = {}

/**
 * Closure on currentLang
 */
class LabelProvider extends React.Component {
  constructor(props){
    super(props)
    currentLang = typeof window !== 'undefined' ? window.__LANG__ : {}
  }

  render() {
    return <React.Fragment>{ this.props.children }</React.Fragment>
  }
}
export default LabelProvider

export function getLabel(id){
  return currentLang[id] || `No label: ${id}`
}