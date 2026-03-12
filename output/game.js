let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
const scale = 20;
let score = 0;

// initial snake (3 segments)
let snake = [
    { x: scale * 5, y: scale * 5 },
    { x: scale * 4, y: scale * 5 },
    { x: scale * 3, y: scale * 5 }
];

// place first food
let food = {
    x: Math.floor(Math.random() * (canvas.width / scale)) * scale,
    y: Math.floor(Math.random() * (canvas.height / scale)) * scale
};

let direction = 'right';

// draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // snake
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, scale, scale);
    });

    // food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, scale, scale);

    // score
    ctx.fillStyle = 'black';
    ctx.font = '18px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

// update snake position and game state
function update() {
    // compute new head based on direction
    let head = { x: snake[0].x, y: snake[0].y };
    if (direction === 'right') head.x += scale;
    else if (direction === 'left') head.x -= scale;
    else if (direction === 'up') head.y -= scale;
    else if (direction === 'down') head.y += scale;

    // add new head to front of array
    snake.unshift(head);

    // check for food collision
    if (head.x === food.x && head.y === food.y) {
        score++;
        // generate new food not on the snake
        do {
            food.x = Math.floor(Math.random() * (canvas.width / scale)) * scale;
            food.y = Math.floor(Math.random() * (canvas.height / scale)) * scale;
        } while (snake.some(seg => seg.x === food.x && seg.y === food.y));
    } else {
        // remove tail segment if no food eaten
        snake.pop();
    }

    // check wall collisions
    if (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height ||
        selfCollision()
    ) {
        alert('Game Over! Your score: ' + score);
        resetGame();
    }
}

// detect collision of head with any body segment
function selfCollision() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return false;
}

// reset to initial state after game over
function resetGame() {
    score = 0;
    snake = [
        { x: scale * 5, y: scale * 5 },
        { x: scale * 4, y: scale * 5 },
        { x: scale * 3, y: scale * 5 }
    ];
    direction = 'right';
    food = {
        x: Math.floor(Math.random() * (canvas.width / scale)) * scale,
        y: Math.floor(Math.random() * (canvas.height / scale)) * scale
    };
}

// handle keyboard input
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' && direction !== 'down') direction = 'up';
    else if (e.key === 'ArrowDown' && direction !== 'up') direction = 'down';
    else if (e.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
    else if (e.key === 'ArrowRight' && direction !== 'left') direction = 'right';
});

// main loop – runs every 100 ms
setInterval(() => {
    draw();
    update();
}, 100);