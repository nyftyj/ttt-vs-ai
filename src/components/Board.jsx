import { useState, useEffect, useRef } from 'react';
import Square from './Square';
import Status from './Status';
import suggestNextMove from '../util/suggestNextMove';

export const Board = ({
    game,
    // handleKeyNav, // for keyboard navigation
    restartGame,
    isLoading,
}) => {
    const [hoveredSq, setHoveredSq] = useState({ x: null, y: null });
    const [suggestedSq, setSuggestSq] = useState({ x: null, y: null, all: null });
    const timerId = useRef(null);

    const { status, hasWinner, moves, winner } = game;
    const isGameTied = status.toLowerCase().includes('draw');
    const shouldRestart = hasWinner || isGameTied;

    const handleSuggestMove = () => {
        suggestNextMove(game, setSuggestSq);
    }

    useEffect(() => {
        if (suggestedSq.x !== null || suggestedSq.y !== null || suggestedSq.all) {
            timerId.current = setTimeout(() => {
                // removing suggestedSq classname from Squares to allow suggestedSq to be applied again
                setSuggestSq({ x: null, y: null, all: null });
            }, 1800);
        }

        return () => {
            clearTimeout(timerId.current);
        }
    }, [suggestedSq])

    return (
        <div data-testid='board-container' className='board-container'>
            <Status className='board-status' status={status} isLoading={isLoading} />
            <div className='board' tabIndex="0">
                <Square position={[0, 0]} hoveredSq={hoveredSq} setHoveredSq={setHoveredSq} suggestedSq={suggestedSq} />
                <Square position={[0, 1]} hoveredSq={hoveredSq} setHoveredSq={setHoveredSq} suggestedSq={suggestedSq} />
                <Square position={[0, 2]} hoveredSq={hoveredSq} setHoveredSq={setHoveredSq} suggestedSq={suggestedSq} />
                <Square position={[1, 0]} hoveredSq={hoveredSq} setHoveredSq={setHoveredSq} suggestedSq={suggestedSq} />
                <Square position={[1, 1]} hoveredSq={hoveredSq} setHoveredSq={setHoveredSq} suggestedSq={suggestedSq} />
                <Square position={[1, 2]} hoveredSq={hoveredSq} setHoveredSq={setHoveredSq} suggestedSq={suggestedSq} />
                <Square position={[2, 0]} hoveredSq={hoveredSq} setHoveredSq={setHoveredSq} suggestedSq={suggestedSq} />
                <Square position={[2, 1]} hoveredSq={hoveredSq} setHoveredSq={setHoveredSq} suggestedSq={suggestedSq} />
                <Square position={[2, 2]} hoveredSq={hoveredSq} setHoveredSq={setHoveredSq} suggestedSq={suggestedSq} />
            </div>
            <div className='board-restart'>
                {(!winner && moves < 9) ? (
                    <button
                        disabled={isLoading}
                        data-testid='board-suggest-move-button'
                        className='board-suggest-move-button'
                        onClick={handleSuggestMove}
                    >
                        Suggest a move
                    </button>
                ) : null}
                {winner || shouldRestart ? (
                    <button
                        data-testid='board-restart-button'
                        className='board-restart-button'
                        onClick={restartGame}
                    >
                        Restart
                    </button>
                ) : null}
            </div>
        </div>
    )
}
