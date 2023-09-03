import { useState, useEffect, useCallback, createContext } from 'react';
import { Board } from './Board';
import { checkHasWinner } from '../util/checkHasWinner';
import { YOUR_MOVE, ROBOT_MOVE, TTT_DEV, NEW_GAME } from '../constants';

export const GameContext = createContext(null);

function App() {
  const [game, setGame] = useState(NEW_GAME);
  const [isLoading, setIsLoading] = useState(false);

  const { board } = game;

  const restartGame = () => {
    setGame(NEW_GAME)
    setIsLoading(false);
  }

  const updateGame = useCallback((board) => {
    const winner = checkHasWinner(board);
    const { player, moves } = game;

    let nextPlayer = player;
    let nextStatus = '';

    if (winner) {
      nextStatus = winner === 'X' ? 'You Won!' : '🤖 Won';
    } else {
      nextStatus = player === 'X' ? ROBOT_MOVE : YOUR_MOVE;
      nextPlayer = player === 'X' ? 'O' : 'X';
    }

    setGame({
      board,
      player: nextPlayer,
      status: nextStatus,
      winner,
      moves: moves + 1,
    });
    
  }, [game]);


  const handleClick = (position) => {
    const [row, col] = position;
    const { winner, board, player } = game;

    // do nothing if a winner is determined or if a square has been marked
    if (winner || board[row][col]) {
      return;
    }

    // deep clone the board
    const newBoard = JSON.parse(JSON.stringify(board));

    // mark the board with player's move
    newBoard[row][col] = player;

    updateGame(newBoard);
  }

  useEffect(() => {
    const { board, winner, moves, player } = game;

    // all squares have been marked but no winner declared
    if (moves >= 9 && winner === null) {
      setGame({
        ...game,
        status: 'Draw',
        winner: false,
      });
    } else {

      // no winners yet, but with empty squares available and it is Robot's turn
      if (!winner && moves < 9 && player === 'O') {
        setIsLoading(true);

        fetch(TTT_DEV + '/engine', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
          },
          body: JSON.stringify({ board })
        })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            // delaying board update here to emulate time needed for AI bot to think about its next move
            setTimeout(() => {
              updateGame(data.board);
              setIsLoading(false);
            }, 800);
          }
        })
        .catch(err => {
          console.error({ err });
        })
      }

    }
  }, [game, updateGame]);

  return (
    <GameContext.Provider value={{
      board,
      isLoading,
      handleClick
    }}>
      <Board
        game={game}
        restartGame={restartGame}
        isLoading={isLoading}
      />
    </GameContext.Provider>
  );
}

export default App;
