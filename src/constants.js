export const API = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_TTT_PROD
  : process.env.REACT_APP_TTT_DEV;

export const YOUR_MOVE = 'It\'s your turn'
export const ROBOT_MOVE = '🤖 is thinking...'
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

export const ACCESSIBLE_ARIA_LABEL = {
  0 : {
    0: 'top left',
    1: 'top center',
    2: 'top right',
  },
  1 : {
    0: 'center left',
    1: 'center center',
    2: 'center right',
  },
  2 : {
    0: 'bottom left',
    1: 'bottom center',
    2: 'bottom right',
  },
}

export const NEW_GAME = {
  board: Array(3).fill(Array(3).fill('')),
  player: 'X',
  status: YOUR_MOVE,
  winner: null,
  moves: 0,
}