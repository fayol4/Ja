let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 500;

let player = { x: 180, y: 450, width: 40, height: 40 };
let hearts = [];
let score = 0;

function drawPlayer() {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(player.x + 20, player.y + 20, 20, 0, Math.PI * 2);
    ctx.fill();
}

function drawHearts() {
    hearts.forEach((heart, index) => {
        ctx.fillStyle = "pink";
        ctx.beginPath();
        ctx.arc(heart.x, heart.y, 10, 0, Math.PI * 2);
        ctx.fill();

        heart.y += 2;
        if (heart.y > canvas.height) hearts.splice(index, 1);
    });
}

function checkCollision() {
    hearts.forEach((heart, index) => {
        if (
            heart.y + 10 >= player.y &&
            heart.x >= player.x &&
            heart.x <= player.x + player.width
        ) {
            hearts.splice(index, 1);
            score++;
            document.getElementById("score").innerText = score;
        }
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawHearts();
    checkCollision();
    requestAnimationFrame(gameLoop);
}

setInterval(() => {
    hearts.push({ x: Math.random() * canvas.width, y: 0 });
}, 1000);

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && player.x > 0) {
        player.x -= 20;
    } else if (event.key === "ArrowRight" && player.x < canvas.width - player.width) {
        player.x += 20;
    }
});

gameLoop();
