let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

let score = 0;
const pointsDisplay = document.querySelector('.score p');

const main = document.querySelector('main');
let speed = 1 // Change players speed

let gameOver = false;

// Player = 'P', Wall = '*', Enemy = 'E', Point = ' '
let maze = [
    ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
    ['*', 'P', ' ', '*', ' ', ' ', ' ', ' ', ' ', '*'],
    ['*', ' ', ' ', ' ', ' ', ' ', ' ', '*', '*', '*'],
    ['*', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '*'],
    ['*', ' ', '*', '*', ' ', ' ', ' ', ' ', ' ', '*'],
    ['*', ' ', ' ', ' ', ' ', ' ', ' ', '*', '*', '*'],
    ['*', ' ', ' ', '*', ' ', ' ', ' ', ' ', ' ', '*'],
    ['*', ' ', ' ', ' ', ' ', ' ', ' ', '*', ' ', '*'],
    ['*', ' ', '*', ' ', ' ', ' ', ' ', ' ', ' ', '*'],
    ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*']
];

// randomizing the ghosts
function addGhost() {
    let x = Math.floor(Math.random() * maze.length);
    let y = Math.floor(Math.random() * maze[x].length);

    if (maze[x][y] === ' ') {
        maze[x][y] = 'E';
    }
    else {
        addGhost();
    }
}

addGhost();
addGhost();
addGhost();

// Populates the maze
maze.forEach((y) => {
    y.forEach((x) => {
        let block = document.createElement('div')
        block.classList = 'block'

        switch (x) {
            case '*':
                block.classList.add('wall')
                break;
            case 'P':
                block.id = 'player';
                break;
            case 'E':
                block.classList.add('enemy');
                break
            default:
                block.classList.add('point')
        }

        main.appendChild(block)
    })
})

// Player movement
function keyUp(event) {
    if (event.key === 'ArrowUp') {
        upPressed = false;
    } else if (event.key === 'ArrowDown') {
        downPressed = false;
    } else if (event.key === 'ArrowLeft') {
        leftPressed = false;
    } else if (event.key === 'ArrowRight') {
        rightPressed = false;
    }
}

function keyDown(event) {

    stopMovement();

    if (event.key === 'ArrowUp') {
        upPressed = true;
    } else if (event.key === 'ArrowDown') {
        downPressed = true;
    } else if (event.key === 'ArrowLeft') {
        leftPressed = true;
    } else if (event.key === 'ArrowRight') {
        rightPressed = true;
    }
}

const player = document.querySelector('#player');
let playerTop = 0;
let playerLeft = 0;

function move() {
    const position = player.getBoundingClientRect();

    if (downPressed) {
        setDirection('down');

        let newBottom = position.bottom + 1;

        let btmL = document.elementFromPoint(position.left, newBottom);
        let btmR = document.elementFromPoint(position.right, newBottom);

        if (btmL.classList.contains('wall') === false &&
            btmR.classList.contains('wall') === false) {
            playerTop++;
            player.style.top = playerTop + "px";
        }

    }

    if (leftPressed) {
        setDirection('left');

        let newLeft = position.left - 1;

        let topL = document.elementFromPoint(newLeft, position.top);
        let btmL = document.elementFromPoint(newLeft, position.bottom);

        if (topL.classList.contains('wall') === false &&
            btmL.classList.contains('wall') === false) {

            playerLeft--;
            player.style.left = playerLeft + "px";
        }
    }

    if (upPressed) {
        setDirection('up');

        let newTop = position.top - 1;

        let topL = document.elementFromPoint(position.left, newTop);
        let topR = document.elementFromPoint(position.right, newTop);

        if (topL.classList.contains('wall') === false &&
            topR.classList.contains('wall') === false) {
            playerTop--;

            player.style.top = playerTop + "px";
        }
    }

    if (rightPressed) {
        setDirection('right');

        let newRight = position.right + 1;

        let topR = document.elementFromPoint(newRight, position.top);
        let btmR = document.elementFromPoint(newRight, position.bottom);

        if (topR.classList.contains('wall') === false &&
            btmR.classList.contains('wall') === false) {

            playerLeft++;
            player.style.left = playerLeft + "px";
        }
    }

    enemyCollision();
    check();

    if (gameOver == false) {
        requestAnimationFrame(move);
    }

    // setting the direction of mouth during movement
    function setDirection(direction) {
        player.classList.remove('up', 'down', 'left', 'right');
        player.classList.add(direction);
    }

}

// enemy collision
function enemyCollision() {
    const enemies = document.querySelectorAll('.enemy');
    const position = player.getBoundingClientRect();

    for (let enemy of enemies) {
        const enemyPosition = enemy.getBoundingClientRect();

        if (position.right > enemyPosition.left &&
            position.left < enemyPosition.right &&
            position.bottom > enemyPosition.top &&
            position.top < enemyPosition.bottom) {

            GameOver();
            return;
        }
    }
}

function GameOver() {
    gameOver = true;
    document.querySelector('.GameOver').style.display = 'flex';
    stopMovement();

    const name = prompt('Enter your name:')
    if (name && name.trim() != '') {
        addToLeaderboard(name.trim(), score);
        saveScore(name.trim(), score);
    }

}

move();

// disappearing the start button
let start = document.querySelector('.start');
function startGame() {
    start.style.display = 'none';
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);

    const ghosts = document.querySelectorAll('.enemy');

    for (let ghost of ghosts) {
        moveGhost(ghost);
    }
}

// ghost movement
function moveGhost(ghost) {
    let ghostTop = 0;
    let ghostLeft = 0;
    let random = Math.ceil(Math.random() * 4);

    let timer = setInterval(function () {

        if (gameOver) {
            clearInterval(timer);
            return;
        }

        // collision detection for ghosts
        const position = ghost.getBoundingClientRect();
        if (random == 1) {
            let newBottom = position.bottom + 1;
            let btmL = document.elementFromPoint(position.left, newBottom);
            let btmR = document.elementFromPoint(position.right, newBottom);

            if (btmL.classList.contains('wall') == false && btmR.classList.contains('wall') == false) {
                ghostTop += speed;
            }
            else {
                random = Math.ceil(Math.random() * 4);
            }
        }

        else if (random == 2) {
            let newTop = position.top - 1;
            let topL = document.elementFromPoint(position.left, newTop);
            let topR = document.elementFromPoint(position.right, newTop);

            if (topL.classList.contains('wall') == false && topR.classList.contains('wall') == false) {
                ghostTop -= speed;
            }
            else {
                random = Math.ceil(Math.random() * 4);
            }
        }

        else if (random == 3) {
            let newLeft = position.left - 1;
            let topL = document.elementFromPoint(newLeft, position.top);
            let btmL = document.elementFromPoint(newLeft, position.bottom);

            if (topL.classList.contains('wall') == false && btmL.classList.contains('wall') == false) {
                ghostLeft -= speed;
            }
            else {
                random = Math.ceil(Math.random() * 4);
            }
        }

        else if (random == 4) {
            let newRight = position.right + 1;
            let topR = document.elementFromPoint(newRight, position.top);
            let btmR = document.elementFromPoint(newRight, position.bottom);

            if (topR.classList.contains('wall') == false && btmR.classList.contains('wall') == false) {
                ghostLeft += speed;
            }
            else {
                random = Math.ceil(Math.random() * 4);
            }
        }

        ghost.style.top = ghostTop + 'px';
        ghost.style.left = ghostLeft + 'px';
    }, 10);
}

function clearGhosts() {
    const ghosts = document.querySelectorAll('.enemy');

    for (let ghost of ghosts) {
        ghost.parentNode.removeChild(ghost);
    }
}

start.addEventListener('click', startGame);

// making the on-screen arrow buttons functional
const lbttn = document.querySelector('#lbttn');
const rbttn = document.querySelector('#rbttn');
const ubttn = document.querySelector('#ubttn');
const dbttn = document.querySelector('#dbttn');

lbttn.addEventListener('click', () => { stopMovement(); leftPressed = true; });
rbttn.addEventListener('click', () => { stopMovement(); rightPressed = true; });
ubttn.addEventListener('click', () => { stopMovement(); upPressed = true; });
dbttn.addEventListener('click', () => { stopMovement(); downPressed = true; });

function stopMovement() {
    rightPressed = false;
    leftPressed = false;
    upPressed = false;
    downPressed = false;

}

document.querySelector('#rbttn').addEventListener('click', () => {
    rightPressed = true;
    upPressed = false;
    downPressed = false;
    leftPressed = false;
});

// collecting points
function check() {
    let position = player.getBoundingClientRect();
    let points = document.querySelectorAll('.point');

    for (let i = 0; i < points.length; i++) {
        let pos = points[i].getBoundingClientRect();
        if (
            position.right > pos.left &&
            position.left < pos.right &&
            position.bottom > pos.top &&
            position.top < pos.bottom
        ) {
            points[i].classList.remove('point');
            updateScore();
        }
    }

    let remainingPoints = document.querySelectorAll('.point');

    if (remainingPoints.length === 0 && gameOver === false) {
        GameOver();
    }

}

function updateScore() {
    score++;
    pointsDisplay.innerHTML = score;
}

// adding lives 
function removeLife() {
    const li = document.querySelector('.lives ul li');
    li.parentNode.removeChild(li);
}

function addLife() {
    const ul = document.querySelector('.lives ul');
    const li = document.createElement('li');

    ul.appendChild(li);
}

addLife();
addLife();
addLife();

// leaderboard
const ol = document.querySelector('.leaderboard ol');

function addToLeaderboard(name, highscore) {
    const li = document.createElement('li');
    const text = document.createTextNode(`${name}............${highscore}`);
    li.appendChild(text);
    ol.appendChild(li);
}

function saveScore(name, score) {
    localStorage.setItem(name, score);
}

function getLeaderboard() {
    // clear existing entries to help sort
    ol.innerHTML = '';

    // getting scores from local storage
    let leaderboardArray = [];

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        if (key && value) {
            leaderboardArray.push([key, value]);
        }
    }

    // sorting
    // reference: developer.mozilla.org. (n.d.). Array.prototype.sort() - JavaScript | MDN. [online] Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort.
    leaderboardArray.sort((a, b) => b[1] - a[1]);

    // display top 10 scores
    // reference: developer.mozilla.org. (2024). Array.prototype.slice() - JavaScript | MDN. [online] Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice.
    leaderboardArray.slice(0, 10).forEach(board => {
        addToLeaderboard(board[0], board[1]);
    });
}

getLeaderboard();