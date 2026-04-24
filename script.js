let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

const main = document.querySelector('main');
let speed = 1 // Change players speed

// Player = 'P', Wall = '*', Enemy = 'E', Point = ' '
let maze = [
    ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
    ['*', 'P', ' ', '*', ' ', ' ', ' ', ' ', 'E', '*'],
    ['*', ' ', ' ', ' ', ' ', ' ', ' ', '*', '*', '*'],
    ['*', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '*'],
    ['*', ' ', '*', '*', ' ', ' ', ' ', ' ', ' ', '*'],
    ['*', ' ', ' ', ' ', ' ', ' ', ' ', '*', '*', '*'],
    ['*', ' ', ' ', '*', ' ', 'E', ' ', ' ', ' ', '*'],
    ['*', ' ', ' ', ' ', ' ', ' ', ' ', '*', ' ', '*'],
    ['*', 'E', '*', ' ', ' ', ' ', ' ', ' ', ' ', '*'],
    ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*']
];

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
    if (downPressed == true) {
        playerTop += speed;
        player.style.top = playerTop + 'px';
        player.classList = 'down';
    }
    else if (upPressed == true) {
        playerTop -= speed;
        player.style.top = playerTop + 'px';
        player.classList = 'up';
    }
    else if (leftPressed == true) {
        playerLeft -= speed;
        player.style.left = playerLeft + 'px';
        player.classList = 'left';
    }
    else if (rightPressed == true) {
        playerLeft += speed;
        player.style.left = playerLeft + 'px';
        player.classList = 'right';
    }
    requestAnimationFrame(move);
}

move();


// disappearing the start button
let start = document.querySelector('.start');
function startGame() {
    start.style.display = 'none';
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
}

start.addEventListener('click', startGame);

// making the on-screen arrow buttons functional
document.querySelector('#ubttn').addEventListener('click', () => {
    upPressed = true;
    downPressed = false;
    leftPressed = false;
    rightPressed = false;
});

document.querySelector('#dbttn').addEventListener('click', () => {
    downPressed = true;
    upPressed = false;
    leftPressed = false;
    rightPressed = false;
});

document.querySelector('#lbttn').addEventListener('click', () => {
    leftPressed = true;
    upPressed = false;
    downPressed = false;
    rightPressed = false;
});

document.querySelector('#rbttn').addEventListener('click', () => {
    rightPressed = true;
    upPressed = false;
    downPressed = false;
    leftPressed = false;
});
