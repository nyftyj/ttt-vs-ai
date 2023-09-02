# Tic Tac Toe
A simple 3x3 Tic Tac Toe game written with React. Initialized with create-react-app.

## Features
- Handles resetting the game when there's a winner
- Handles resetting the game if the game is tied
- Does not override a marked Square

## Architectural Decisions
- 2D matrix vs 1D board state
- useState vs useReducer: use useReducer hook if too many states are mingling with each other. If states do not mingle, keeping track of them in separate useState hooks makes sense.



## Things considered when choosing between Bootstramp (B) vs MaterialUI (M)
1. Browser compability: both are solid for browser compatibility.
2. Responsive Grid system, both use 12-grid system
- B: Containers, rows, columns
- M: Columns, gutters, margins
3. Custimization
- M: more options for custimzation, more aesthetically pleasing, react-based components
- B: responsive and functional, complex framework, standard default system for web dev
4. Consistency & Uniqueness
- B: Consistent, intuitive, user-friendly. But not unique, may make or feel the app similar to many other apps that use Bootstrap
- M: Can be built to be unique due to its custimization capabilities
5. Community Support
- M: smaller community
- B: large and active community


Drawbacks:
- B: too consistent, library may be too bulky?
- M: too comprehensive and may not be suitable for beginner developers, some designs are not too intuitive

Decision: I went with Material UI but I really wouldn't mind exploring other supplementary options like TailwindCSS. It seems the industry is moving towards this direction. Another alternative is mantine.dev


## Set up
```bash
yarn install # install dependencies with yarn
yarn start # run app on localhost:3000
yarn test # run unit tests
```