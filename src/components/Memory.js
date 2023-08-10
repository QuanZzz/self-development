import React from 'react';

const TILE_COLORS = ['red', 'green', 'blue', 'yellow'];

export default function Memory() {
  // Write your code here.
  const [board, setBoard] = useState(shuffle([...TILE_COLORS, ...TILE_COLORS]));
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [matchedTiles, setMatchedTiles] = useState([]);

  useEffect(() => {
    if(selectedTiles.length < 2) {
      return;
    }

    if (board[selectedTiles[0]] === board[selectedTiles[1]]) {
      setMatchedTiles([...matchedTiles, ...selectedTiles]);
      setSelectedTiles([]);
    }else {
      const timeID = setTimeout(() => setSelectedTiles([]), 1000);
      return () => clearTimeout(timeID);
    }
  }, [selectedTiles]);

  const selectTile = (tileIndex) => {
    if (selectedTiles.length >= 2 || selectedTiles.includes(tileIndex)
        || matchedTiles.includes(tileIndex)) {
      return;  
    }
    
    setSelectedTiles([...selectedTiles, tileIndex]);
  }

  const restartGame = () => {
    setBoard(shuffle([...TILE_COLORS, ...TILE_COLORS]));
    setSelectedTiles([]);
    setMatchedTiles([]);
  }

  const didPlayerWin = board.length === matchedTiles.length;

  return (
    <>
      <h1>{didPlayerWin ? "You Win!" : "Memory"}</h1>
      <div className="board">
        {board.map((tileColor, i) => {
          const isTurnedOver = selectedTiles.includes(i) || matchedTiles.includes(i);
          const tileClass = isTurnedOver ? `tile ${tileColor}` : 'tile';
          return (
            <div key={i} className={tileClass} onClick={() => selectTile(i)}></div>
          );
        })}
      </div>
      {didPlayerWin && <button onClick={() => restartGame()}>Restart</button>}
    </>
  );
}

/**
 * Returns the array shuffled into a random order.
 * Do not edit this function.
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap the elements at i and randomIndex
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}