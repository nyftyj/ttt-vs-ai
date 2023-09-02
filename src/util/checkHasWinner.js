import { WINNING_COMBOS } from "../constants";

export const checkHasWinner = (board) => {
  let winner = '';

  const hasWinner = WINNING_COMBOS.some(combo => {
    const [sqOne, sqTwo, sqThree] = combo;

    const [sqOneRow, sqOneCol] = sqOne;
    const [sqTwoRow, sqTwoCol] = sqTwo;
    const [sqThreeRow, sqThreeCol] = sqThree;

    const cellOne = board[sqOneRow][sqOneCol];
    const cellTwo = board[sqTwoRow][sqTwoCol];
    const cellThree = board[sqThreeRow][sqThreeCol];

    winner = cellOne;

    // we have a winner if all three squares are not empty and all squares are marked the same
    return cellOne && cellTwo && cellThree &&
      cellOne === cellTwo &&
      cellOne === cellThree
  })

  return hasWinner ? winner : null;
}
