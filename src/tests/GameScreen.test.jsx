import { describe, it }  from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GameScreen from '../components/GameScreen';
import { YOUR_MOVE, ROBOT_MOVE, SUGGEST_MOVE, RESTART_GAME } from '../constants';

describe('GameScreen', () => {

  it('should render default status', () => {
    render(<GameScreen />);
    const statusText = screen.getByText(YOUR_MOVE);
    expect(statusText).toBeInTheDocument();
  });

  it('should render "suggest a move" button by default', () => {
    render(<GameScreen />);
    const restartButtonText = screen.getByText(SUGGEST_MOVE);
    expect(restartButtonText).toBeInTheDocument();
  });

  it('should not render restart game button by default', () => {
    render(<GameScreen />);
    const restartButtonText = screen.queryByText(RESTART_GAME);
    expect(restartButtonText).not.toBeInTheDocument();
  });

  it('should render 9 Squares total', () => {
    render(<GameScreen />);
    const squares = screen.queryAllByTestId('square');

    expect(squares.length).toBe(9);
    expect(squares[0].textContent).toBe('');
    expect(squares[1].textContent).toBe('');
    expect(squares[2].textContent).toBe('');
    expect(squares[3].textContent).toBe('');
    expect(squares[4].textContent).toBe('');
    expect(squares[5].textContent).toBe('');
    expect(squares[6].textContent).toBe('');
    expect(squares[7].textContent).toBe('');
    expect(squares[8].textContent).toBe('');
  });

  it('should mark a square correctly', () => {
    render(<GameScreen />);
    const squares = screen.queryAllByTestId('square');
    fireEvent.click(squares[0]);
    expect(squares[0].textContent).toBe('X');
  });

  it('should not override a square if it has already been marked', () => {
    render(<GameScreen />);
    const squares = screen.queryAllByTestId('square');

    expect(screen.getByTestId('status').textContent).toBe(YOUR_MOVE);
    fireEvent.click(squares[2]);

    expect(squares[2].textContent).toBe('X');
    expect(screen.getByTestId('status').textContent).toBe(ROBOT_MOVE);

    fireEvent.click(squares[2]);
    expect(squares[2].textContent).not.toBe('0');
  });

  it('should render restart button if the game has a winner', () => {
    const winningGame = {
      board: [
        ['X', 'O', 'O'],
        ['', 'X', 'O'],
        ['', '', 'X'],
      ],
      player: 'X',
      status: YOUR_MOVE,
      winner: 'X',
      moves: 6,
    }
    render(<GameScreen newGame={winningGame} />);

    expect(screen.getByTestId('board-restart-button')).toBeInTheDocument();
  });

  it('should render restart button if the game is a draw', () => {
    const tiedGame = {
      board: [
        ['X', 'O', 'X'],
        ['X', 'O', 'X'],
        ['O', 'X', 'O'],
      ],
      player: 'X',
      status: YOUR_MOVE,
      winner: null,
      moves: 9,
    }
    render(<GameScreen newGame={tiedGame} />);
    expect(screen.getByTestId('status').textContent).toBe('Draw');
    expect(screen.getByTestId('board-restart-button')).toBeInTheDocument();
  });

  it('should reset board correctly', () => {
    const currentGame = {
      board: [
        ['X', 'O', 'O'],
        ['', 'X', ''],
        ['', '', ''],
      ],
      player: 'X',
      status: YOUR_MOVE,
      winner: null,
      moves: 4,
    }
    render(<GameScreen newGame={currentGame} />);

    expect(screen.getByTestId('status').textContent).toBe(YOUR_MOVE);
    expect(screen.queryByTestId('board-restart-button')).not.toBeInTheDocument();
    const squares = screen.queryAllByTestId('square');
    fireEvent.click(squares[8]);

    expect(screen.getByTestId('board-restart-button')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('board-restart-button'));

    expect(squares[0].textContent).toBe('');
    expect(squares[1].textContent).toBe('');
    expect(squares[2].textContent).toBe('');
    expect(squares[3].textContent).toBe('');
    expect(squares[4].textContent).toBe('');
    expect(squares[5].textContent).toBe('');
    expect(squares[6].textContent).toBe('');
    expect(squares[7].textContent).toBe('');
    expect(squares[8].textContent).toBe('');
    expect(screen.getByTestId('status').textContent).toBe(YOUR_MOVE);
  });
});

describe('Board Winning Scenarios', () => {
  const currentGame = {
    board: [
      ['X', 'X', ''],
      ['', 'O', 'O'],
      ['', '', ''],
    ],
    player: 'X',
    status: YOUR_MOVE,
    winner: null,
    moves: 4,
  }

  it('should handle top row winning scenario', () => {
    render(<GameScreen newGame={currentGame} />);
    expect(screen.queryByTestId('board-restart-button')).not.toBeInTheDocument();
    const squares = screen.queryAllByTestId('square');
    fireEvent.click(squares[2]);

    expect(screen.getByTestId('status').textContent).toBe('You Won!');
    expect(screen.getByTestId('board-restart-button')).toBeInTheDocument();
  });

  it('should handle mid row winning scenario', () => {
    currentGame.board = [
      ['', 'O', 'O'],
      ['X', 'X', ''],
      ['', '', ''],
    ]
    render(<GameScreen newGame={currentGame} />);
    expect(screen.queryByTestId('board-restart-button')).not.toBeInTheDocument();
    const squares = screen.queryAllByTestId('square');

    fireEvent.click(squares[5]);

    expect(screen.getByTestId('status').textContent).toBe('You Won!');
    expect(screen.getByTestId('board-restart-button')).toBeInTheDocument();
  });

  it('should handle bottom row winning scenario', () => {
    currentGame.board = [
      ['', '', ''],
      ['', 'O', 'O'],
      ['X', 'X', ''],
    ]
    render(<GameScreen newGame={currentGame} />);
    expect(screen.queryByTestId('board-restart-button')).not.toBeInTheDocument();
    const squares = screen.queryAllByTestId('square');

    fireEvent.click(squares[8]);

    expect(screen.getByTestId('status').textContent).toBe('You Won!');
    expect(screen.getByTestId('board-restart-button')).toBeInTheDocument();
  });

  it('should handle left column winning scenario', () => {
    currentGame.board = [
      ['', 'O', ''],
      ['X', 'O', ''],
      ['X', '', ''],
    ]
    render(<GameScreen newGame={currentGame} />);
    expect(screen.queryByTestId('board-restart-button')).not.toBeInTheDocument();
    const squares = screen.queryAllByTestId('square');

    fireEvent.click(squares[0]);

    expect(screen.getByTestId('status').textContent).toBe('You Won!');
    expect(screen.getByTestId('board-restart-button')).toBeInTheDocument();
  });

  it('should handle center column winning scenario', () => {
    currentGame.board = [
      ['', 'X', 'O'],
      ['', 'X', 'O'],
      ['', '', ''],
    ]
    render(<GameScreen newGame={currentGame} />);
    expect(screen.queryByTestId('board-restart-button')).not.toBeInTheDocument();
    const squares = screen.queryAllByTestId('square');

    fireEvent.click(squares[7]);

    expect(screen.getByTestId('status').textContent).toBe('You Won!');
    expect(screen.getByTestId('board-restart-button')).toBeInTheDocument();
  });

  it('should handle right column winning scenario', () => {
    currentGame.board = [
      ['', 'O', 'X'],
      ['', 'O', 'X'],
      ['', '', ''],
    ]
    render(<GameScreen newGame={currentGame} />);
    expect(screen.queryByTestId('board-restart-button')).not.toBeInTheDocument();
    const squares = screen.queryAllByTestId('square');

    fireEvent.click(squares[8]);

    expect(screen.getByTestId('status').textContent).toBe('You Won!');
    expect(screen.getByTestId('board-restart-button')).toBeInTheDocument();
  });

  it('should handle left diagonal winning scenario', () => {
    currentGame.board = [
      ['X', 'O', ''],
      ['O', 'X', ''],
      ['', '', ''],
    ]
    render(<GameScreen newGame={currentGame} />);
    expect(screen.queryByTestId('board-restart-button')).not.toBeInTheDocument();
    const squares = screen.queryAllByTestId('square');

    fireEvent.click(squares[8]);

    expect(screen.getByTestId('status').textContent).toBe('You Won!');
    expect(screen.getByTestId('board-restart-button')).toBeInTheDocument();
  });

  it('should handle right diagonal winning scenario', () => {
    currentGame.board = [
      ['', 'O', 'X'],
      ['O', 'X', ''],
      ['', '', ''],
    ]
    render(<GameScreen newGame={currentGame} />);
    expect(screen.queryByTestId('board-restart-button')).not.toBeInTheDocument();
    const squares = screen.queryAllByTestId('square');

    fireEvent.click(squares[6]);

    expect(screen.getByTestId('status').textContent).toBe('You Won!');
    expect(screen.getByTestId('board-restart-button')).toBeInTheDocument();
  });
});
