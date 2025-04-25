function initLayout() {
  alert("Hello User ! \n Welcome to LKS PVZ");
  initHome();
}

let playerData = {
  username: "Saipul",
  level: "easy",
};

function initHome() {
  const btnPlay = document.getElementById("btn-play"),
    btnInstr = document.getElementById("btn-instruction"),
    closeInstr = document.getElementById("close-instr"),
    inputUsername = document.getElementById("input-username"),
    instruction = document.getElementById("instruction"),
    selectLevel = document.getElementById("select-level");

  inputUsername.oninput = () => {
    btnPlay.classList.toggle("disable", inputUsername.value.trim() === "");
  };

  btnInstr.onclick = (e) => {
    instruction.classList.toggle("active");
  };

  closeInstr.onclick = () => {
    instruction.classList.remove("active");
  };

  btnPlay.onclick = (e) => {
    if (inputUsername.value.trim() === "") {
      alert("Player username must be filled !");
      return;
    }

    if (selectLevel.value.trim() === "") {
      alert("Game level must be chosen !");
      return;
    }

    playerData["name"] = inputUsername.value;
    playerData["level"] = selectLevel.value;
    clearActiveScreen("countdown");
    showCountdown(() => {
      clearActiveScreen("gameplay");
      initGameplay();
    });
  };
}

function initGameplay() {
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
      alert("selesai");
    },
  });

  const canvas = document.getElementById("gameCanvas"),
    ctx = canvas.getContext("2d"),
    canvasH = canvas.height,
    canvasW = canvas.width,
    gridX = 80,
    gridY = 0,
    gridW = 670,
    gridH = 450,
    ROWS = 5,
    COLS = 8,
    cellWidth = gridW / COLS,
    cellHeight = gridH / ROWS;
  let grid = [],
    lawnmowers = [],
    zombies = [],
    suns = [],
    plants = [];

  const images = {
      Lawnmower: new Image(),
      Sun: new Image(),
      Bullet: new Image(),
      IceBullet: new Image(),
      SunFlower: [],
      WallNut: [],
      PeaShooter: [],
      IcePea: [],
      Zombie: [],
    },
    peaShooterFrameCount = 31,
    icePeaFrameCount = 32,
    wallNutFrameCount = 33,
    sunFlowerFrameCount = 25,
    zombieFrameCount = 34;

  //   Make Grid & Lawnmower
  for (let row = 0; row < ROWS; row++) {
    grid[row] = [];

    lawnmowers.push({
      x: 0,
      y: gridY + row * cellHeight,
      width: 80,
      height: cellHeight,
      speed: 1,
      active: false,
    });

    for (let col = 0; col < COLS; col++) {
      grid[row][col] = {
        x: gridX + col * cellWidth,
        y: gridY + row * cellHeight,
        width: cellWidth,
        height: cellHeight,
        occupied: false,
      };
    }
  }

  function fetchImages() {
    images.Lawnmower.src = "./media/Sprites/General/lawnmowerIdle.gif";
    images.Sun.src = "./media/Sprites/General/Sun.png";
    images.Bullet.src = "./media/Sprites/General/Pea.png";
    images.IceBullet.src = "./media/Sprites/General/IcePea.png";

    function generateFrame(frameCount, frameDelay, plantName) {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = `./media/Sprites/${plantName}/frame_${i
          .toString()
          .padStart(2, "0")}_delay-${frameDelay}s.gif`;
        images[plantName].push(img);
      }
    }

    generateFrame(sunFlowerFrameCount, 0.06, "SunFlower");
    generateFrame(peaShooterFrameCount, 0.12, "PeaShooter");
    generateFrame(wallNutFrameCount, 0.12, "WallNut");
    generateFrame(icePeaFrameCount, 0.12, "IcePea");
    generateFrame(zombieFrameCount, 0.05, "Zombie");
  }

  function loadAllImages() {
    let promise = [];

    promise.push(new Promise((resolve) => (images.Lawnmower.onload = resolve)));
    promise.push(new Promise((resolve) => (images.Sun.onload = resolve)));
    promise.push(new Promise((resolve) => (images.Bullet.onload = resolve)));
    promise.push(new Promise((resolve) => (images.IceBullet.onload = resolve)));

    images.SunFlower.forEach((img) => {
      promise.push(new Promise((resolve) => (img.onload = resolve)));
    });
    images.WallNut.forEach((img) => {
      promise.push(new Promise((resolve) => (img.onload = resolve)));
    });
    images.PeaShooter.forEach((img) => {
      promise.push(new Promise((resolve) => (img.onload = resolve)));
    });
    images.IcePea.forEach((img) => {
      promise.push(new Promise((resolve) => (img.onload = resolve)));
    });
    images.Zombie.forEach((img) => {
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
      console.log("error" + err);
    });

  const drawObject = {
    drawGrid: () => {
      (ctx.strokeStyle = "green"), (ctx.lineWidth = 3);
      grid.forEach((gr) =>
        gr.forEach((g) => {
          ctx.strokeRect(g.x, g.y, g.width, g.height);
        })
      );
      ctx.stroke();
    },
    drawLawnmowers: () => {
      lawnmowers.forEach((mower) => {
        ctx.drawImage(
          images.Lawnmower,
          mower.x,
          mower.y,
          mower.width,
          mower.height
        );
      });
    },
    drawZombies: () => {
      zombies.forEach((zombie) => {
        ctx.drawImage(
          images.Zombie[zombie.frameIndex],
          zombie.x,
          zombie.y,
          zombie.width,
          zombie.height
        );
      });
    },
    drawPlants: () => {
      plants.forEach((plant) => {
        ctx.drawImage(
          images[plant.plantName][plant.frameIndex],
          plant.x,
          plant.y,
          plant.width,
          plant.height
        );
      });
    },
    drawSuns: () => {
      suns.forEach((sun) => {
        ctx.drawImage(images.Sun, sun.x, sun.y, sun.width, sun.height);
      });
    },
  };

  let lastFrameUpdateTime = Date.now(),
    frameDelay = 100;
  const updateObject = {
    updateLawnmowers: () => {
      lawnmowers.forEach((mower, rowIndex) => {
        if (mower.active) {
          mower.x += mower.speed;

          zombies.forEach((zombie, zIndex) => {
            if (zombie.row === rowIndex) {
              if (mower.x + mower.width > zombie.x) {
                zombies.splice(zIndex, 1);
              }
            }
          });

          if (mower.x > canvasW) {
            mower.active = false;

            lawnmowers.splice(rowIndex, 1);
          }
        }
      });
    },
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

        if (zombie.x < 0) {
          const mower = lawnmowers[zombie.row] || null;
          if (mower === null) {
            timer.stop();
            stopZombieSpawn();
            stopSunSpawn();
            attachDialog("gameover");
            cancelAnimationFrame(animationFrameId);
          }

          if (!mower.active) mower.active = true;
        }
      });
    },
    updatePlants: () => {
      let now = Date.now();

      if (now - lastFrameUpdateTime >= frameDelay) {
        plants.forEach((plant) => {
          plant.frameIndex =
            (plant.frameIndex + 1) % images[plant.plantName].length;
        });

        lastFrameUpdateTime = now;
      }
    },
  };

  let animationFrameId;

  function render() {
    ctx.clearRect(0, 0, canvasW, canvasH);

    drawObject.drawGrid();
    drawObject.drawSuns();
    drawObject.drawPlants();
    drawObject.drawZombies();
    drawObject.drawLawnmowers();

    updateObject.updateZombies();
    updateObject.updateLawnmowers();
    updateObject.updatePlants();

    animationFrameId = requestAnimationFrame(render);
  }

  let zombieSpawnInterval = null,
    sunSpawnInterval = null;

  function spawnZombie() {
    for (let i = 0; i < zombieLevel; i++) {
      const row = Math.floor(Math.random() * ROWS);

      zombies.push({
        x: canvasW,
        y: row * cellHeight,
        row: row,
        width: cellWidth,
        height: cellHeight,
        speed: 0.5,
        frameIndex: 0,
        health: 100,
      });
    }
  }

  function spawnSun() {
    const row = Math.floor(Math.random() * ROWS),
      col = Math.floor(Math.random() * COLS);

    suns.push({
      x: col * cellWidth,
      y: row * cellHeight,
      width: 30,
      height: 30,
    });
  }

  function generateZombie() {
    if (zombieSpawnInterval === null) {
      zombieSpawnInterval = setInterval(spawnZombie, 5000);
    }
  }

  function stopZombieSpawn() {
    clearInterval(zombieSpawnInterval);
    zombieSpawnInterval = null;
  }

  function stopSunSpawn() {
    clearInterval(sunSpawnInterval);
    sunSpawnInterval = null;
  }

  function generateSun() {
    for (let i = 0; i < 2; i++) {
      spawnSun();
    }

    if (sunSpawnInterval === null) {
      sunSpawnInterval = setInterval(spawnSun, 3000);
    }
  }

  generateZombie();
  generateSun();

  let gameState,
    selectedTool = "plant",
    selectedPlant = null,
    almanac = [
      {
        plantName: "SunFlower",
        cost: 50,
      },
      {
        plantName: "WallNut",
        cost: 50,
      },
      {
        plantName: "PeaShooter",
        cost: 100,
      },
      {
        plantName: "IcePea",
        cost: 175,
      },
    ],
    seeds = document.querySelectorAll(".seeds"),
    shovel = document.getElementById("shovel");

  seeds.forEach((seed, index) => {
    seed.onclick = (e) => {
      selectedTool = "plant";
      selectedPlant = almanac[index].plantName;
    };
  });

  shovel.onclick = () => {
    console.log("shovel");
    selectedTool = "shovel";
  };

  canvas.onclick = (e) => {
    const rect = canvas.getBoundingClientRect(),
      mouseX = e.clientX - rect.left,
      mouseY = e.clientY - rect.top,
      isGridClicked =
        mouseX >= gridX &&
        mouseX <= gridX + gridW &&
        mouseY >= gridY &&
        mouseY <= gridY + gridH;

    if (isGridClicked) {
      const col = Math.floor((mouseX - gridX) / cellWidth),
        row = Math.floor((mouseY - gridY) / cellHeight),
        selectedGrid = grid[row][col];

      if (selectedTool === "plant") {
        if (!selectedGrid.occupied) {
          let newPlant = {
            plantName: selectedPlant,
            row: row,
            col: col,
            x: selectedGrid.x,
            y: selectedGrid.y,
            width: selectedGrid.width,
            height: selectedGrid.height,
            frameIndex: 0,
          };

          plants.push(newPlant);
          selectedGrid.occupied = true;
        }
      } else if (selectedTool === "shovel") {
        console.log(selectedGrid);
        if (selectedGrid.occupied) {
          plants = plants.filter(
            (plant) => !(plant.row === row && plant.col === col)
          );
          selectedGrid.occupied = false;
        }
      }
    }
  };

  let gamePaused = false;
  document.onkeydown = (e) => {
    if (e.key === "Escape") {
      gamePaused = !gamePaused;
      if (gamePaused) {
        timer.stop();
        stopZombieSpawn();
        stopSunSpawn();
        attachDialog("pause");
        cancelAnimationFrame(animationFrameId);
      } else {
        timer.resume();
        generateSun();
        generateZombie();
        clearDialog("pause");
        render();
      }
    }
  };

  const btnContinue = document.getElementById("continue"),
    btnRestartPaused = document.getElementsByClassName(".restart")[0],
    btnRestartGameOver = document.getElementsByClassName(".restart")[1];

  btnContinue.onclick = () => {
    timer.resume();
    generateSun();
    generateZombie();
    clearDialog("pause");
    render();
  };

  btnRestartGameOver.onclick = () => {
    
  }

  let leaderboard = [
    {
      username: "Nando Abdillah",
      score: 20,
      time: 50,
    },
    {
      username: "Rifal Ali",
      score: 50,
      time: 70,
    },
    {
      username: "Saipul",
      score: 70,
      time: 100,
    },
  ];

  const leaders = document.getElementById("leaders"),
    sortScore = document.getElementById("sortBy");

  sortScore.onchange = (e) => {
    const sortBy = e.target.value;

    if (sortBy === "score") {
      leaderboard = [
        {
          username: "Saipul",
          score: 70,
        },
        {
          username: "Rifal Ali",
          score: 50,
        },
        {
          username: "Nando Abdillah",
          score: 20,
        },
      ];
    }

    generateLeaderBoard();
  };

  function showPopUpDetail() {
    const btnDetails = document.querySelectorAll(".btn-detail");

    btnDetails.forEach((btn, index) => {
      btn.onclick = () => {
        alert(`
               Player Name : ${leaderboard[index].username}
               Score : ${leaderboard[index].score}
               Time :  ${leaderboard[index].time} 
                
                `);
      };
    });
  }

  function generateLeaderBoard() {
    leaders.innerHTML = "";
    for (let i = 0; i < leaderboard.length; i++) {
      const detailElement = document.createElement("div");
      detailElement.className = "detail";
      detailElement.innerHTML = `
                  <div class=info">
                    <h4>${leaderboard[i].username}</h4>
                    <p>Score : ${leaderboard[i].score}</p>
                  </div>
    
                  <button class="btn-detail">Detail</button>
                  
                  
                  `;

      leaders.appendChild(detailElement);
    }
  }

  generateLeaderBoard();
  showPopUpDetail();
}

function attachDialog(dialogId) {
  const dialog = document.getElementById(dialogId);
  dialog.classList.add("active");
}

function clearDialog(dialogId) {
  const dialog = document.getElementById(dialogId);
  dialog.classList.remove("active");
}

function gameTimer(options = {}) {
  let elapsedTime = 0,
    MAX_TIME = options.MAX_TIME,
    ELEMENT = options.ELEMENT,
    timerInterval = null;

  function updateDisplay() {
    const second = Math.floor(elapsedTime / 100),
      centisecond = elapsedTime % 100;

    ELEMENT.textContent =
      second.toString().padStart(2, "0") +
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
    element = document.getElementById("count");

  element.textContent = count;

  countdownInterval = setInterval(() => {
    count--;

    if (count <= 0) {
      count = 3;
      clearInterval(countdownInterval);
      countdownInterval = null;
      callback();
    }

    element.textContent = count;
  }, 1000);
}

function clearActiveScreen(screenId, clearAll = true) {
  if (clearAll) {
    const screens = document.querySelectorAll(".screen.active");
    screens.forEach((screen) => screen.classList.remove("active"));
  }

  const screen = document.getElementById(screenId);
  screen.classList.add("active");
}

initLayout();
