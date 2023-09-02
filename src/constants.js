export const YOUR_MOVE = 'It\'s your turn'
export const ROBOT_MOVE = '🤖 is thinking...'
export const TTT_PROD="https://d9u7x85vp9.execute-api.us-east-2.amazonaws.com/production"
export const TTT_DEV="https://zrp7d8y3q4.execute-api.us-east-2.amazonaws.com/dev"
export const STATUS_CODE_500_MESSAGE = 'The server encountered an error and could not complete your request. Please report your problem and mention this this error message and the query that caused it.'
export const STATUS_CODE_400_MESSAGE = 'Your client has issued a malformed or illegal request.'
export const INVALID_EMAIL_MSG = 'This is not a valid email format! Username should have 3 characters or more and Domain extension should have 2 to 4 characters. i.e. may@gmail.co or johnny@zmail.meta are valid examples. a@g.c or ab@g.metaverse are not valid examples.'

export const DEFAULT_FORM = { email: '' };
export const DEFAULT_FORM_ERROR = { formError: '', email: '' };

export const WINNING_COMBOS = [
  [
    [0, 0], [0, 1], [0, 2] // top row
  ],
  [
    [1, 0], [1, 1], [1, 2] // mid row
  ],
  [
    [2, 0], [2, 1], [2, 2] // bottom row
  ],
  [
    [0, 0], [1, 0], [2, 0] // left col
  ],
  [
    [0, 1], [1, 1], [2, 1] // center col
  ],
  [
    [0, 2], [1, 2], [2, 2] // right col
  ],
  [
    [0, 0], [1, 1], [2, 2] // left diagonal
  ],
  [
    [0, 2], [1, 1], [2, 0] // right diagonal
  ],
];

export const NEW_GAME = {
  board: Array(3).fill(Array(3).fill('')),
  player: 'X',
  status: YOUR_MOVE,
  winner: null,
  moves: 0,
}