import React from 'react'

import './style.scss'

function Menu(props){
  return <div className="menu-container">
    <div className="menu">
      <ul>
        {props.entries.map((entry) => {
          return <li key={entry.label} className="menu-entry clickable" onClick={entry.handleClickEntry}>
            <span>{entry.label}</span>
          </li>
        })}
      </ul>
    </div>
  </div>
}

export default Menu