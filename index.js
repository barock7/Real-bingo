document.addEventListener('DOMContentLoaded', () => {
    const boardSelectContainer = document.getElementById('board-select-container');
    const betAmountInput = document.getElementById('bet-amount');

    // Retrieve the most recently used bet amount from localStorage
    const savedBetAmount = localStorage.getItem('bet_amount');
    if (savedBetAmount) {
        betAmountInput.value = savedBetAmount;
    }

    function seedRandom(seed) {
        let m = 0x80000000;
        let a = 1103515245;
        let c = 12345;
        let state = seed ? seed : Math.floor(Math.random() * (m - 1));

        return function() {
            state = (a * state + c) % m;
            return state / (m - 1);
        };
    }

    function shuffle(array, randomFunc) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(randomFunc() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function generateUniqueBingoBoards() {
        const randomFunc = seedRandom(12345); // Fixed seed for consistent results
        const boards = [];
        const ranges = [
            Array.from({ length: 15 }, (_, i) => i + 1),  // B column: 1-15
            Array.from({ length: 15 }, (_, i) => i + 16), // I column: 16-30
            Array.from({ length: 15 }, (_, i) => i + 31), // N column: 31-45
            Array.from({ length: 15 }, (_, i) => i + 46), // G column: 46-60
            Array.from({ length: 15 }, (_, i) => i + 61)  // O column: 61-75
        ];

        for (let i = 0; i < 100; i++) {
            const board = [];
            const boardRanges = ranges.map(range => [...range]);
            boardRanges.forEach(range => shuffle(range, randomFunc));

            for (let row = 0; row < 5; row++) {
                const currentRow = [];
                for (let col = 0; col < 5; col++) {
                    if (row === 2 && col === 2) {
                        currentRow.push('FREE');
                    } else {
                        currentRow.push(boardRanges[col][row]);
                    }
                }
                board.push(currentRow);
            }
            boards.push(board);
        }

        return boards;
    }

    // Generate and use the same boards every time
    const boards = generateUniqueBingoBoards();

    // Save the generated boards to localStorage for use in the second page
    localStorage.setItem('bingo_boards', JSON.stringify(boards));

    // Display the boards
    boards.forEach((board, index) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `board-${index + 1}`;
        checkbox.value = index;
        const label = document.createElement('label');
        label.setAttribute('for', `board-${index + 1}`);
        label.textContent = index + 1;
        boardSelectContainer.appendChild(checkbox);
        boardSelectContainer.appendChild(label);
    });

    document.getElementById('play-button').addEventListener('click', () => {
        const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        const selectedIndices = Array.from(checkedCheckboxes).map(cb => parseInt(cb.value, 10));
        const betAmount = betAmountInput.value;
        if (selectedIndices.length > 0 && betAmount) {
            localStorage.setItem('selected_boards', JSON.stringify(selectedIndices));
            localStorage.setItem('bet_amount', betAmount);
            window.location.href = 'bingo_caller.html';
        } else {
            alert('Please select at least one board and enter a bet amount.');
        }
    });

    document.getElementById('view-selected-button').addEventListener('click', () => {
        const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        const selectedIndices = Array.from(checkedCheckboxes).map(cb => parseInt(cb.value, 10));
        if (selectedIndices.length > 0) {
            localStorage.setItem('selected_boards', JSON.stringify(selectedIndices));
        } else {
            alert('Please select at least one board.');
        }
    });
});

document.getElementById('indexForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const betAmount = document.getElementById('betAmount').value;
    const totalPlayers = document.getElementById('totalPlayers').value;
    localStorage.setItem('betAmount', betAmount);
    localStorage.setItem('totalPlayers', totalPlayers);
    window.location.href = 'bingo_caller.html';
});
