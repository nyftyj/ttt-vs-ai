import { checkHasWinner } from '../util/checkHasWinner';

const findAllEmptySquares = (board) => {
    const emptySquares = [];
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            const square = board[row][col];
            if (square === '') {
                emptySquares.push({ row, col });
            }
        }
    }

    return emptySquares;
}

// this helper function is to predict up to the next 2 possible player moves
// if it cannot find a strategy to win with 2 more moves, then it will attempt to find a single move to win the match.
// if it cannot find a single move then it player may best advised to play defensively
const findNextPlayerMove = (board, emptySquares) => {
    const suggestions = {
        canWinWithOneMove: false,
        canWinWithTwoMoves: false,
    };
    const bestMoves = [];
    let count = 0;

    for (let i = 0; i < emptySquares.length; i++) {
        const nextPlayerMove = emptySquares[i];
        const { row, col } = nextPlayerMove;
        board[row][col] = 'X';

        for (let j = 0; j < emptySquares.length; j++) {
            const nextBotMove = emptySquares[j];
            const { row: botRow, col: botCol } = nextBotMove;

            if (board[botRow][botCol]) {
                continue;
            } else if (board[botRow][botCol] === '') {
                board[botRow][botCol] = 'O'

                for (let k = 0; k < emptySquares.length; k++) {
                    const nextNextPlayerMove = emptySquares[k];

                    // nnRow is nextNextRow shorthand
                    const { row: nnRow, col: nnCol } = nextNextPlayerMove;
                    if (board[nnRow][nnCol]) {
                        continue;
                    } else if (board[nnRow][nnCol] === '') {
                        board[nnRow][nnCol] = 'X';
                        if (checkHasWinner(board)) {
                            count++;
                            if (count >= 2) {
                                bestMoves.push({ row, col })
                            }
                        }
                    }
                    board[nnRow][nnCol] = '';
                }
                count = 0;

            }
            board[botRow][botCol] = ''
        }
        board[row][col] = '';
    }

    // if we can't find a move that will force the bot to choose between defending two winning squares, try finding one move that will win the game
    console.log({ bestMoves })
    if (bestMoves.length === 0) {
        for (let i = 0; i < emptySquares.length; i++) {
            const { row, col } = emptySquares[i];
            board[row][col] = 'X';

            if (checkHasWinner(board)) {
                suggestions.canWinWithOneMove = true;
                bestMoves.push({ row, col })
            }
            board[row][col] = '';
        }
    }

    return {
        shouldAttack: bestMoves.length > 0,
        winningSq: bestMoves.length > 0 ? bestMoves[0] : null,
        ...suggestions
    }
};

const canBotWinWithNextMove = (board, emptySquares) => {
    const botWinningMoves = [];
    for (let i = 0; i < emptySquares.length; i++) {
        const { row, col } = emptySquares[i];
        board[row][col] = 'O';

        if (checkHasWinner(board)) {
            botWinningMoves.push({
                row, col
            })
            break;
        }
        board[row][col] = '';
    }

    return {
        shouldDefend: botWinningMoves.length > 0,
        defendingSq: botWinningMoves.pop(),
    }
}

const suggestNextMove = (game, cb) => {
    const { moves, board } = game;
    const clonedBoard = JSON.parse(JSON.stringify(board));

    // if moves is 9, disable 'suggest move' button
    if (moves === 9) {
        return;
    }

    // if total moves made on the board is 0, all squares are available, apply pulsating color css to all Squares
    if (moves === 0) {
        cb({ x: null, y: null, all: true });
        return;
    }

    // If total moves made is 2, check if center Square is taken, if taken, find any empty squares
    // Perhaps there could be more strategy built into which corner to select but I will not build that for MVP version.
    if (moves === 2) {
        const center = clonedBoard[1][1];
        if (!center) {
            cb({ x: 1, y: 1, all: null });
            return;
        } else {
            const emptySquares = findAllEmptySquares(clonedBoard);
            const randomEmptySquare = Math.floor(Math.random() * emptySquares.length);
            const { row, col } = emptySquares[randomEmptySquare];
            cb({ x: row, y: col, all: null })
            return;
        }
    }

    // if moves is 4 or greater, determine 2 things:
        // 1. what's the best next player move? 
            // if user can win with one more move, suggest the move
            // if user cannot win with one more move, suggest a move where user can win within two moves
        // 2. can the bot win with one more move? if bot can win, suggest move to defend
    // compare findings and return suggestion
    if (moves >= 4 && moves < 9) {
        const emptySquares = findAllEmptySquares(clonedBoard);
        const {
            shouldAttack,
            winningSq,
            canWinWithTwoMoves,
            canWinWithOneMove,
        } = findNextPlayerMove(clonedBoard, emptySquares);
        const { shouldDefend, defendingSq } = canBotWinWithNextMove(clonedBoard, emptySquares);

        if (shouldAttack && canWinWithOneMove) {
            console.log('in here 1')
            cb({ x: winningSq.row, y: winningSq.col, all: null })
            return;
        } else if (shouldDefend || canWinWithTwoMoves) {
            console.log('in here 2')
        // there could be cases where bot has more than one option to win
            cb({ x: defendingSq.row, y: defendingSq.col, all: null })
            return;
        } else {
            console.log('in here 3')
            console.log({ emptySquares })
            const nextBestMove = emptySquares[0];
            cb({ x: nextBestMove.row, y: nextBestMove.col, all: null });
            return;
        }

    }
};

export default suggestNextMove;