import React from 'react'
import Board from './Board'
import './MinesweeperGame.css'
import { Route, Link, Routes } from "react-router-dom";
import Menu from '../menu/Menu';

function MinesweeperGame(props) {
  return (
    <div className='gameContainer'>
        <Board></Board>
        <Link to="/menu/*">
        <button className="backButton" onClick={() => props.handleToggle()}>
          Back to Menu!
        </button>
      </Link>
      <Routes>
        <Route path="/menu/*" element={<Menu />}></Route>
      </Routes>
    </div>
  )
}

export default MinesweeperGame