import React from 'react'
import Widget from 'components/widgets/Widget'
import './style.scss'

class LoadingList extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let arr = []
    for(let i = 0 ; i < LoadingList.NUMBER; ++i){
      arr.push(<Widget key={i} className="loading-list__widget"/>)
    }

    return <div className="loading-list-container">
      <div className="loading-list">
        { arr }
      </div>
    </div>
  }
}

LoadingList.NUMBER = 20

export default LoadingList