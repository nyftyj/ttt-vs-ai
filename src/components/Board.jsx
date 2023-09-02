import { useState } from 'react';
import Square from './Square';
import Status from './Status';

export const Board = ({
  status,
  board,
  handleClick,
  handleKeyNav, // for keyboard navigation
  hasWinner,
  restartGame,
  isLoading,
}) => {
  const [hoveredSq, setHoveredSq] = useState({ x: null, y: null })
  const isGameTied = status.toLowerCase().includes('draw');
  const shouldRestart = hasWinner || isGameTied;

  const [sqOne, sqTwo, sqThree] = board[0];
  const [sqFour, sqFive, sqSix] = board[1];
  const [sqSeven, sqEight, sqNine] = board[2];
  
  return (
    <div data-testid='board-container' className='board-container'>
      <Status className='board-status' status={status} isLoading={isLoading} />
      <div className='board' tabIndex="0">
        <Square
            position={[0, 0]}
            marking={sqOne}
            hoveredSq={hoveredSq}
            isLoading={isLoading}
            handleClick={handleClick}
            setHoveredSq={setHoveredSq}
        />
        <Square isLoading={isLoading} marking={sqTwo} position={[0, 1]} handleClick={handleClick} hoveredSq={hoveredSq} setHoveredSq={setHoveredSq} />
        <Square isLoading={isLoading} marking={sqThree} position={[0, 2]} handleClick={handleClick} hoveredSq={hoveredSq} setHoveredSq={setHoveredSq} />
        <Square isLoading={isLoading} marking={sqFour} position={[1, 0]} handleClick={handleClick} hoveredSq={hoveredSq} setHoveredSq={setHoveredSq} />
        <Square isLoading={isLoading} marking={sqFive} position={[1, 1]} handleClick={handleClick} hoveredSq={hoveredSq} setHoveredSq={setHoveredSq} />
        <Square isLoading={isLoading} marking={sqSix} position={[1, 2]} handleClick={handleClick} hoveredSq={hoveredSq} setHoveredSq={setHoveredSq} />
        <Square isLoading={isLoading} marking={sqSeven} position={[2, 0]} handleClick={handleClick} hoveredSq={hoveredSq} setHoveredSq={setHoveredSq} />
        <Square isLoading={isLoading} marking={sqEight} position={[2, 1]} handleClick={handleClick} hoveredSq={hoveredSq} setHoveredSq={setHoveredSq} />
        <Square isLoading={isLoading} marking={sqNine} position={[2, 2]} handleClick={handleClick} hoveredSq={hoveredSq} setHoveredSq={setHoveredSq} />
      </div>
      <div className='board-restart'>
        {shouldRestart ? (
          <button
            data-testid='board-restart-button'
            className='board-restart-button'
            onClick={restartGame}
        >
            Restart
          </button>
        ) : null}
      </div>
    </div>
  )
}
