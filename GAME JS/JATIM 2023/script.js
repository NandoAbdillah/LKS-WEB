function initLayout() {
  homeInit();
}

let playerData = {};
function homeInit() {
  const btnInstr = document.getElementById("btn-instruction"),
    btnPlay = document.getElementById("btn-play"),
    instruction = document.querySelector(".instruction"),
    btnClose = document.querySelector(".close-instr"),
    inputUsername = document.getElementById("input-username");

  let username = "";

  btnInstr.onclick = () => {
    instruction.classList.toggle("active");
  };
  btnClose.onclick = () => {
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
      alert("Must be choose one level!");
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
    level = playerData["level"],
    levelZombie = level === "easy" ? 1 : level === "medium" ? 2 : 3;

  playerName.textContent = playerData["username"];
  const timer = gameTimer({
    MAX_TIME: 100000,
    element: playerTime,
    onCompleted: () => {
      gameState = "gameover";
    },
  });

  const canvas = document.getElementById("gameplay-canvas"),
    canvasW = canvas.width,
    canvasH = canvas.height,
    ctx = canvas.getContext("2d"),
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
      x: 0, // titik awal di sisi kiri
      y: row * cellHeight, // sejajar baris
      width: 80, // misalnya lebar 80 px, bisa disesuaikan
      height: cellHeight, // tinggi disamakan dengan baris
      active: false, // status mower (idle/aktif)
      speed: 1, // kecepatan gerak jika aktif
    });
  }

  // console.log(grid);

  const images = {
      Lawnmowers: new Image(),
      SunFlower: [],
      Sun: new Image(),
      WallNut: [],
      PeaShooter: [],
      Bullet: new Image(),
      IceBullet: new Image(),
      IcePea: [],
      Zombie: [],
    },
    peaShooterFrameCount = 31,
    icePeaFrameCount = 32,
    wallNutFrameCount = 33,
    sunFlowerFrameCount = 25,
    zombieFrameCount = 34;
  function fetchImages() {
    images.Lawnmowers.src = "./media/Sprites/General/lawnmowerIdle.gif";
    images.Bullet.src = "./media/Sprites/General/Pea.png";
    images.IceBullet.src = "./media/Sprites/General/IcePea.png";
    images.Sun.src = "./media/Sprites/General/Sun.png";

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

    images.PeaShooter.forEach((img) =>
      promise.push(new Promise((resolve) => (img.onload = resolve)))
    );
    images.IcePea.forEach((img) =>
      promise.push(new Promise((resolve) => (img.onload = resolve)))
    );
    images.SunFlower.forEach((img) =>
      promise.push(new Promise((resolve) => (img.onload = resolve)))
    );
    images.WallNut.forEach((img) =>
      promise.push(new Promise((resolve) => (img.onload = resolve)))
    );
    images.Zombie.forEach((img) =>
      promise.push(new Promise((resolve) => (img.onload = resolve)))
    );

    return Promise.all(promise);
  }

  fetchImages();
  loadAllImages()
    .then(() => {
      render();
    })
    .catch((error) => {
      console.error("Error loading images:", error);
    });

  const drawObject = {
    drawGrid: () => {
      ctx.strokeStyle = "green";
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
          ctx.strokeRect(cell.x, cell.y, cell.width, cell.height);
        }
      }
    },
    drawLawnmowers: () => {
      lawnmowers.forEach((mower) =>
        ctx.drawImage(
          images.Lawnmowers,
          mower.x,
          mower.y,
          mower.width,
          mower.height
        )
      );
    },
    drawPlants: () => {
      plants.forEach((plant) => {
        const plantType = plant.type,
          img = images[plantType][plant.frameIndex % images[plantType].length];
        if (img) {
          ctx.drawImage(img, plant.x, plant.y, cellWidth, cellHeight);
        }
      });
    },
    drawZombies: () => {
      zombies.forEach((zombie) =>
        ctx.drawImage(
          images.Zombie[zombie.frameIndex],
          zombie.x,
          zombie.y,
          cellWidth,
          cellHeight
        )
      );
    },
    drawBullets: () => {
      bullets.forEach((bullet) => {
        let img = bullet.type === "IcePea" ? images.IceBullet : images.Bullet;
        ctx.drawImage(img, bullet.x, bullet.y, bullet.width, bullet.height);
      });
    },

    drawSuns: () => {
      suns.forEach((sun) => {
        ctx.drawImage(images.Sun, sun.x, sun.y, sun.width, sun.height);
      });
    },
  };

  const frameDelay = 100; // Delay dalam milidetik, misalnya 100 ms per frame
  let lastFrameUpdateTime = Date.now();
  const updateObject = {
    updateLawnmowers: () => {
      lawnmowers.forEach((mower, rowIndex) => {
        if (mower.active) {
          mower.x += mower.speed;

          zombies.forEach((zombie, zIndex) => {
            if (zombie.row === rowIndex) {
              if (zombie.x < mower.x + mower.width) {
                zombies.splice(zIndex, 1);
              }
            }
          });

          if (mower.x > canvas.width) {
            mower.active = false;
            mower.x = 0;
          }
        }
      });
    },
    updatePlants: () => {
      let now = Date.now();
      if (now - lastFrameUpdateTime >= frameDelay) {
        plants.forEach((plant) => {
          plant.frameIndex = (plant.frameIndex + 1) % images[plant.type].length;
        });

        lastFrameUpdateTime = now;
      }
    },
    updatePlantsShooting: () => {
      const now = Date.now();
      plants.forEach((plant) => {
        if (plant.type === "PeaShooter" || plant.type === "IcePea") {
          const zombieLane = zombies.some((zombie) => zombie.row === plant.row);
          if (!zombieLane) return;

          const shootDelay = 1500;
          if (!plant.lastShotTime) plant.lastShotTime = now;

          if (now - plant.lastShotTime >= shootDelay) {
            const bulletOffsetX = cellWidth,
              bulletOffsetY = cellHeight / 2,
              bullet = {
                x: plant.x + bulletOffsetX,
                y: plant.y + bulletOffsetY - 25,
                speed: 1,
                type: plant.type,
                width: 25,
                height: 25,
              };

            bullets.push(bullet);
            plant.lastShotTime = now;
          }
        }
      });
    },
    updateBullets: () => {
      for (let i = bullets.length - 1; i >= 0; i--) {
        let bullet = bullets[i];
        bullet.x += bullet.speed;

        if (bullet.x > canvasW) {
          bullets.splice(i, 1);
          continue;
        }

        for (let j = zombies.length - 1; j >= 0; j--) {
          let zombie = zombies[j];
          if (
            bullet.x < zombie.x + cellWidth &&
            bullet.x + bullet.width > zombie.x &&
            bullet.y < zombie.y + cellHeight &&
            bullet.y + bullet.height > zombie.y
          ) {
            if (bullet.type === "IcePea") {
              zombie.hitCount = (zombie.hitCount || 0) + 1;
              zombie.speed = zombie.speed / 1.2;
              if (zombie.hitCount >= 7) {
                zombies.splice(j, 1);
              }
            } else if (bullet.type === "PeaShooter") {
              zombie.hitCount = (zombie.hitCount || 0) + 1;
              if (zombie.hitCount >= 5) {
                zombies.splice(j, 1);
              }
            }
            bullets.splice(i, 1);
            break;
          }
        }
      }
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

        if (zombie.x <= 0) {
          let mower = lawnmowers[zombie.row];
          if (!mower.active) mower.active = true;
        }

        if (zombie.x < -50) {
          zombie.splice(index, 1);
        }
      });
    },
    updateZombiePlantCollision: () => {
      const now = Date.now();
      zombies.forEach((zombie) => {
        const plantsInLane = plants.filter((p) => p.row === zombie.row);
        if (plantsInLane.length > 0) {
          const targetPlant = plantsInLane.reduce((prev, curr) =>
            prev.x > curr.x ? prev : curr
          );

          if (zombie.x < targetPlant.x + cellWidth) {
            zombie.speed = 0;
            if (!zombie.lastBiteTime) {
              zombie.lastBiteTime = now;
            }

            const biteDelay = 1000;
            if (now - zombie.lastBiteTime >= biteDelay) {
              targetPlant.biteCount = (targetPlant.biteCount || 0) + 1;
              zombie.lastBiteTime = now;
            }

            const maxBite = targetPlant.type === "WallNut" ? 5 : 3;
            if (targetPlant.biteCount >= maxBite) {
              plants = plants.filter((p) => p !== targetPlant);
              grid[targetPlant.row][targetPlant.col].occupied = false;

              zombie.speed = zombie.defaultSpeed;
              delete zombie.lastBiteTime;
            }
          }
        } else {
          zombie.speed = zombie.defaultSpeed;
        }
      });
    },
    updateSuns: () => {
      const now = Date.now(),
        sunLifeTime = 7000;

      for (let i = suns.length - 1; i >= 0; i--) {
        let sun = suns[i];
        if (now - sun.createdTime >= sunLifeTime) {
          if (sun.sourcePlant) sun.sourcePlant.hasSun = false;
          suns.splice(i, 1);
        }
      }
    },
    updateSunProduction: () => {
      const now = Date.now();
      plants.forEach((plant) => {
        if (plant.type === "SunFlower") {
          const productionDelay = 3000;

          if (!plant.lastSunSpawnTime) plant.lastSunSpawnTime = now;

          if (now - plant.lastSunSpawnTime >= productionDelay) {
            const sunExists = suns.some((sun) => sun.sourcePlant === plant);
            if (!sunExists) {
              const sun = {
                x: plant.x + cellWidth / 2 - 15,
                y: plant.y + cellHeight / 2 - 15,
                width: 30,
                height: 30,
                createdTime: now,
                sourcePlant: plant,
              };

              suns.push(sun);
              plant.hasSun = true;
            }

            plant.lastSunSpawnTime = now;
          }
        }
      });
    },
    updateSunAmount: () => {
      document.querySelector(".sun-amount").textContent = userSun;
    },
  };

  function spawnZombie() {
    for (let i = 0; i <= levelZombie; i++) {
      const row = Math.floor(Math.random() * ROWS),
        zombie = {
          x: canvasW,
          y: row * cellHeight,
          row: row,
          speed: 0.05,
          defaultSpeed: 0.05,
          frameIndex: 0,
          health: 100,
        };

      zombies.push(zombie);
    }
  }

  // Game functional
  let gameState,
    selectedTool = "plant",
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
        cost: 175,
      },
    ],
    seeds = document.querySelectorAll(".seeds"),
    shovel = document.getElementById("shovel");
  seeds.forEach((seed, index) => {
    seed.onclick = () => {
      clearUserSelect();
      selectedTool = "plant";
      selectedPlant = almanac[index];
      seed.classList.add("selected");
    };
  });

  shovel.onclick = () => {
    clearUserSelect();
    selectedTool = "shovel";
    shovel.classList.add("selected");
  };

  function clearUserSelect() {
    document
      .querySelectorAll(".selected")
      .forEach((select) => select.classList.remove("selected"));
  }

  canvas.onclick = (e) => {
    const rect = canvas.getBoundingClientRect(),
      mouseX = e.clientX - rect.left,
      mouseY = e.clientY - rect.top,
      isGridClicked =
        mouseX >= gridX &&
        mouseX < gridX + gridWidth &&
        mouseY >= gridY &&
        mouseY < gridY + gridHeight;

    for (let i = suns.length - 1; i >= 0; i--) {
      let sun = suns[i];
      if (
        mouseX >= sun.x &&
        mouseX < sun.x + sun.width &&
        mouseY >= sun.y &&
        mouseY < sun.y + sun.height
      ) {
        userSun += 50;
        if (sun.sourcePlant) {
          sun.sourcePlant.hasSun = false;
        }

        suns.splice(i, 1);
        return;
      }
    }

    if (isGridClicked) {
      const col = Math.floor((mouseX - gridX) / cellWidth),
        row = Math.floor((mouseY - gridY) / cellHeight),
        selectedGrid = grid[row][col];

      if (selectedTool === "plant") {
        if (!selectedGrid.occupied) {
          if (userSun >= selectedPlant.cost) {
            let newPlant = {
              type: selectedPlant.plantType,
              row: row,
              col: col,
              x: selectedGrid.x,
              y: selectedGrid.y,
              frameIndex: 0,
            };
            plants.push(newPlant);
            selectedGrid.occupied = true; // Tandai grid sebagai sudah ditempati
            userSun -= selectedPlant.cost;
          }
        } else {
          console.log("Sel ini sudah ditempati!");
        }
      } else if (selectedTool === "shovel") {
        if (selectedGrid.occupied) {
          plants = plants.filter(
            (plant) => !(plant.row === row && plant.col === col)
          );
          selectedGrid.occupied = false;
        }
      }
    }
  };

  let animationFrameId;
  drawObject.drawGrid();

  function render() {
    ctx.clearRect(0, 0, canvasW, canvasH);

    drawObject.drawLawnmowers();
    drawObject.drawPlants();
    drawObject.drawZombies();
    drawObject.drawSuns();
    drawObject.drawBullets();

    updateObject.updateLawnmowers();
    updateObject.updatePlants();
    updateObject.updatePlantsShooting();
    updateObject.updateSuns();
    updateObject.updateSunProduction();
    updateObject.updateSunAmount();
    updateObject.updateBullets();
    updateObject.updateZombies();
    updateObject.updateZombiePlantCollision();

    animationFrameId = requestAnimationFrame(render);
  }

  let zombieSpawnIntervalId, gamePaused;

  function startZombieSpawn() {
    zombieSpawnIntervalId = setInterval(spawnZombie, 5000);
  }

  function stopZombieSpawn() {
    if (zombieSpawnIntervalId) {
      clearInterval(zombieSpawnIntervalId);
      zombieSpawnIntervalId = null;
    }
  }

  startZombieSpawn();

  document.onkeydown = (e) => {
    if (e.key === "Escape") {
      gamePaused = !gamePaused;
      if (gamePaused) {
        timer.stop();
        stopZombieSpawn();
        attachDialog("pause");
        cancelAnimationFrame(animationFrameId);
      } else {
        timer.resume();
        attachDialog("pause", true);
        startZombieSpawn();
        render();
      }
    }
  };

  document.getElementById("continue").onclick = () => {
    timer.resume();
    attachDialog("pause", true);
    startZombieSpawn();
    render();
  };

  document.querySelectorAll('.restart').forEach(restart => restart.onclick = restartGame)

  function restartGame() {
    gamePaused = false;
    plants = [];
    zombies = [];
    bullets = [];
    suns = [];

    for(let row= 0; row < ROWS; row++) {
      for(let col=0; col < COLS; col++) {
        grid[row][col].occupied = false;
      }
    }

    userSun = 50;

    cancelAnimationFrame(animationFrameId);
    stopZombieSpawn();
    timer.reset();

    attachDialog("pause", true);
    clearActiveScreen('countdown');
    showCountdown(()=> {
      clearActiveScreen('gameplay');
      startZombieSpawn();
      timer.resume();
      render();
    })


  }
}

function gameTimer(options = {}) {
  let elapsedTime = options.MAX_TIME,
    element = options.element,
    timerInterval = null;

  function updateDisplay() {
    const second = Math.ceil(elapsedTime / 100),
      centisecond = elapsedTime % 100;

    element.textContent =
      second.toString().padStart(3, "0") +
      ":" +
      centisecond.toString().padStart(2, "0");
  }

  function startInterval() {
    timerInterval = setInterval(() => {
      elapsedTime--;

      if (elapsedTime <= 0) {
        elapsedTime = 0;
        clearInterval(timerInterval);
        options.onCompleted();
      }

      updateDisplay();
    }, 10);
  }

  startInterval();

  return {
    substract: (seconds) => {
      elapsedTime -= seconds * 100;
      if (elapsedTime < 0) elapsedTime = 0;
      updateDisplay();
    },
    stop: () => {
      clearInterval(timerInterval);
      timerInterval = null;
    },
    resume: () => {
      if (timerInterval === null) startInterval();
    },
    reset: () => {
      elapsedTime = options.MAX_TIME;
      clearInterval(timerInterval);
      timerInterval = null;
    },
  };
}

function showCountdown(callback) {
  let count = 3;
  const countdown = document.getElementById("count");
  countdown.textContent = count;

  const countdownInterval = setInterval(() => {
    count--;

    if (count === 0) {
      countdown.textContent = count;
      clearInterval(countdownInterval);
      callback();
    } else {
      countdown.textContent = count;
    }
  }, 1000);
}

function clearActiveScreen(screenId, clearAll = true) {
  if (clearAll) {
    const screens = document.querySelectorAll(".screen");
    screens.forEach((screen) => screen.classList.remove("active"));
  }
  const screen = document.getElementById(screenId);
  screen.classList.add("active");
}

function attachDialog(popId, clearPops = false) {
  const pop = document.getElementById(popId);

  if (clearPops) {
    pop.classList.remove("active");
    return;
  }
  pop.classList.add("active");
}

initLayout();
