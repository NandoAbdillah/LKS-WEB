document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("myCanvas");
  const context = canvas.getContext("2d");

  const canvasWidth = canvas.offsetWidth;
  const canvasHeight = canvas.offsetHeight;

  const ballRad = 20;
  let koorX = ballRad * -1;

  function drawCanvas() {
    context.fillStyle = "#008000";
    context.fillRect(0, 0, canvasWidth, canvasHeight);
  }

  function drawBall() {
    context.beginPath();
    context.fillStyle = "#FFFFFF";
    context.arc(koorX, canvasHeight / 2, ballRad, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
  }

  function animate() {
    drawCanvas();
    drawBall();

    koorX += 5;
    if(koorX > canvasWidth + ballRad) {
        koorX = ballRad * -1;
    }

    requestAnimationFrame(animate);
  }

  animate();
});
