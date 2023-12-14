import React from 'react'
import './SnakeGame.css'

function Food(props) {
    const style={
        left:`${props.foodPosition[0]}px`,
        top:`${props.foodPosition[1]}px`
    }
  return (
    <div className='snakeFood' style={style}></div>
  )
}

export default Food