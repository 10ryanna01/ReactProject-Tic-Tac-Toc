import { useEffect, useState } from "react";
import "./styles/styles.scss";
import Cell from "./components/Cell";

const App = () => {
  // setup game play into an array

  const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""]);
  console.log(cells);
  const [go, setGo] = useState("UI__circle");
  const [winnerMsg, setWinnerMsg] = useState(null);

  const [playerX, setPlayerX] = useState(false);
  const [playerO, setPlayerO] = useState(false);
  const [animation, setAnimation]=useState(" ");
  const [playerXText, setPlayerXText] = useState(" ");
  const [playerOText, setPlayerOText] = useState(" ");
const [endGameTurns, setEndGameTurns] = useState(" ");
  const [countDraw, setCountDraw] = useState(0);

  const playerTurnMsg = "it's " + playerOText + playerXText + "'s turn.";

  const checkScore = () => {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // detect winner from pattern for circle
    winningPatterns.forEach((array) => {
      let circleWins = array.every((cell) => cells[cell] === "UI__circle");
      if (circleWins) {
         
        setWinnerMsg("Circle Wins The game! GG🎉");
        setEndGameTurns(false)
        return;
      } else {
        setCountDraw(countDraw + 1);
        console.log({ countDraw });
      }
    });
    // detect winner from pattern for cross
    winningPatterns.forEach((array) => {
      let crossWins = array.every((cell) => cells[cell] === "UI__cross");
      if (crossWins) {
    
        setWinnerMsg("Cross Wins The game! GG🎉"); 
        setEndGameTurns(false)
        return;
      }
    });
    // when count comes to "9" with out a confirmed winning pattern its certain to be a draw
    if (countDraw === 9) {
      setWinnerMsg("its a draw 🤓");
      setEndGameTurns(false)
    }

    // close check score
  };

  useEffect(() => {
    checkScore();
    if (go === "UI__cross") {
      setPlayerX(true);
      setPlayerO(false);
      setPlayerXText("Cross");
      setPlayerOText("");
    } else {
      setPlayerX(false);
      setPlayerO(true);
      setPlayerOText("Circle");
      setPlayerXText("");
    }
  }, [cells]);

  const handleResetGame = () => {
    setCells(["", "", "", "", "", "", "", "", ""]);
    setWinnerMsg(null);
    setCountDraw(0);
    setEndGameTurns(" ") 
 setAnimation("UI__utility__reload-animation")

  };

  return (
    <div className={`UI ${animation}`}>
      <header className="UI__header">
        <h1 className="UI__header__title">play some tic-tac-toe</h1>
      </header>

      <main>
        <div className="UI__gameboard">
          {cells.map((cell, index) => (
            <Cell
              key={index}
              id={index}
              cell={cell}
              setCells={setCells}
              winnerMsg={winnerMsg}
              go={go}
              setGo={setGo}
              cells={cells}
              setAnimation={setAnimation}
             
            />
          ))}
        </div>
      </main>

      <footer>
        <div className="UI__player-info">
{endGameTurns ? 
<>
          {playerO ? (
            <div className="UI__cell-tile">
              <span className="UI__circle"></span>
            </div>
          ) : null}

          {playerX ? (
            <div className="UI__cell-tile">
              <span className="UI__cross"></span>
            </div>
          ) : null}
          </>
: <></>
        }
          <p className="UI__player-info__copy"> {winnerMsg || playerTurnMsg}</p>
        </div>
        <div className="UI__utility__row">
        {!winnerMsg ? <></> : null}
</div>
 <div className="UI__utility__row">
<button     type="button"
          onClick={handleResetGame}
          className="UI__restart-btn"
          aria-pressed="false"
        >
          {" "}
          reboot game
        </button>
       </div>
      </footer>
    </div>
  );
};

export default App;
