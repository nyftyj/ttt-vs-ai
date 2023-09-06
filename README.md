# Tic Tac Toe
A simple 3x3 Tic Tac Toe game written with React. Initialized with create-react-app but migrated to Vite.

![Screenshot 2023-09-05 at 7 58 54 PM](https://github.com/nyftyj/ttt-vs-ai/assets/137852740/8780125f-26fe-482e-9618-1fc13b0372dd)

## Set up
```bash
yarn install # install dependencies with yarn
yarn start # run app on http://localhost:5173/
yarn test # run vitest
yarn build # build for production
yarn serve # http://localhost:4173/
```

## Features
- Renders a Restart game button when there's a winner 
- Renders a Restart game button if the game is tied
- Does not override a marked Square
- When mouse hovers above a square the whole row and column is highlighted
- Board's Square and interactive buttons are disabled during an API request, with loading spinner as indicator
- Renders a Suggest a move button 

## Architectural Decisions
### PrivateRoutes
- PrivateRoutes determine if a player can access the /game page by checking for a server token in sessionStorage.
- Invalid route requests automatically redirect to /game, and without the expected tokens, users are redirected to signup screen.

### SignupScreen
- SignupScreen includes Material UI's TextField and Button components, along with a reusable Status component.
- TextField validates user input (email) before sending a POST request to /auth. It displays helpful error messages for invalid input.

### GameScreen
- GameScreen renders a Board component with reusable Status component, nine Square components, and a game board button (restart or suggest button).

### Questions, Decisions and Trade-offs
- Considered using a 1D array for the board instead of a 2D matrix for simplicity and space efficiency. Opted for the latter as it met requirements.
- Evaluated useState vs. useReducer for managing state and decided on useState for simplicity since states don't intermingle.
- Created a custom useForm hook for form input validation, keeping the code clean and reusable.
- Avoided prop drilling by using Context.Provider and Context.Consumer to manage state.

### UX/UI Decisions
- Introduced hover effects for highlighting rows and columns using onMouseEnter and onMouseLeave.
- Opted for a single button display to maintain a clean user interface instead of two buttons: "restart game" and "suggest a move"
- Reserved the "restart button" for game states when there's a winner or if there's a tied game to avoid overuse.

### Accessibility (A11y)
- Ensured optimal color contrast using [webaim](https://webaim.org/resources/contrastchecker/).
- Implemented keyboard accessibility for tab navigation and considered arrow key detection. One way to implement arrow key detection is to listen to onKeyDown events and make associated focused Square highlighted as user navigates around the board.
- Worked on screen reader support with proper labeling and explored options for announcing board status with a click of a button (i.e. X is marked on top left. O is marked center center. Empty squares are top center, top right, center left, center right, bottom right, bottom center, bottom right).

### Bootstrap (B) vs Material UI (M)
- Chose Material UI for its customization options, even though Bootstrap is more consistent and user-friendly. Material UI's flexibility allows for a unique design. 

### Build tools: Vite vs Webpack
- Vite was chosen due to its impressive speed, making development more efficient compared to Webpack. Vite serves and bundles code on-the-fly, reducing build times.
