import * as React from 'react'

var currentLang = {}

declare global {
  interface Window {
    __LANG__: object
  }
}

/**
 * Closure on currentLang
 */
class LabelProvider extends React.Component<any, null> {
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