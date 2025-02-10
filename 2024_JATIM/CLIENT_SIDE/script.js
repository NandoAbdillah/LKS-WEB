document.addEventListener("DOMContentLoaded", () => {
  // Variabel State

  let gameState = "playing";

  // Variabel ELement umum

  // Home Element
  let inputUsername,
    selectGameLevel,
    selectGuns,
    selectTarget,
    btnStart,
    btnInstruction,
    sidebarInstruction,
    btnCloseInstruction;

  // Coutdown Element
  let numberCountdown,
    countdownTime = 2,
    countdownInterval = null;

  // Player Data
  let playerData = {},
    allPlayerData;

  //   Gameplay
  let canvas,
    canvasCtx,
    imageGun,
    imageTarget,
    spaceSpammed = false,
    navTop,
    navTimer,
    navScore,
    gameTimerInterval = null,
    targetAmount = 3,
    gameTimer = 0,
    timerOnPaused = 0,
    scoreOnPaused = 0,
    targetList;

  // GameOver and Pause
  let saveBtn, restartBtn, continueBtn, exitBtn;


  // Variabel untuk pengurutan Leaderboard
  let sortBy = 'name', sortOrder='asc';  
  let leaderboard;

  let gunChangedSfx = new Audio("./Sprites/gun_changed.wav");
  let gunFireSfx = new Audio("./Sprites/gun_shoot.wav");
  let onPointSfx = new Audio("./Sprites/game_point.wav");

  const renderLayout = () => {
    // console.log("rendreed");
    renderHomeLayout();
    handleEvent();
  };

  const renderHomeLayout = () => {
    inputUsername = document.getElementById("input-username");
    selectGameLevel = document.getElementById("game-level");

    btnStart = document.getElementById("startGame");
    btnInstruction = document.getElementById("openInstruction");

    sidebarInstruction = document.getElementsByClassName(
      "sidebar-instruction"
    )[0];

    btnCloseInstruction = document.getElementsByClassName(
      "btn-close-instruction"
    )[0];
  };

  const renderCountdownLayout = () => {
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }
    numberCountdown = document.getElementById("numberCountdown");

    countdownInterval = setInterval(() => {
      numberCountdown.innerHTML = countdownTime--;

      if (countdownTime < 0) {
        if (gameState === "playing") {
          clearInterval(countdownInterval);
          setScreenActive("gameplay", true);
          renderGamePlayLayout();
          countdownTime = 2;
          numberCountdown.innerHTML = 3;
        } else {
          gameState = "playing";
          // startTimer();
          console.log("ini Playing lagi");
        }
      }
    }, 1000);
  };

  const renderGamePlayLayout = () => {
    canvas = document.getElementById("gameCanvas");
    canvasCtx = canvas.getContext("2d");

    navTop = document.getElementsByClassName("game-nav-top")[0];
    navTimer = document.getElementById("player-timer");
    navScore = document.getElementById("player-score");

    leaderboard = document.getElementsByClassName('select-ladeboard')[0];

    leaderboard.onchange = () => {
      leaderboardOnchange();
    }
    renderCanvas();

    shootDetect();

    renderLeaderboard();


  };

  const leaderboardOnchange = () => {
    sortBy =  leaderboard.value;
    renderLeaderboard();

  } 

  const renderLeaderboard = () => {
    const leaderboardWrapper = document.getElementsByClassName("player_datas")[0];
    const playerDatas = localStorage.getItem("players");
    const datasParsing = JSON.parse(playerDatas) || [];
  
    // Bersihkan elemen sebelumnya
    leaderboardWrapper.innerHTML = "";

    // Mengurutkan data terlebih dahulu sebelum ditampilkan 
    datasParsing.sort((a,b) => {
      if(sortBy == 'name') {
        return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if(sortBy == 'score') {
        return sortOrder === 'asc' ? a.score - b.score : b.score - a.score;
      }
    })
  
    datasParsing.forEach((data, index) => {
      // Buat elemen wrapper untuk setiap data
      const dataWrapper = document.createElement("div");
      dataWrapper.classList.add("data");
  
      // Tambahkan konten ke dalam dataWrapper
      dataWrapper.innerHTML = `
        <p id="data_name">${data.name}</p>
        <p>Total Score <span id="data_score">${data.score}</span></p>
      `;
  
      // Tambahkan elemen dataWrapper ke leaderboardWrapper
      leaderboardWrapper.appendChild(dataWrapper);
    });
  };
  
  const renderCanvas = () => {
    const ctx = canvasCtx;
    renderCanvasPointer(ctx);
    renderGunChosen();
    renderGameTimer();
  };

  const renderCanvasPointer = (ctx) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();

      pointerXCoor = e.clientX - rect.left;
      pointerYCoor = e.clientY - rect.top;

      ctx.closePath();
    });
  };

  const renderGunChosen = () => {
    imageGun = document.getElementById("img-gameplay-gun");

    const gun = playerData["gun"] ?? "gun1";
    imageGun.src = "./Sprites/" + gun + ".png";
  };

  const renderGameTimer = () => {
    const timer = [15, 20, 30];
    if (playerData["level"] === "easy") {
      gameTimer = timer[0];
    } else if (playerData["level"] === "medium") {
      gameTimer = timer[1];
    } else {
      gameTimer = timer[2];
    }

    navTimer.innerHTML = gameTimer;

    imageTarget = playerData["target"] ?? "target1";

    startTimer();

    renderGameStart();
  };

  // const startTimer = () => {
  //   if (timerOnPaused != 0) {
  //     gameTimer = timerOnPaused;
  //   }

  //   gameTimerInterval = setInterval(() => {
  //     if (gameState === "playing") {
  //       console.log(gameTimer);
  //       console.log(playerData['score']);
  //       gameTimer--;
  //       if (gameTimer <= 0) {
  //         clearInterval(gameTimerInterval);
  //         gameTimerInterval = null;
  //         endGame();
  //       }
  //     }
  //     navTimer.innerHTML = gameTimer;
  //   }, 1000);
  // };

  // Fungsi Start Timer
  const startTimer = () => {
    clearInterval(gameTimerInterval); // Pastikan tidak ada interval ganda
    gameTimerInterval = setInterval(() => {
      if (gameState === "playing") {
        gameTimer--;
        if (gameTimer <= 0) {
          clearInterval(gameTimerInterval);
          endGame();
        }
        navTimer.innerHTML = gameTimer;
      }
    }, 1000);
  };

  const renderGameStart = () => {
    targetList = Array.from({ length: targetAmount }, () => new Target());

    if (targetList.length !== 0) {
      targetList.forEach((target) => {
        target.fixPosition();
      });
      targetList.forEach((target) => {
        target.draw();
      });
    }
  };

  // const renderTargetRegenarate = () => {

  // }

  const shootDetect = () => {
    playerData["score"] = 0;

    canvas.addEventListener("click", (e) => {
      gunFireSfx.play();
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      let isShoot = false;

      targetList.forEach((target) => {
        if (
          clientX >= target.x &&
          clientX <= target.x + target.width &&
          clientY >= target.y &&
          clientY <= target.y + target.height
        ) {
          onPointSfx.play();
          isShoot = true; // Tetap true jika target terkena
          playerData["score"] += 1;
          navScore.innerHTML = playerData["score"];
          target.shoot();
        }
      });

      // Hanya kurangi waktu jika tidak ada target yang terkena
      if (!isShoot) {
        gameTimer -= 5;
        if (gameTimer < 0) gameTimer = 0; // Pastikan timer tidak negatif
        navTimer.innerHTML = gameTimer;
        console.log("Missed! Timer reduced by 5 seconds.");
      }
    });
  };

  const endGame = () => {
    setScreenActive("gameover", true);
    renderGameOverLayout();
  };

  const renderGameOverLayout = () => {
    saveBtn = document.getElementById("btn-save");
    restartBtn = document.getElementById("btn-restart");

    saveBtn.onclick = () => {
      saveUserData();
      setScreenActive("home", true);
      clearSelectedActiveScreen("gameover");
    };

    restartBtn.onclick = () => {
      setScreenActive("home", true);
      clearSelectedActiveScreen("gameover");
    };

    document.getElementById("player-name-over").innerHTML = playerData["name"];
    document.getElementById("player-score-over").innerHTML =
      playerData["score"];
  };

  const saveUserData = () => {
    allPlayerData = localStorage.getItem("players");
    if (allPlayerData !== null) {
      const dataParsing = JSON.parse(allPlayerData);
      const updateData = [...dataParsing, playerData];

      localStorage.setItem("players", JSON.stringify(updateData));
    } else {
      localStorage.setItem("players", JSON.stringify([playerData]));
    }
  };

  // Fungsi Pause Game
  const pauseGame = () => {
    gameState = "paused";
    clearInterval(gameTimerInterval); // Hentikan timer
    timerOnPaused = gameTimer; // Simpan waktu saat ini
    console.log("Game Paused. Timer: " + timerOnPaused);
    setScreenActive("pause");

    continueBtn = document.getElementById("btn-continue");
    exitBtn = document.getElementById("btn-exit");

    continueBtn.addEventListener("click", () => {
      resumeGame();
    });

    exitBtn.addEventListener("click", () => {
      clearSelectedActiveScreen("pause");
      setScreenActive("home", true);
    });
  };

  // Fungsi Resume Game
  const resumeGame = () => {
    gameState = "playing";
    clearSelectedActiveScreen("pause");
    console.log("Game Resumed. Timer: " + gameTimer);
    setScreenActive("countdown");
    resumeGameCountdown();
  };

  const resumeGameCountdown = () => {
    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
      numberCountdown.innerHTML = countdownTime--;

      if (countdownTime < 0) {
        gameState = "playing";
        startTimer();
        clearSelectedActiveScreen("countdown");
        clearInterval(countdownInterval);
        countdownTime = 2;
        numberCountdown.innerHTML = 3;
        console.log("ini Playing lagi");
      }
    }, 1000);
  };

  class Target {
    constructor() {
      this.width = 100;
      this.height = 100;
      this.y = 0;
      this.x = 0;
      this.targetList = targetList;
      this.image = new Image();
      this.image.src = "./Sprites/" + imageTarget + ".png";
      this.context = canvasCtx;

      this.hit = false;
    }

    shoot() {
      this.hit = true;
      this.regenerate();
    }

    isOverlapping() {
      let overlapping;
      do {
        // Generate koordinat acak
        this.y =
          navTop.offsetHeight +
          Math.random() *
            (canvas.height -
              (this.height + imageGun.height + navTop.offsetHeight));
        this.x = Math.random() * (canvas.width - this.width);

        // Cek apakah tumpang tindih
        overlapping = targetList.some((target) => {
          return (
            this !== target && // Pastikan tidak memeriksa diri sendiri
            this.x < target.x + target.width &&
            this.x + this.width > target.x &&
            this.y < target.y + target.height &&
            this.y + this.height > target.y
          );
        });
      } while (overlapping);
    }

    draw() {
      this.context.drawImage(
        this.image,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }

    fixPosition() {
      this.isOverlapping();
    }

    regenerate() {
      this.context.clearRect(this.x, this.y, this.width, this.height);
      this.isOverlapping();
      this.draw();
    }
  }

  // Event
  const handleEvent = () => {
    // Event Membuka Instruksi
    btnInstruction.addEventListener("click", () => {
      sidebarInstruction.classList.remove("hide");
      sidebarInstruction.classList.add("active");
      btnInstruction.style.cursor = "not-allowed";
      btnInstruction.style.opacity = "0.5";
    });

    // Menutup Instruksi
    btnCloseInstruction.addEventListener("click", () => {
      sidebarInstruction.classList.remove("active");
      sidebarInstruction.classList.add("hide");
      btnInstruction.style.cursor = "pointer";
      btnInstruction.style.opacity = "1";
    });

    btnStart.addEventListener("click", (e) => {
      e.preventDefault();
      checkInputPlayer();
    });

    // Mengganti Gun dan pause game
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        gunChangedSfx.play();
        if (!spaceSpammed) {
          spaceSpammed = true;
          imageGun.classList.add("gun-changed");
          if (playerData["gun"] === "gun1") {
            playerData["gun"] = "gun2";
          } else {
            playerData["gun"] = "gun1";
          }

          renderGunChosen();
        }

        imageGun.onanimationend = () => {
          imageGun.classList.remove("gun-changed");
          spaceSpammed = false;
        };
      } else if (e.code === "Escape") {
        if (gameState === "playing") {
          pauseGame();
        } else if (gameState === "paused") {
          resumeGame();
        }
      }
    });
  };

  const checkInputPlayer = () => {
    const gunsSelected = document.querySelector(
      "input[name=game-guns]:checked"
    );
    const targetSelected = document.querySelector(
      "input[name=game-target]:checked"
    );

    selectGuns = gunsSelected ? gunsSelected.value : "invalid";
    selectTarget = targetSelected ? targetSelected.value : "invalid";

    if (inputUsername.value.trim() === "" && selectGameLevel.value === "") {
      alert("Username and game level must be filled !");
    } else {
      if (selectGuns !== "invalid" && selectTarget !== "invalid") {
        setCurrentPlayerInfo();
        setScreenActive("countdown", true);
        renderCountdownLayout();
      } else {
        alert("You must choose a gun and a target !");
      }
    }
  };

  const setCurrentPlayerInfo = () => {
    playerData["name"] = inputUsername.value.trim();
    playerData["level"] = selectGameLevel.value;
    playerData["gun"] = selectGuns;
    playerData["target"] = selectTarget;
    playerData["score"] = 0;
  };

  const getCurrentPlayerInfo = () => {};

  const localDataPlayer = () => {};

  const setScreenActive = (screenId, clear) => {
    const screen = document.getElementById(screenId);
    if (clear) {
      clearAllActiveScreen();
    }
    screen.classList.add("active");
  };

  const clearAllActiveScreen = () => {
    const screen = document.querySelector(".screen.active");
    screen.classList.remove("active");
  };

  const clearSelectedActiveScreen = (screenId) => {
    const screen = document.getElementById(screenId);
    screen.classList.remove("active");
  };

  renderLayout();
  // renderGamePlayLayout();
});
