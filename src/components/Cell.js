import React from "react";

export default function Cell({
  id,
  cell,
  setCells,
  go,
  setGo,
  cells,
  winnerMsg, 
  setAnimation
}) {
  const handleClick = (e) => {
    if (e.target.className === "UI__circle") return;
    if (e.target.className === "UI__cross") return;
    setAnimation(" ");
    const taken =
      e.target.firstChild.classList.contains("UI__circle") ||
      e.target.firstChild.classList.contains("UI__cross");

    if (!taken) {
      if (go === "UI__circle") {
        e.target.firstChild.classList.add("UI__circle");

        handleCellChange("UI__circle");
        setGo("UI__cross");
      }
      if (go === "UI__cross") {
        e.target.firstChild.classList.add("UI__cross");
        handleCellChange("UI__cross");
        setGo("UI__circle");
      }
    }
  };
  // close handle click

  const handleCellChange = (className) => {
    const nextCells = cells.map((cell, index) => {
      if (index === id) {
        return className;
      } else {
        return cell;
      }
    });
    setCells(nextCells);
  };

  return (
    <div
      onClick={!winnerMsg ? handleClick : undefined}
      className="UI__cell-tile"
      id={id}
    >
      <div className={cell}></div>
    </div>
  );
}
