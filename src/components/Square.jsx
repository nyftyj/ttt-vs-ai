import { GameContext } from './GameScreen';
import { ACCESSIBLE_ARIA_LABEL } from '../constants';

export const Square = ({ position, hoveredSq, setHoveredSq, suggestedSq }) => {
  const [row, col] = position;
  const highlightSqRowCol = row === hoveredSq.x || col === hoveredSq.y ? 'highlight-sq-row-col' : '';

  let highlightSuggestedSq = '';
  if (suggestedSq.all) {
    highlightSuggestedSq = 'suggested-square';
  } else {
    highlightSuggestedSq = (row === suggestedSq.x && col === suggestedSq.y) ? 'suggested-square' : '';
  }

  return (
    <GameContext.Consumer>
      {({ isLoading, handleClick, board }) => {
        const marking = board[row][col];
        return (
          <button
            disabled={isLoading}
            onMouseEnter={() => setHoveredSq({ x: row, y: col })}
            onMouseLeave={() => setHoveredSq({ x: null, y: null })}
            aria-label={
              marking
                ?  `${marking} marked to ${ACCESSIBLE_ARIA_LABEL[row][col]}`
                : `add X to ${ACCESSIBLE_ARIA_LABEL[row][col]}`
              }
            data-testid='square'
            className={`square ${highlightSqRowCol} ${highlightSuggestedSq}`.trim()}
            onClick={() => handleClick(position)}
          >
            {marking}
          </button>
        )
      }}
    </GameContext.Consumer>
  )
};

export default Square;
