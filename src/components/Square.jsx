import { GameContext } from './GameScreen';

export const Square = ({ position, hoveredSq, setHoveredSq }) => {
  const [row, col] = position;
  const highlightSqRowCol = row === hoveredSq.x || col === hoveredSq.y ? 'highlight-sq-row-col' : '';

  return (
    <GameContext.Consumer>
      {({ isLoading, handleClick, board }) => (
        <button
          disabled={isLoading}
          onMouseEnter={() => setHoveredSq({ x: row, y: col })}
          onMouseLeave={() => setHoveredSq({ x: null, y: null })}
          arial-label={board[row][col] ? 'empty square' : `square marked ${board[row][col]}` }
          data-testid='square'
          className={`square ${highlightSqRowCol}`}
          onClick={() => handleClick(position)}
        >
          {board[row][col]}
        </button>
      )}
    </GameContext.Consumer>
  )
};

export default Square;
