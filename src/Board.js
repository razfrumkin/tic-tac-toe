import { useState } from 'react';

function Board() {
    const [isTurnForX, setIsTurnForX] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));

    function onSquareClick(index) {
        if (!hasSomeoneWon && squares[index] == null) {
            const copy = squares.slice();

            if (isTurnForX) copy[index] = 'X';
            else copy[index] = 'O';

            setSquares(copy);
            setIsTurnForX(!isTurnForX);

            updateStatus();
        }
    }

    function getWinner() {
        const winningLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let index = 0; index < winningLines.length; index += 1) {
            const [first, second, third] = winningLines[index];
            if (squares[first] != null && squares[first] == squares[second] && squares[second] == squares[third])
                return squares[first];
        }

        return null;
    }

    const [status, setStatus] = useState('Current player turn: X');

    function updateStatus() {
        const winner = getWinner();
        if (winner != null) {
            setHasSomeoneWon(true);
            setStatus(`Winner: ${winner}`);
        } else setStatus(`Current player turn: ${isTurnForX ? 'X' : 'O'}`);
    }

    let [hasSomeoneWon, setHasSomeoneWon] = useState(false);

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onClick={() => onSquareClick(0)}/>
                <Square value={squares[1]} onClick={() => onSquareClick(1)}/>
                <Square value={squares[2]} onClick={() => onSquareClick(2)}/>
            </div>
            <div className="board-row">
                <Square value={squares[3]} onClick={() => onSquareClick(3)}/>
                <Square value={squares[4]} onClick={() => onSquareClick(4)}/>
                <Square value={squares[5]} onClick={() => onSquareClick(5)}/>
            </div>
            <div className="board-row">
                <Square value={squares[6]} onClick={() => onSquareClick(6)}/>
                <Square value={squares[7]} onClick={() => onSquareClick(7)}/>
                <Square value={squares[8]} onClick={() => onSquareClick(8)}/>
            </div>
        </>
    );
}

export default Board;

function Square({ value, onClick }) {
    return (
        <button className="square" onClick={onClick}>{value}</button>
    )
}