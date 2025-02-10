document.addEventListener("DOMContentLoaded", () => {
  // Board
  let board;
  // Karena pixel background
  let boardWidth = 360;
  let boardHeight = 640;
  let context;

  // Variabel untuk burung

  // 408/288 px adalah ukuran pixel gambar sebenarnya
  //Maka Rasio lebar dan tinggi burung adalah 17/12
  // Kita menggunkan variabel ini

  let birdWidth = 34;
  let birdHeight = 24;

  let birdX = boardWidth / 8;
  let birdY = boardHeight / 2;

  let birdImg;

  let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight,
  };

  // Menambahkan audio dalam game flappybird
  let wingSound = new Audio("./sfx_wing.wav");
  let hitSound = new Audio("./sfx_hit.wav");
  let bgm = new Audio("./bgm_mario.mp3");
  bgm.loop = true;

  // pipa 384/3072 adalah pixel gambar pipa sebenarnya
  // Rasio lebar dan tinggi pipa adala 1/8

  let pipeArray = [];
  let pipeWidth = 64;
  let pipeHeight = 512;
  // Penjelasan lihat screenshootan
  let pipeX = boardWidth;
  let pipeY = 0;

  let topPipeImg;
  let bottomPipeImg;

  // Fisikia Game
  // Yang kita gerakan adalah pipanya bukan flappybirdnya
  // Pipa digerakkan ke kiri , sehingga posisi x nya selalu dikurangi saat interval

  let velocityX = -2; // Pipa bergerak ke kiri dengan kecepatan 2 pixel per frame

  let velocityY = 0; // kecepatan burung melompat (ini akan dikurangi sehngga negatif)

  let gravity = 0.4; //ini akan ditambah sehingga positif

  let gameOver = false;
  let score = 0;

  window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d");

    //   context.fillStyle = "green";
    // context.fillRect(bird.x, bird.y, bird.width,birdHeight);

    //Load imgaes

    // Gambar burung
    birdImg = new Image();
    birdImg.src = "./flappybird.png";
    //   Agar gambar terload dengan baik
    birdImg.onload = function () {
      context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    };

    topPipeImg = new Image();
    topPipeImg.src = "./toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./bottompipe.png";

    //Untuk membuat game di loop
    requestAnimationFrame(update);

    setInterval(placePipes, 1500);
    //   Setiap 1,5 seconds

    document.addEventListener("keydown", moveBird);

    bgm.play();
  };


  function update() {
    // Ini juga harus disertakann lagi
    requestAnimationFrame(update);
    if (gameOver) {
      return;
    }

    context.clearRect(0, 0, board.width, board.height);

    // Bird
    // Menambahkan gravity
    velocityY += gravity;
    // Bergerak ke atas
    // bird.y += velocityY;
    bird.y = Math.max(bird.y + velocityY, 0);
    // membatasi gravity ke 0 atau atas canvaas

    if (bird.y > board.height) {
      gameOver = true;
    }
 
      context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    

    // Pipes

    for (let i = 0; i < pipeArray.length; i++) {
      let pipe = pipeArray[i];
      // Mengurangi pipex terus hingga ke kiri
      pipe.x += velocityX;
      context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

      if (!pipe.passed && bird.x > pipe.x + pipe.width) {
        score += 0.5; //Kareana ada 2 pipa
        pipe.passed = true;
      }

      // Ketika tertabrak
      if (detectCollision(bird, pipe)) {  
        hitSound.play();
        gameOver = true;
      }
    }

    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
      pipeArray.shift();
    }

    context.fillStyle = "white";
    context.font = "45px sans-serif";
    context.fillText(score, 5, 45);

    if (gameOver) {
      context.fillText("GAME OVER", 5, 90);
      bgm.pause();
      bgm.currentTime = 0;
    }
  }

  function placePipes() {
    // Membuat mulai pipa atas negatif atau keluar atas canvas

    if (gameOver) {
      return;
    }
    let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
    // pipeY - pipeHeight/4 artinya kita mengurangi garis atas pipa dikurangi 1/4 (yang terportong ke atas) tinggi aslinya maka tinggi pipa sat ini 3/4 (yang terlihat), tinggi pipa 512/4 = 128 maka -128 adlah koordinat y mulai pipa atas
    // Math Radom hanya mengeluarkan angka 0,1
    //  pipeHeight/2 adalah 512/2 = 256 , jadi kita hanya akan merandom angka 0-256, jika hasil random = 0 maka random PipeY = -128, jika hasil random = 256 maka randomPipeY =-

    // kata orangnya di youtube randomnya -1/4 sampai -3/4 dari tinggi pipa

    // Untuk gap antara pipa atas dan bawah
    let openingSpace = board.height / 4;

    let topPipe = {
      img: topPipeImg,
      x: pipeX,
      y: randomPipeY,
      width: pipeWidth,
      height: pipeHeight,
      passed: false,
    };

    let bottomPipe = {
      img: bottomPipeImg,
      x: pipeX,
      // Lihat gambar untuk penjelasan
      y: randomPipeY + pipeHeight + openingSpace,
      height: pipeHeight,
      width: pipeWidth,
      passed: false,
    };

    pipeArray.push(topPipe);
    pipeArray.push(bottomPipe);
  }

  function moveBird(e) {

    if(bgm.paused) {
      bgm.play();
    }
    // Untuk melompat
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyW") {
      wingSound.play();

      velocityY = -6;

      if (gameOver) {
        bird.y = birdY;
        pipeArray = [];
        score = 0;
        gameOver = false;
      }
    }
  }

  function detectCollision(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }
});
