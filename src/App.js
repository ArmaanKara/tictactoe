import './App.css';
import Board from './components/Board';
import Square from './components/Square';
import { useState, useEffect } from 'react';
import ResetButton from './components/ResetButton';

const defaultSquares = () => (new Array(9)).fill(null)

const lines = [
  [0, 1, 2], [3,4,5], [6,7,8], //horzontal lines
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6],
];

function App() {

  const [squares, setSquares] = useState(defaultSquares())
  const [winner, setWinner] = useState(null)
  const [tie, setTie] = useState(null)

  useEffect(() => {

    const isComputerTurn = squares.filter(square => square !== null).length % 2 === 1;
    const linesThatAre = (a,b,c) => {
      return lines.filter(squareIndexes => {
        const squareValues = squareIndexes.map(index => squares[index])
        return JSON.stringify([a,b,c].sort()) === JSON.stringify(squareValues.sort())
      })
    }
    const playerWon = linesThatAre('x', 'x', 'x').length > 0;
    const computerWon = linesThatAre('o','o','o').length > 0;
    const tie = squares.filter(square => square !== null).length===9;


    if (tie && !playerWon && !computerWon){
      setTie('tie')
    }
    if(computerWon){
      setWinner('x')
    }
    if(playerWon){
      setWinner('o')
    }
    const putComputerAt = index => {
      let newSquares = squares
      newSquares[index] = 'o';
      setSquares([...newSquares])
    }
    if (isComputerTurn){

      
      const winningLines = linesThatAre('o','o', null)
      if (winningLines.length > 0){
          const winIndex = winningLines[0].filter(index => squares[index] === null)[0]
          putComputerAt(winIndex)
          return
      }

      const linesToBlock = linesThatAre('x','x', null)
      if(linesToBlock.length > 0){
        const blockingIndex = linesToBlock[0].filter(index => squares[index] === null)[0]
        putComputerAt(blockingIndex)
        return
      }

      const linesToContinue = linesThatAre('o', null, null)
      if(linesToContinue.length>0){
        putComputerAt(linesToContinue[0].filter(index => squares[index] === null)[0])
        return
      }
      const emptyIndexes = squares
      .map((square, index) => square === null ? index : null)
      .filter(val => val !== null)
      
      const randomIndex = emptyIndexes[ Math.floor(Math.random() * emptyIndexes.length)]
      putComputerAt(randomIndex);
    }
  }, [squares])

  const handleSquareClick = (index) => {
    const isPlayerTurn = squares.filter(square => square !== null).length % 2 === 0;
    if (isPlayerTurn){
      let newSquares = squares;
      newSquares[index] = 'x'
      setSquares([...newSquares]);
    }

  }


  return (
    <main>
      <Board>
        {squares.map((square,index) =>
            <Square
              x={square==='x'?1:0}
              o={square==='o'?1:0}
              onClick={() => handleSquareClick(index)} />
        )}
      </Board>
      {winner && winner === 'x' && (
        <div className="result-red">
          Computer WON!
        </div>
      )}
      {winner && winner === 'o' && (
        <div className="result-green">
          You WON!
        </div>
      )}
      {tie && tie === 'tie' && (
        <div className="result-blue">
          TIE! Click the reset button below to play again.
        </div>
      )}
      <ResetButton/>
    </main>
  );
}

export default App;
