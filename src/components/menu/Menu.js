import {useState} from 'react'
import './Menu.css'
import MinesweeperLogo from './icons/minesweeper.png'
import SnakeLogo from './icons/snake.png'
import SnakeGame from '../snake/SnakeGame.js'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes
  } from "react-router-dom";
import MinesweeperGame from '../minesweeper/MinesweeperGame'

function Menu() {
  const [isClicked, setIsClicked]=useState(false);
  function toggleMenu(){
    setIsClicked(!isClicked);
  }
  const handleStatus = (status)=>{
    setIsClicked(status)
  }

  return (
    <Router>
    <div className='menuContainer container'>
          <div className={isClicked ? 'hide': 'text'}>
            Welcome!<br />
            Are you ready to travel in time with nostalgical games? <br /> Let's start!
          </div>
          <div className={isClicked ? 'hide': 'textG'}> Choose a game!</div>
        <div className={isClicked ? 'hide': 'menu-list row'}>
          <div className='list-item col'>
            <Link to="/minesweeper/*" className='link' onClick={toggleMenu}>
                <img src={MinesweeperLogo} className={"minesweeper logo"} alt="logo"/><br/>
            </Link>
            <h3>Minesweeper</h3>
          </div>
          <div className='list-item col'>
            <Link to="/snake/*" className='link' onClick={toggleMenu}>
                <img src={SnakeLogo} className={"snake logo"}  alt="logo"/><br />
            </Link>
            <h3>Snake</h3>
          </div>
        </div>

      <Routes>
        <Route path="/minesweeper/*" element={<MinesweeperGame handleToggle={toggleMenu}/>}></Route>
        <Route path="/snake/*" element={<SnakeGame handleToggle={toggleMenu}/>}></Route>
      </Routes>
    </div>
  </Router>

  )
}

export default Menu