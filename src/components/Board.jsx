import { useState } from 'react';
import Square from './Square';
import Status from './Status';

export const Board = ({
  status,
  handleKeyNav, // for keyboard navigation
  hasWinner,
  restartGame,
  isLoading,
}) => {
  const [hoveredSq, setHoveredSq] = useState({ x: null, y: null })
  const isGameTied = status.toLowerCase().includes('draw');
  const shouldRestart = hasWinner || isGameTied;
  
  return (
    <div data-testid='board-container' className='board-container'>
      <Status className='board-status' status={status} isLoading={isLoading} />
      <div className='board' tabIndex="0">
        <Square position={[0, 0]} hoveredSq={hoveredSq} setHoveredSq={setHoveredSq} />
        <Square position={[0, 1]} hoveredSq={hoveredSq} setHoveredSq={setHoveredSq} />
        <Square position={[0, 2]} hoveredSq={hoveredSq} setHoveredSq={setHoveredSq} />
        <Square position={[1, 0]} hoveredSq={hoveredSq} setHoveredSq={setHoveredSq} />
        <Square position={[1, 1]} hoveredSq={hoveredSq} setHoveredSq={setHoveredSq} />
        <Square position={[1, 2]} hoveredSq={hoveredSq} setHoveredSq={setHoveredSq} />
        <Square position={[2, 0]} hoveredSq={hoveredSq} setHoveredSq={setHoveredSq} />
        <Square position={[2, 1]} hoveredSq={hoveredSq} setHoveredSq={setHoveredSq} />
        <Square position={[2, 2]} hoveredSq={hoveredSq} setHoveredSq={setHoveredSq} />
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
