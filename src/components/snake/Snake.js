import React from 'react'
import './SnakeGame.css'

function Snake(props) {
    return (
        <div>
          {props.snakePosition.map((dot, i) => {
            let style = {
              left: `${dot[0]}px`,
              top: `${dot[1]}px`
            }
            return (
              <div className="snakeCubes" key={i} style={style}></div>
            )
          })}
        </div>
      )
}

export default Snake