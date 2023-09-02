export const Square = ({ marking, position, handleClick, hoveredSq, setHoveredSq, isLoading }) => {
  const [row, col] = position;
  const squareAriaLabel = !marking ? 'empty square' : `square marked ${marking}`;

  const highlightSqRowCol = row === hoveredSq.x || col === hoveredSq.y ? 'highlight-sq-row-col' : '';

  return (
    <button
      disabled={isLoading}
      onMouseEnter={() => setHoveredSq({ x: row, y: col })}
      onMouseLeave={() => setHoveredSq({ x: null, y: null })}
      arial-label={squareAriaLabel}
      data-testid='square'
      className={`square ${highlightSqRowCol}`}
      onClick={() => handleClick(position)}
    >
      {marking}
    </button>
  )
};

export default Square;
