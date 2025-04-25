// Home Attribute

function initLayout() {
  homeInit();
}

// UserData
let playerData = {},
  gameState;

function homeInit() {
  // Input & btn
  const btnInstr = document.getElementById("btn-instruction"),
    btnPlay = document.getElementById("btn-play"),
    instruction = document.querySelector(".instruction"),
    closeBtn = document.querySelector(".close-instr"),
    inputUsername = document.getElementById("input-username");

  let setUsername = "";

  btnInstr.onclick = () => {
    instruction.classList.toggle("active");
  };
  closeBtn.onclick = () => {
    instruction.classList.remove("active");
  };
  inputUsername.oninput = (e) => {
    btnPlay.classList.toggle("disable", e.target.value.trim() === "");
    setUsername = e.target.value;
  };

  btnPlay.onclick = () => {
    let choosenLevel = document.getElementById("level").value,
      choosenGun = document.querySelector("input[name=gun]:checked"),
      choosenTarget = document.querySelector("input[name=target]:checked");

    if (setUsername === "") {
      alert("Username must be filled");
      return;
    }

    if (choosenLevel === "") {
      alert("Level must be filled");
      return;
    }
    if (!choosenGun || !choosenTarget) {
      alert("Must be choose one gun and one target !");
      return;
    } else {
      choosenGun = choosenGun.value;
      choosenTarget = choosenTarget.value;
    }

    //Set Player Data
    playerData["name"] = setUsername;
    playerData["level"] = choosenLevel;
    playerData["gun"] = choosenGun;
    playerData["target"] = choosenTarget;

    // Start Countdown Game
    clearActiveScreen("countdown", true);
    showCountdown(() => {
      // Callback Memulai Game
      clearActiveScreen("gameplay", true);
      gameplayInit();
    });
  };
}

function gameplayInit() {
  const playerName = document.getElementById("player-name"),
    playerScore = document.getElementById("player-score"),
    playerTime = document.getElementById("player-time"),
    level = playerData["level"],
    canvas = document.getElementById("gameplay-canvas"),
    ctx = canvas.getContext("2d"),
    canvasW = canvas.width,
    canvasH = canvas.height,
    leaderboard = document.getElementById("gameplay-leaderboard"),
    sort = document.getElementById("sort-leaderboard");

  playerName.textContent = playerData["name"];

  // Mulai Timer
  const timer = gameTimer({
    MAX_TIME: level === "easy" ? 30 : level === "medium" ? 20 : 15,
    element: playerTime,
    onCompleted: () => {
      timer.stop();
      targetInterval.stop();
      gameState = "gameover";
      attachDialog("gameover");
      console.log("countdown selesai");
    },
  });

  // Deteksi Keboard attach dari user
  document.onkeydown = (e) => {
    if (e.code == "Escape") {
      if (gameState == "playing") {
        gameState = "pause";
        timer.stop();
        targetInterval.stop();
        attachDialog("pause");
      } else {
        continueGame();
      }
    }
  };

  // Deteksi event di semua dialog
  const cont = document.getElementById("continue"),
    restart = document.querySelectorAll(".restart"),
    save = document.getElementById("save");

  cont.onclick = () => {
    // attachDialog("pause", true);
    // timer.resume();
    // targetInterval.resume();
    continueGame();
  };

  restart.forEach(
    (rest) =>
      (rest.onclick = () => {
        timer.reset();
        targetInterval.reset();
        playerData["score"] = 0;
        playerScore.textContent = "Score ";
        gameState == "pause"
          ? attachDialog("pause", true)
          : attachDialog("gameover", true);
        clearActiveScreen("home", true);
      })
  );

  save.onclick = () => {};

  function continueGame() {
    console.log("atacch countdown");
    clearActiveScreen("countdown", true);

    showCountdown(() => {
      clearActiveScreen("gameplay", true);

      gameState = "playing";
      attachDialog("pause", true);
      timer.resume();
      targetInterval.resume();
    });
  }

  //  Draw Gun
  const gunImg = new Image(),
    gunW = 250,
    gunH = 200;

  gunImg.onload = () => {
    const x = (canvasW - gunW) / 2;
    const y = canvasH - gunH;
    ctx.beginPath();
    ctx.drawImage(gunImg, x, y, gunW, gunH);
    ctx.closePath();
  };
  // gunImg.src = "./Sprites/" + playerData["gun"]  +'.png';
  gunImg.src = "./Sprites/gun1.png";

  // Mulai buat gambar target
  class Target {
    constructor() {
      this.width = 100;
      this.height = 100;
      this.pad = 50;
      this.img = "./Sprites/target1.png";
      this.targetImg = new Image();
      this.targetImg.src = this.img;

      // Tentukan posisi awal
      this.x =
        this.width + Math.random() * (canvasW - this.width - this.pad * 2);
      this.y =
        this.height +
        Math.random() * (canvasH - gunH - this.height - this.pad * 2);

      this.checkCollision();
    }

    checkCollision() {
      for (let tries = 0; tries < 50; tries++) {
        let overlaps = false;

        for (let target of targetList) {
          if (target === this) continue;

          const isOverlaps =
            this.y - this.pad < target.y + target.height &&
            this.y + this.height + this.pad > target.y &&
            this.x - this.pad < target.x + target.width &&
            this.x + this.width + this.pad > target.x;

          if (isOverlaps) {
            overlaps = true;
            break; // Keluar dari loop target jika ada overlap
          }
        }

        if (!overlaps) {
          return; // Posisi sudah valid, keluar dari fungsi
        }

        // Jika overlap, coba posisi acak baru
        this.x =
          this.width + Math.random() * (canvasW - this.width - this.pad * 2);
        this.y =
          this.height +
          Math.random() * (canvasH - gunH - this.height - this.pad * 2);
      }
    }

    draw() {
      this.targetImg.onload = () => {
        ctx.beginPath();
        ctx.drawImage(this.targetImg, this.x, this.y, this.width, this.height);
        ctx.closePath();
      };
    }

    remove() {
      ctx.clearRect(this.x, this.y, this.width, this.height);
    }

    clear() {
      ctx.clearRect(0, 0, canvasW, canvasH);
    }
  }

  // Buat targetList setelah kelas didefinisikan
  let targetList = [];

  // 3 Target Pertama saat game dimulai
  function createFirstTarget() {
    for (let i = 0; i < 3; i++) {
      targetList.push(new Target());
    }
  }
  createFirstTarget();
  drawTarget();

  const targetInterval = generateTarget();

  function generateTarget() {
    let targetInterval = null;

    function generate() {
      targetInterval = setInterval(() => {
        const newTarget = new Target();
        targetList.push(newTarget);
        newTarget.draw();
      }, 3000);
    }

    generate();

    return {
      stop: () => {
        clearInterval(targetInterval);
        targetInterval = null;
      },
      resume: () => {
        if (targetInterval == null) generate();
      },
      reset: () => {
        ctx.clearRect(0, 0, canvasW, canvasH);
        targetList = null;
        clearInterval(targetInterval);
        targetInterval = null;
      },
    };
  }

  function drawTarget() {
    targetList.forEach((target) => target.draw());
  }

  //  Deteksi Pergerkaan mouse di canvas
  playerData["score"] = 0;
  canvas.onclick = (e) => {
    const rect = canvas.getBoundingClientRect(),
      mouseX = e.clientX - rect.left,
      mouseY = e.clientY - rect.top;

    let isHit = false;

    console.log("Coordinat " + mouseX + " : " + mouseY);
    for (let target of targetList) {
      const isShoot =
        mouseX > target.x &&
        mouseX < target.x + target.width &&
        mouseY > target.y &&
        mouseY < target.y + target.height;

      if (isShoot) {
        playerData["score"]++;
        target.remove();
        targetList = targetList.filter((t) => t !== target);
        playerScore.textContent = "Score : " + playerData["score"];
        isHit = true;
        break;
      }
    }

    if (!isHit) timer.subtractTime(5);
  };

  // let choosenSort = sort.value;
  // sort.oninput = (e) => {
  //   choosenSort = e.target.value;
  // };

  // const playersData = localStorage.getItem("PLAYERS_DATA"),
  //   data = playersData ? JSON.parse(playerData) : [];

  // Bersihkan elemen sebelumnya
  //  leaderboardWrapper.innerHTML = "";

  //  // Mengurutkan data terlebih dahulu sebelum ditampilkan
  //  datasParsing.sort((a,b) => {
  //    if(sortBy == 'name') {
  //      return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
  //    } else if(sortBy == 'score') {
  //      return sortOrder === 'asc' ? a.score - b.score : b.score - a.score;
  //    }
  //  })

  //  datasParsing.forEach((data, index) => {
  //    // Buat elemen wrapper untuk setiap data
  //    const dataWrapper = document.createElement("div");
  //    dataWrapper.classList.add("data");

  //    // Tambahkan konten ke dalam dataWrapper
  //    dataWrapper.innerHTML = `
  //      <p id="data_name">${data.name}</p>
  //      <p>Total Score <span id="data_score">${data.score}</span></p>
  //    `;

  //    // Tambahkan elemen dataWrapper ke leaderboardWrapper
  //    leaderboardWrapper.appendChild(dataWrapper);
  //  });
}

function showCountdown(callback) {
  let count = 3;
  const countdown = document.getElementById("count");
  countdown.textContent = count;

  const countdownInterval = setInterval(() => {
    count--;

    if (count === 0) {
      countdown.textContent = "GO!";
      count = 3;
      clearInterval(countdownInterval);
      gameState = "playing";
      callback();
    } else {
      countdown.textContent = count;
    }
  }, 1000);
}

function gameTimer(options = {}) {
  let elapsedTime = options.MAX_TIME * 100,
    element = options.element,
    timerInterval = null;
  function updateDisplay() {
    const second = Math.ceil(elapsedTime / 100);
    const centisecond = elapsedTime % 100;

    element.textContent = `Time : ${second
      .toString()
      .padStart(2, "0")} : ${centisecond.toString().padStart(2, "0")}`;
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
    subtractTime: (seconds) => {
      elapsedTime -= seconds * 100;
      if (elapsedTime < 0) elapsedTime = 0;
      updateDisplay();
    },
    stop: () => {
      clearInterval(timerInterval);
      timerInterval = null;
    },
    resume: () => {
      if (timerInterval === null) {
        startInterval();
      }
    },
    reset: () => {
      elapsedTime = options.MAX_TIME * 100;
      clearInterval(timerInterval);
      timerInterval = null;
    },
  };
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
// gameState = "playing";
// gameplayInit();
