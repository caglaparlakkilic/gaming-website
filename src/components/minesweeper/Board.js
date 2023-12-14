import React from "react";
import "./MinesweeperGame.css";
import Cell from "./Cell";
import { useState } from "react";
import produce from "immer";
import deadFace from '../menu/icons/dead.jpg';
import smileyFace from '../menu/icons/smile.png';

function Board() {
  const initialValues = {
    height: 20,
    width: 20,
    mineNumber: 40,
  };

  function createInitialBoard(height, width, mineNumber) {
    const board = Array(width)
      .fill()
      .map((_, indexH) =>
        Array(height)
          .fill()
          .map((_, indexW) => ({
            x: indexH,
            y: indexW,
            mine: false,
            neighbours: 0,
            empty: false,
            isClicked: false,
            flag: false
          }))
      );
    let minesBoard = getRandomMines(board, height, width, mineNumber);
    let neighbourBoard = calculateNeighbours(minesBoard, height, width);
    console.log(board);
    return neighbourBoard;
  }

  function getRandomMines(board, height, width, mineNumber) {
    for (let i = 0; i < mineNumber; i++) {
      let x = Math.floor(Math.random() * width);
      let y = Math.floor(Math.random() * height);
      if (!board[x][y].mine) {
        board[x][y].mine = true;
      }
    }
    return board;
  }

  function calculateNeighbourCoordinates(boardX, boardY, board, width, height) {
    let neighbours = [];
    const neighbourCoordinates = [
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
    ];
    neighbourCoordinates.forEach(([x, y]) => {
      const neighbourX = boardX + x;
      const neighbourY = boardY + y;
      if (
        neighbourX >= 0 &&
        neighbourX < width &&
        neighbourY >= 0 &&
        neighbourY < height
      ) {
        neighbours.push(board[neighbourX][neighbourY]);
      }
    });
    return neighbours;
  }

  function calculateNeighbours(board, height, width) {
    let copyBoard = board;
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        let minesNum = 0;
        const area = calculateNeighbourCoordinates(
          board[i][j].x,
          board[i][j].y,
          board,
          width,
          height
        );
        area.map((obj) => {
          if (obj.mine) {
            return minesNum++;
          }
          return 0;
        });
        if (minesNum === 0) {
          copyBoard[i][j].empty = true;
        }
        copyBoard[i][j].neighbours = minesNum;
      }
    }
    return copyBoard;
  }

  const [board, setBoard] = useState(() =>
    createInitialBoard(
      initialValues.height,
      initialValues.width,
      initialValues.mineNumber
    )
  );
  const [gameStatus, setGameStatus] = useState('Game On');
  const [mineNum, setMineNum] = useState(initialValues.mineNumber)

  function getEmptyCells(height, width, x, y, board){
    let cells = calculateNeighbourCoordinates(x, y, board, height, width);
    cells.map((cell)=>{
      if(!cell.isClicked && (cell.empty || !cell.mine)){
        Object.assign(board[cell.x][cell.y], {isClicked: true});
        if(cell.empty){
          getEmptyCells(height, width, cell.x, cell.y, board)
        }
      }
      return null;
    });
    return board;
  }

  function gameOverBoard(dataBoard){
    const lastBoard= produce(dataBoard, (draft)=>(
      draft.map((row)=> ( row.map((cell)=>{
        return {...cell, isClicked:true}
      })
      ))
    ));
    return lastBoard;
  }

  function flaggedCell(e,i,j){
    e.preventDefault();
    let mineCountPlaceholder = mineNum;
    if(board[i][j].isClicked) return;
    const updatedBoard = produce(board, (draft) => {
      board[i][j].flag
        ? (mineCountPlaceholder += 1)
        : (mineCountPlaceholder -= 1);
      if (mineCountPlaceholder >= 0 && mineCountPlaceholder <= mineNum + 1) {
        draft[i][j].flag = !draft[i][j].flag;
        setMineNum(mineCountPlaceholder);
      }
    });
    setBoard(updatedBoard);
  }

  function leftClick(e, i, j) {
    e.preventDefault();
    if (board[i][j].isClicked || board[i][j].flag) return;
    const updatedBoard = produce(board, (draft) => {
      Object.assign(draft[i][j], { isClicked: true });
      if(draft[i][j].empty){
        getEmptyCells(initialValues.height, initialValues.width, i, j, draft)
      }
    });
    if (updatedBoard[i][j].mine) {
      const overBoard= gameOverBoard(updatedBoard);
      setBoard(overBoard)
      return setGameStatus('Game Over');
    }
    setBoard(updatedBoard);
  }


  function startGame(e, initialValues){
    e.preventDefault();
    setGameStatus('Game On');
    setBoard(createInitialBoard(initialValues.height, initialValues.width, initialValues.mineNumber));
    setMineNum(initialValues.mineNumber)
  }

  function statusColor(status){
    if(status==='Game Over'){
      return 'red';
    }
    if(status==='Game On') {
      return 'green';
    }
  }

  function gameStatusEmoji(status){
    if(status==='Game Over'){
      return <img src={deadFace} className="statusIcon"></img>
    }
    if(status==='Game On'){
      return <img src={smileyFace} className="statusIcon"></img>
    }
  }


  return (
    <div className="gameContainerB">
      <div className="gameStatusBoard" style={{display: "inline-flex"}}>
        <span className="mineNumButton">{mineNum}</span>
        <button className="gameStatusButton" style={{ color: statusColor(gameStatus)}}>{gameStatusEmoji(gameStatus)}</button>
        <button onClick={(e)=>startGame(e, initialValues)} className="restartButton"> Restart Game</button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${initialValues.width}, 25px)`,
          gridTemplateRows: `repeat(${initialValues.height}, 25px)`,
        }}
      >
        {board.map((row, i) =>
          row.map((column, j) => (
            <Cell
              key={`${i}-${j}`}
              column={column}
              i={i}
              j={j}
              handleClick={(e, i, j) => leftClick(e, i, j)}
              rightClick={(e,i,j)=> flaggedCell(e,i,j)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Board;
