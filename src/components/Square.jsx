import { GameContext } from './GameScreen';

export const Square = ({ position, hoveredSq, setHoveredSq, suggestedSq }) => {
  const [row, col] = position;
  const highlightSqRowCol = row === hoveredSq.x || col === hoveredSq.y ? ' highlight-sq-row-col' : '';

  let highlightSuggestedSq = '';
  if (suggestedSq.all) {
    highlightSuggestedSq = ' suggested-square'
  } else {
    highlightSuggestedSq = (row === suggestedSq.x && col === suggestedSq.y) ? ' suggested-square' : '';
  }

  return (
    <GameContext.Consumer>
      {({ isLoading, handleClick, board }) => (
        <button
          disabled={isLoading}
          onMouseEnter={() => setHoveredSq({ x: row, y: col })}
          onMouseLeave={() => setHoveredSq({ x: null, y: null })}
          arial-label={board[row][col] ? `square marked ${board[row][col]}` : 'empty square' }
          data-testid='square'
          className={`square${highlightSqRowCol}${highlightSuggestedSq}`}
          onClick={() => handleClick(position)}
        >
          {board[row][col]}
        </button>
      )}
    </GameContext.Consumer>
  )
};

export default Square;
