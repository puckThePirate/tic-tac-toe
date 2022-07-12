const playAgain = document.querySelector('.play-btn');

const gameBoard = (() => {
    let cells = Array.from(document.querySelectorAll(".cell"));

    return {
        cells
    }
})();

const players = function() {
    let turn = 1;
    let score = 0;
    let mark = 0;
    const msg = document.createElement('div');
    return {
        turn,
        score,
        msg,
        mark
    }
}

let playOne = players();
let playTwo = players();

const start = function() {
    playOne.turn = 1;
    playOne.mark = 0;
    playTwo.mark = 0;
    playOne.msg.textContent = '';
    playTwo.msg.textContent = '';
    gameBoard.cells.forEach(cell => {
        cell.dataset.fill = "0";
        if (cell.lastElementChild !== null) {
            cell.removeChild(cell.lastElementChild);
        }
    });
}

const game = function(e) {
    if (e.target.dataset.fill == "0") {
        mark(e.target);
    }
}

const mark = function(box) {
    if (playOne.turn == 1) {
        playOne.mark++;
        box.dataset.fill = "1";
        playOne.turn = 0;
        playTwo.turn = 1;
        const cross = document.createElement('img');
        cross.setAttribute('src', './images/cross.svg');
        cross.setAttribute('width', '100px');
        cross.setAttribute('height', '100px');
        box.appendChild(cross);
    } else {
        playTwo.mark++;
        box.dataset.fill = "-1";
        playOne.turn = 1;
        playTwo.turn = 0;
        const circle = document.createElement('img');
        circle.setAttribute('src', './images/circle.svg');
        circle.setAttribute('width', '100px');
        circle.setAttribute('height', '100px');
        box.appendChild(circle);
    }

    checkWin();
}

const checkWin = function() {
    let winner = 0,filler = 0;
    if (gameBoard.cells[0].dataset.fill !== "0" && gameBoard.cells[0].dataset.fill == gameBoard.cells[1].dataset.fill && gameBoard.cells[0].dataset.fill == gameBoard.cells[2].dataset.fill) {
        winner = 1;
        filler = gameBoard.cells[0].dataset.fill;
    } else if (gameBoard.cells[3].dataset.fill !== "0" && gameBoard.cells[3].dataset.fill == gameBoard.cells[4].dataset.fill && gameBoard.cells[3].dataset.fill == gameBoard.cells[5].dataset.fill) {
        winner = 1;
        filler = gameBoard.cells[3].dataset.fill;
    } else if (gameBoard.cells[6].dataset.fill !== "0" && gameBoard.cells[6].dataset.fill == gameBoard.cells[7].dataset.fill && gameBoard.cells[6].dataset.fill == gameBoard.cells[8].dataset.fill) {
        winner = 1;
        filler = gameBoard.cells[6].dataset.fill;
    } else if (gameBoard.cells[0].dataset.fill !== "0" && gameBoard.cells[0].dataset.fill == gameBoard.cells[3].dataset.fill && gameBoard.cells[0].dataset.fill == gameBoard.cells[6].dataset.fill) {
        winner = 1;
        filler = gameBoard.cells[0].dataset.fill;
    } else if (gameBoard.cells[1].dataset.fill !== "0" && gameBoard.cells[1].dataset.fill == gameBoard.cells[4].dataset.fill && gameBoard.cells[1].dataset.fill == gameBoard.cells[7].dataset.fill) {
        winner = 1;
        filler = gameBoard.cells[1].dataset.fill;
    } else if (gameBoard.cells[2].dataset.fill !== "0" && gameBoard.cells[2].dataset.fill == gameBoard.cells[5].dataset.fill && gameBoard.cells[2].dataset.fill == gameBoard.cells[8].dataset.fill) {
        winner = 1;
        filler = gameBoard.cells[2].dataset.fill;
    } else if (gameBoard.cells[0].dataset.fill !== "0" && gameBoard.cells[0].dataset.fill == gameBoard.cells[4].dataset.fill && gameBoard.cells[0].dataset.fill == gameBoard.cells[8].dataset.fill) {
        winner = 1;
        filler = gameBoard.cells[0].dataset.fill;
    } else if (gameBoard.cells[2].dataset.fill !== "0" && gameBoard.cells[2].dataset.fill == gameBoard.cells[4].dataset.fill && gameBoard.cells[2].dataset.fill == gameBoard.cells[6].dataset.fill) {
        winner = 1;
        filler = gameBoard.cells[2].dataset.fill;
    }

    if(winner == 1) {
        gameBoard.cells.forEach(cell => {
            cell.dataset.fill = filler;
        })
        callout(filler);
    } else if(playOne.mark + playTwo.mark == 9) callout(0);
}

const callout = function(filler) {
    if(filler == 1) {
        playOne.score++;
        const displayScore = document.querySelector('.playone-score');
        const theScore = document.createElement('div');
        theScore.textContent = playOne.score;
        displayScore.removeChild(displayScore.lastElementChild);
        displayScore.appendChild(theScore);

       
        const parent = document.querySelector('.play-one');
        playOne.msg.style.color = '#4fffb0';
        playOne.msg.textContent = "Player One Wins!";
        parent.appendChild(playOne.msg);

    }
    else if(filler == -1) {
        playTwo.score++;
        const displayScore = document.querySelector('.playtwo-score');
        const theScore = document.createElement('div');
        theScore.textContent = playTwo.score;
        displayScore.removeChild(displayScore.lastElementChild);
        displayScore.appendChild(theScore);

        const parent = document.querySelector('.play-two');
        playTwo.msg.style.color = '#4fffb0';
        playTwo.msg.textContent = "Player Two Wins!";
        parent.appendChild(playTwo.msg);
    } else {
        const parenttwo = document.querySelector('.play-two');
        const parentone = document.querySelector('.play-one');
        playOne.msg.style.color = '#ffd700';
        playTwo.msg.style.color = '#ffd700';
        playTwo.msg.textContent = "Draw!";
        playOne.msg.textContent = "Draw!";
        parentone.appendChild(playOne.msg);
        parenttwo.appendChild(playTwo.msg);
    }
}

gameBoard.cells.forEach(cell => {
    cell.addEventListener('click', game);
});

playAgain.addEventListener('click', start);