import React from "react";
import { useState, useEffect } from "react";
import "./SnakeGame.css";
import Snake from "./Snake.js";
import Food from "./Food";
import { useInterval } from "./preventStates.js";
import { Route, Link, Routes } from "react-router-dom";
import Menu from "../menu/Menu";

function SnakeGame(props) {
  const initialValues = {
    startPositions: [
      [108, 54],
      [108, 72],
    ],
    speed: 200,
    foodStartPosition: [108, 90],
    canvasSize: [576, 576],
    scale: 18,
  };
  const [snakePosition, setSnakePosition] = useState(
    initialValues.startPositions
  );
  const [snakeFood, setSnakeFood] = useState(initialValues.foodStartPosition);
  const [direction, setDirection] = useState("RIGHT");
  const [speed, setSpeed] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameStart, setIsGameStart] = useState(false);

  function changeCoord(e) {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        setDirection("UP");
        break;
      case 40:
        setDirection("DOWN");
        break;
      case 37:
        setDirection("LEFT");
        break;
      case 39:
        setDirection("RIGHT");
        break;
    }
  }

  function randomFoodCoordinates() {
    let x = Math.floor(Math.random() * 33) * 18;
    let y = Math.floor(Math.random() * 33) * 18;
    return [x, y];
  }

  function moveSnake() {
    let copySnake = [...snakePosition];
    let snakeHead = copySnake[copySnake.length - 1];
    switch (direction) {
      case "RIGHT":
        snakeHead = [snakeHead[0] + 18, snakeHead[1]];
        break;
      case "UP":
        snakeHead = [snakeHead[0], snakeHead[1] - 18];
        break;
      case "LEFT":
        snakeHead = [snakeHead[0] - 18, snakeHead[1]];
        break;
      case "DOWN":
        snakeHead = [snakeHead[0], snakeHead[1] + 18];
        break;
    }
    copySnake.push(snakeHead);
    copySnake.shift();
    setSnakePosition(copySnake);
    checkBorders();
    eatFood();
  }

  function checkBorders() {
    let head = snakePosition[snakePosition.length - 1];
    if (head[0] >= 580 || head[0] < 0 || head[1] >= 580 || head[1] < 0) {
      gameOver();
    }
  }

  function eatFood() {
    let snakeHead = snakePosition[snakePosition.length - 1];
    let food = snakeFood;
    if (snakeHead[0] === food[0] && snakeHead[1] === food[1]) {
      setSnakeFood(randomFoodCoordinates());
      addToSnake(snakeHead);
      increaseSpeed();
    }
  }

  function addToSnake(snk) {
    let addedSnake = [...snakePosition];
    addedSnake.unshift([snk]);
    setSnakePosition(addedSnake);
  }

  function increaseSpeed() {
    if (snakePosition.length > 10 && snakePosition.length < 20) {
      setSpeed(180);
    } else if (snakePosition.length > 20 && snakePosition.length < 30) {
      setSpeed(160);
    } else if (snakePosition.length > 30 && snakePosition.length < 40) {
      setSpeed(140);
    } else if (snakePosition.length > 40 && snakePosition.length < 50) {
      setSpeed(120);
    } else if (snakePosition.length > 50) {
      setSpeed(100);
    }
  }
  function gameOver() {
    alert(`Game Over! Score: ${snakePosition.length}`);
    setSpeed(null);
    setIsGameOver(true);
    setIsGameStart(false);
    setSnakePosition(initialValues.startPositions);
    setSnakeFood(initialValues.foodStartPosition);
  }
  useInterval(() => moveSnake(), speed);

  const startGame = () => {
    setIsGameStart(true);
    setSnakePosition(initialValues.startPositions);
    setSnakeFood(initialValues.foodStartPosition);
    setDirection("RIGHT");
    setSpeed(initialValues.speed);
    setIsGameOver(false);
  };

  useEffect(() => {
    document.addEventListener("keydown", function (e) {
      changeCoord(e);
    });
  });

  return (
    <div>
      <div className="gameArea">
        <div className={isGameStart ? "hideStarts" : "startContainer"}>
          <button
            className={isGameStart ? "hideStarts" : "startButton"}
            onClick={startGame}>
            Start Game!
          </button>
        </div>
        <Snake snakePosition={snakePosition} />
        <Food foodPosition={snakeFood} />
      </div>
      <Link to="/menu/*">
        <button className="backButton" onClick={() => props.handleToggle()}>
          Back to Menu!
        </button>
      </Link>
      <Routes>
        <Route path="/menu/*" element={<Menu />}></Route>
      </Routes>
    </div>
  );
}

export default SnakeGame;
