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
        let newRight = position.right + 1;

        let topR = document.elementFromPoint(newRight, position.top);
        let btmR = document.elementFromPoint(newRight, position.bottom);

        if (topR.classList.contains('wall') === false &&
            btmR.classList.contains('wall') === false) {

            playerLeft++;
            player.style.left = playerLeft + "px";
        }
    }

    requestAnimationFrame(move);

    check()

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

    setInterval(function () {
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

start.addEventListener('click', startGame);

// making the on-screen arrow buttons functional
const lBttn = document.querySelector('#lbttn');
const rBttn = document.querySelector('#rbttn');
const uBttn = document.querySelector('#ubttn');
const dBttn = document.querySelector('#dbttn');

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
        }
    }
}
