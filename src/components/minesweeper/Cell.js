import React from "react";
import BombIcon from "../menu/icons/bomb.png";
import "./MinesweeperGame.css";
import flagIcon from "../menu/icons/flagg.png";

function Cell(props) {
  function fillCell(column) {
    if (!column.isClicked) {
      return column.flag ? <img src={flagIcon} class="flagIcon"></img> : "";
    }
    if (column.mine) {
      return <img src={BombIcon} className="bombIcon"></img>;
    }
    if (column.neighbours) {
      return (
        <div style={{ color: neighbourColor(column.neighbours) }}>
          {column.neighbours}
        </div>
      );
    }
  }

  function cellClass(column) {
    if (!column.isClicked) {
      return "gameCell notClicked";
    }
    if (column.isClicked) {
      return "gameCell clicked";
    }
  }
  function neighbourColor(neighbour) {
    switch (neighbour) {
      case 1:
        return "#2121bb";
      case 2:
        return "#3b6f0f";
      case 3:
        return "#c81313";
      case 4:
        return "#03096e";
      case 5:
        return "#5d0716";
      case 6:
        return "#44aca4";
      case 7:
        return "black";
      case 8:
        return "#868686";
      default:
        return "";
    }
  }

  return (
    <button
      onClick={(e) => props.handleClick(e, props.i, props.j)}
      onContextMenu={(e) => props.rightClick(e, props.i, props.j)}
      className={cellClass(props.column)}
    >
      {fillCell(props.column)}
    </button>
  );
}

export default Cell;
