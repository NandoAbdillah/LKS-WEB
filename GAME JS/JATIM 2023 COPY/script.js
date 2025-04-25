function initLayout() {
  // homeInit();
  // clearActiveScreen("countdown");

  // showCountdown(() => {
  //   clearActiveScreen("gameplay");
  //   gameplayInit();
  // });

  clearActiveScreen("gameplay");
  gameplayInit();
}

let playerData = {
    username: "Sumanto",
    level: "hard",
  },
  gameState;

function homeInit() {
  const btnInstr = document.getElementById("btn-play"),
    btnPlay = document.getElementById("btn-play"),
    instruction = document.getElementById("instruction"),
    btnCloseInstr = document.getElementsByClassName("close-instr")[0],
    inputUsername = document.getElementById("username");

  let username = "";

  btnInstr.onclick = () => {
    instruction.classList.toggle("active");
  };
  btnCloseInstr.onclick = () => {
    instruction.classList.remove("active");
  };

  inputUsername.oninput = (e) => {
    username = e.target.value;
    btnPlay.classList.toggle("disable", username.trim() === "");
  };

  btnPlay.onclick = () => {
    let choosenLevel = document.getElementById("level").value;

    if (username === "") {
      alert("Username must be filled");
      return;
    }

    if (choosenLevel === "") {
      alert("Must be choose one level !");
      return;
    }

    playerData["username"] = username;
    playerData["level"] = choosenLevel;

    clearActiveScreen("countdown");
    showCountdown(() => {
      clearActiveScreen("gameplay");
      gameplayInit();
    });
  };
}

function gameplayInit() {
  const playerName = document.getElementById("player-name"),
    playerScore = document.getElementById("player-score"),
    playerTime = document.getElementById("player-time"),
    zombieLevel =
      playerData["level"] === "easy"
        ? 1
        : playerData["level"] === "medium"
        ? 2
        : 3;
  playerName.textContent = playerData["username"];

  const timer = gameTimer({
    MAX_TIME: 10000,
    ELEMENT: playerTime,
    onCompleted: () => {
      clearActiveScreen("countdown");
    },
  });

  const canvas = document.getElementById("gameCanvas"),
    ctx = canvas.getContext("2d"),
    canvasW = canvas.width,
    canvasH = canvas.height,
    gridX = 80,
    gridY = 0,
    gridWidth = 670,
    gridHeight = 450,
    ROWS = 5,
    COLS = 8,
    cellWidth = gridWidth / COLS,
    cellHeight = gridHeight / ROWS;

  let grid = [],
    plants = [],
    zombies = [],
    bullets = [],
    lawnmowers = [],
    suns = [];

  ctx.clearRect(0, 0, canvasW, canvasH);

  for (let row = 0; row < ROWS; row++) {
    lawnmowers.push({
      x: 0,
      y: row * cellHeight,
      width: 80,
      height: cellHeight,
      active: false,
      speed: 1,
    });
  }

  for (let row = 0; row < ROWS; row++) {
    grid[row] = [];

    for (let col = 0; col < COLS; col++) {
      grid[row][col] = {
        x: gridX + col * cellWidth,
        y: gridY + row * cellHeight,
        width: cellWidth,
        height: cellHeight,
        occupied: false,
      };

      const cell = grid[row][col];
    }
  }

  const images = {
      Lawnmowers: new Image(),
      SunFlower: [],
      Sun: new Image(),
      WallNut: [],
      PeaShooter: [],
      IcePea: [],
      Bullet: new Image(),
      IceBullet: new Image(),
      Zombie: [],
    },
    peaShooterFrameCount = 31,
    icePeaFrameCount = 32,
    wallNutFrameCount = 33,
    sunFlowerFrameCount = 25,
    zombieFrameCount = 34;

  function fetchImages() {
    images.Lawnmowers.src = "./media/Sprites/General/lawnmowerIdle.gif";
    images.Sun.src = "./media/Sprites/General/Sun.png";
    images.Bullet.src = "./media/Sprites/General/Pea.png";
    images.IceBullet.src = "./media/Sprites/General/IcePea.png";

    function generateFrame(frameCount, frameDelay, plantName) {
      for (let i = 0; i < frameCount; i++) {
        let frameNumber = i.toString().padStart(2, "0");

        const img = new Image();
        img.src = `./media/Sprites/${plantName}/frame_${frameNumber}_delay-${frameDelay}s.gif`;
        images[plantName].push(img);
      }
    }

    generateFrame(sunFlowerFrameCount, 0.06, "SunFlower");
    generateFrame(wallNutFrameCount, 0.12, "WallNut");
    generateFrame(peaShooterFrameCount, 0.12, "PeaShooter");
    generateFrame(icePeaFrameCount, 0.12, "IcePea");
    generateFrame(zombieFrameCount, 0.05, "Zombie");
  }

  function loadAllImages() {
    let promise = [];

    promise.push(
      new Promise((resolve) => (images.Lawnmowers.onload = resolve))
    );

    promise.push(new Promise((resolve) => (images.Sun.onload = resolve)));

    promise.push(new Promise((resolve) => (images.Bullet.onload = resolve)));

    promise.push(new Promise((resolve) => (images.IceBullet.onload = resolve)));

    images.PeaShooter.forEach((img) => {
      promise.push(new Promise((resolve) => (img.onload = resolve)));
    });

    images.IcePea.forEach((img) => {
      promise.push(new Promise((resolve) => (img.onload = resolve)));
    });

    images.WallNut.forEach((img) => {
      promise.push(new Promise((resolve) => (img.onload = resolve)));
    });

    images.Zombie.forEach((img) => {
      promise.push(new Promise((resolve) => (img.onload = resolve)));
    });

    images.SunFlower.forEach((img) => {
      promise.push(new Promise((resolve) => (img.onload = resolve)));
    });

    return Promise.all(promise);
  }

  fetchImages();
  loadAllImages()
    .then(() => {
      render();
    })
    .catch((err) => {
      console.log("Error loading images" + err);
    });

  const drawObject = {
    drawGrid: () => {
      ctx.strokeStyle = "green";
      ctx.lineWidth = 1;

      grid.forEach((gr) =>
        gr.forEach((g) => {
          ctx.strokeRect(g.x, g.y, g.width, g.height);
          ctx.stroke();
        })
      );
    },
    drawLawnmower: () => {
      lawnmowers.forEach((mower) => {
        ctx.drawImage(
          images.Lawnmowers,
          mower.x,
          mower.y,
          mower.width,
          mower.height
        );
      });
    },
    drawZombies: () => {
      zombies.forEach((zombie) => {
        // console.log(images.Zombie[zombie.frameIndex])
        ctx.drawImage(
          images.Zombie[zombie.frameIndex],
          zombie.x,
          zombie.y,
          cellWidth,
          cellHeight
        );
      });
    },
    drawSuns: () => {
      suns.forEach((sun) => {
        ctx.drawImage(images.Sun, sun.x, sun.y, sun.width, sun.height);
      });
    },
  };

  const updateObject = {
    updateZombies: () => {
      const now = Date.now();
      zombies.forEach((zombie, index) => {
        zombie.x -= zombie.speed;
        if (zombie.frameDelay === undefined) {
          zombie.frameDelay = 100;
          zombie.lastFrameUpdate = now;
        }

        if (now - zombie.lastFrameUpdate > zombie.frameDelay) {
          zombie.frameIndex = (zombie.frameIndex + 1) % images.Zombie.length;
          zombie.lastFrameUpdate = now;
        }

        if (zombie.x <= 0) {
          let mower = lawnmowers[zombie.row];
          if (!mower.active) mower.active = true;
          zombies.splice(index, 1);
        }

        // if(zombie.x < - 10) {
        //   zombies.splice(index, 1);
        // }
      });
    },
    updateLawnmowers: () => {
      lawnmowers.forEach((lawnmower, rowIndex) => {
        if (lawnmower.active) {
          lawnmower.x += lawnmower.speed;

          zombies.forEach((zombie, zIndex) => {
            if (zombie.row === rowIndex) {
              if (zombie.x < lawnmower.x + lawnmower.width) {
                zombies.splice(zIndex, 1);
              }
            }
          });

          if (lawnmower.x > canvasW + lawnmower.width) {
            lawnmower.active = false;
            lawnmowers.splice(rowIndex, 1);
          }
        }
      });
    },
    updateSunProduce: () => {},
  };

  function spawnZombie() {
    for (let i = 0; i < zombieLevel; i++) {
      const row = Math.floor(Math.random() * ROWS),
        zombie = {
          x: canvasW,
          y: row * cellHeight,
          row: row,
          speed: 0.08,
          frameIndex: 0,
          health: 100,
        };

      zombies.push(zombie);
    }

    console.log(zombies);
  }

  // Game Functional
  let selectedTool = "plant",
    selectedPlant,
    userSun = 50;

  const almanac = [
      {
        plantType: "SunFlower",
        cost: 50,
      },
      {
        plantType: "WallNut",
        cost: 50,
      },
      {
        plantType: "PeaShooter",
        cost: 100,
      },
      {
        plantType: "IcePea",
        cost: 1,
      },
    ],
    seeds = document.querySelectorAll(".seeds"),
    shovel = document.getElementById("shovel");

  seeds.forEach((seed, index) => {
    seed.onclick = () => {
      selectedPlant = almanac[index];
    };
  });

  canvas.onclick = (e) => {
    const rect = canvas.getBoundingClientRect(),
      mouseX = e.clientX - rect.left,
      mouseY = e.clientY - rect.top,
      isGridClicked =
        mouseX >= gridX &&
        mouseX < gridX + gridWidth &&
        mouseY >= gridY &&
        mouseY < gridY + gridHeight;

       suns.forEach
  };

  let animationFrameId;

  function render() {
    ctx.clearRect(0, 0, canvasW, canvasH);

    drawObject.drawGrid();
    drawObject.drawLawnmower();
    drawObject.drawZombies();
    drawObject.drawSuns();

    updateObject.updateLawnmowers();
    updateObject.updateZombies();

    animationFrameId = requestAnimationFrame(render);
  }

  let zombieSpawnIntervalId, gamePaused;

  function startZombieSpawn() {
    zombieSpawnIntervalId = setInterval(spawnZombie, 5000);
  }

  let sunSpawnIntervalId;

  function spawnSuns() {
    for (let i = 0; i < 3; i++) {
      const row = Math.floor(Math.random() * ROWS),
        col = Math.floor(Math.random() * COLS);

      suns.push({
        x: grid[row][col].x + 10,
        y: grid[row][col].y,
        width: 50,
        height: 50,
      });
    }
  }
  function startSunSpawn() {
    sunSpawnIntervalId = setInterval(spawnSuns, 3000);
  }

  function stopZombieSpawn() {
    if (zombieSpawnIntervalId) {
      clearInterval(zombieSpawnIntervalId);
      zombieSpawnIntervalId = null;
    }
  }

  startSunSpawn();
  startZombieSpawn();
}

function gameTimer(options = {}) {
  let elapsedTime = 0,
    MAX_TIME = options.MAX_TIME,
    timerInterval = null,
    element = options.ELEMENT;

  element.textContent = "00:00";

  function updateDisplay() {
    const second = Math.floor(elapsedTime / 100),
      centisecond = elapsedTime % 100;

    element.textContent =
      second.toString().padStart(3, "0") +
      ":" +
      centisecond.toString().padStart(2, "0");
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      elapsedTime++;

      if (elapsedTime >= MAX_TIME) {
        clearInterval(timerInterval);
        timerInterval = null;
        options.onCompleted();
      }

      updateDisplay();
    }, 10);
  }

  startTimer();

  return {
    substract: (seconds) => {
      elapsedTime -= seconds * 1000;
      if (elapsedTime <= 0) {
        elapsedTime = 0;
      }
    },
    stop: () => {
      clearInterval(timerInterval);
      timerInterval = null;
    },
    resume: () => {
      if (timerInterval === null) startTimer();
    },
    reset: () => {
      clearInterval(timerInterval);
      timerInterval = null;

      elapsedTime = 0;
    },
  };
}

function showCountdown(callback) {
  let count = 3,
    countdownInterval = null,
    countdown = document.getElementById("count");

  countdown.textContent = count;

  countdownInterval = setInterval(() => {
    count--;

    if (count <= 0) {
      clearInterval(countdownInterval);
      countdownInterval = null;
      count = 3;
      callback();
    }

    countdown.textContent = count;
  }, 1000);
}

function clearActiveScreen(screenId, clearAll = true) {
  if (clearAll) {
    const screens = document.querySelectorAll(".active");
    screens.forEach((screen) => screen.classList.remove("active"));
  }

  const screen = document.getElementById(screenId);
  screen.classList.add("active");
}

initLayout();
