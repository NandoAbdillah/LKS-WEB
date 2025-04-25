function init() {
  clearAllScreen("gameplay");
  initGameplay();
  //   initHome();
}

function initHome() {
  const btnPlay = document.getElementById("btn-play"),
    btnProfile = document.getElementById("btn-profile"),
    btnQuit = document.getElementById("btn-quit"),
    profile = document.querySelector(".profile"),
    btnBack = document.getElementById("btn-back"),
    inputPlayerName = document.getElementById("player-name");
  let playerName = "Guest 1";

  btnPlay.onclick = () => {
    clearAllScreen("level");
    initLevel();
  };
  btnProfile.onclick = () => {
    profile.classList.add("active");
  };
  btnBack.onclick = () => {
    profile.classList.remove("active");
  };
  btnQuit.onclick = () => {
    window.close();
  };

  if (inputPlayerName.value === "") {
    inputPlayerName.value = playerName;
  }

  inputPlayerName.oninput = (e) => {
    playerName = e.target.value;
  };
}

let levelOpen = [1, 2];
function initLevel() {
  const btnBack = document.getElementById("btn-back-home"),
    btnLevels = document.querySelectorAll(".lv");
  btnLevels.forEach((btn, index) => {
    if (levelOpen.includes(index + 1)) {
      btn.classList.remove("disabled");

      btn.onclick = () => {
        clearAllScreen("gameplay");
        initGameplay();
      };
    }
  });

  btnBack.onclick = () => {
    clearAllScreen("home");
  };
}

function initGameplay() {
  const canvas = document.getElementById("gameplay-canvas"),
    ctx = canvas.getContext("2d"),
    canvasH = canvas.height ,
    canvasW = canvas.width ;

  // 1B. Variabel Utama
  let towerHealth = 3;
  let spellNumber = 10;
  let score = 0;
  let currentLevel = 1;
  let monsterList = [];
  let gameOver = false;

  let monsterSpeed = 1;
  let spawnInterval = 2;
  const monsterImageSources = [
    "./media/Character/Character (1).png", // Karakter 1 normal
    "./media/Character/Character (2).png", // Karakter 1 clicked
    "./media/Character/Character (3).png", // Karakter 2 normal
    "./media/Character/Character (4).png", // Karakter 2 clicked
    "./media/Character/Character (5).png", // Karakter 3 normal
    "./media/Character/Character (6).png", // Karakter 3 clicked
    "./media/Character/Character (7).png", // Karakter 4 normal
    "./media/Character/Character (8).png", // Karakter 4 clicked
    "./media/Character/Character (9).png", // Karakter 5 normal
    "./media/Character/Character (10).png", // Karakter 5 clicked
    "./media/Character/Character (11).png", // Karakter 6 normal
    "./media/Character/Character (12).png", // Karakter 6 clicked
    "./media/Asset Lainya/Tower.png",
  ];

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
      img.src = src;
    });
  }

  let monsterSprites, towerSprite;
  Promise.all(monsterImageSources.map(loadImage))
    .then((loadedImages) => {
      monsterSprites = {
        character1: { normal: loadedImages[0], clicked: loadedImages[1] },
        character2: { normal: loadedImages[2], clicked: loadedImages[3] },
        character3: { normal: loadedImages[4], clicked: loadedImages[5] },
        character4: { normal: loadedImages[6], clicked: loadedImages[7] },
        character5: { normal: loadedImages[8], clicked: loadedImages[9] },
        character6: { normal: loadedImages[10], clicked: loadedImages[11] },
      };

      towerSprite = loadedImages[12];
      console.log("All monster images loaded!", monsterSprites);
      // Di titik ini, semua gambar siap digunakan.
      // testDrawCharacter(monsterSprites.character1.normal);
      gameLoop();
    })
    .catch((error) => {
      console.error("Error loading images", error);
    });

  function testDrawCharacter(img) {
    ctx.clearRect(0, 0, canvasW, canvasH);
    ctx.drawImage(img, 100, 100, 50, 50);
  }

  const towerGap = 150;
  const gridRows = 3;
  const gridCols = 4;

  // PERBAIKAN #1:
  const cellGap = 1; // Jarak antar sel (opsional)
  const cellSize = (canvasW - towerGap ) / gridCols;
  const cellWidth = (canvasW - towerGap ) / gridCols;
  const cellHeight = (canvasH ) / gridRows;

  function drawBackgroundAndGrid() {
    // 1. Bersihkan canvas
    // ctx.clearRect(0, 0, canvasW, canvasH);

    // ctx.lineWidth = 2;
    for (let row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
        const x = towerGap + col * (cellWidth);
        const y = row * (cellHeight) ;

        ctx.strokeStyle = "#d2ab4a";
        ctx.strokeRect(x, y, cellWidth, cellHeight);
      }
    }

    
    ctx.fillStyle = "rgba(150, 150, 150, 0.5)";
    ctx.fillRect(0, 0, towerGap, canvasH);
  }


  // Fungsi helper untuk menghasilkan integer random (jika diperlukan)
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Fungsi untuk memuat level dengan penempatan monster pada grid
  // --- PERBAIKAN loadLevel() ---
  function loadLevel() {
 
    let predefinedCells;
    if (currentLevel === 1) {
      predefinedCells = [
        { row: 0, col: 2 },
        { row: 0, col: 3 },
        { row: 1, col: 2 },
        { row: 1, col: 3 },
      ];
    } else {
      // Untuk level-level berikutnya, gunakan predefined cells yang lama (atau sesuaikan sesuai desain)
      predefinedCells = [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
        { row: 1, col: 0 },
      ];
    }

    // Jika ada monster lama di cell target, dorong mereka satu cell ke kiri
    predefinedCells.forEach((cell) => {
      monsterList.forEach((monster) => {
        if (monster.row === cell.row && monster.col === cell.col) {
          monster.col -= 1;
          monster.x = towerGap + monster.col * (cellWidth);
          if (monster.col < 0) {
            monster.active = false;
            towerHealth--;
          }
        }
      });
    });
    monsterList = monsterList.filter((monster) => monster.active !== false);

    if (currentLevel === 1) {
      // Level pertama: tetapkan monster secara statis dengan nilai [3, 2, 3, 1]
      const initialMonsterValues = [3, 2, 3, 1];
      for (let i = 0; i < initialMonsterValues.length; i++) {
        let cell = predefinedCells[i];
        let x = towerGap + cell.col * (cellWidth);
        let y = cell.row * (cellHeight);
        monsterList.push({
          value: initialMonsterValues[i],
          row: cell.row,
          col: cell.col,
          x: x,
          y: y,
          active: true,
          selected: false,
        });
      }
      // Set spellNumber antara 1 dan 10
      spellNumber = getRandomInt(1, 10);
    } else {
      // Untuk level-level berikutnya: spawn monster baru secara acak.
      const jumlahMonster = currentLevel * 5; // Contoh: 5 monster per level
      for (let i = 0; i < jumlahMonster; i++) {
        // Pilih cell secara acak dari predefinedCells
        let cell = predefinedCells[getRandomInt(0, predefinedCells.length - 1)];
        let x = towerGap + cell.col * (cellWidth);
        let y = cell.row * (cellHeight);
        let value = getRandomInt(1, 10 + currentLevel);
        monsterList.push({
          value: value,
          row: cell.row,
          col: cell.col,
          x: x,
          y: y,
          active: true,
          selected: false,
        });
      }
      // Set spellNumber antara 1 dan 10
      spellNumber = getRandomInt(1, 10);
    }
    console.log(
      "Level loaded:",
      currentLevel,
      "SpellNumber:",
      spellNumber,
      "MonsterList:",
      monsterList
    );
  }

 
  loadLevel();
  let selectedCardNumber = 5;

  // ======================
  // 3. PERGERAKAN WAKTU NYATA (GAME LOOP)
  // ======================

  // Fungsi update logika game
  // --- PERBAIKAN updateGame() ---
  // Hapus pergerakan otomatis setiap frame; monster hanya bergerak (maju satu langkah)
  // melalui mekanisme loadLevel() ketika ada collision cell.
  function updateGame() {
    // Hanya cek apakah ada monster yang sudah melewati batas tower (misal, x < towerGap)
    monsterList.forEach((monster) => {
      if (monster.x < towerGap) {
        towerHealth--;
        monster.active = false;
      }
    });
    monsterList = monsterList.filter((monster) => monster.active !== false);

    if (towerHealth <= 0) {
      gameOver = true;
    }
    // Jika tidak ada monster yang tersisa (level selesai), naikkan level dan muat level baru.
    if (monsterList.length === 0) {
      currentLevel++;
      loadLevel();
    }
  }

  function drawMonsters() {
    monsterList.forEach((monster) => {
      // Misalnya, kita gambar kotak merah untuk monster
      //   ctx.fillStyle = "red";
      //   ctx.fillRect(monster.x, monster.y, cellSize, cellSize);

      const img = monsterSprites.character2.normal;
      ctx.drawImage(img, monster.x + cellGap , monster.y + cellGap, cellWidth - cellGap * 4, cellHeight - cellGap * 4);

      const imageData = ctx.getImageData(0, 0, canvasW, canvasH);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const isWhite = data[i] > 250 && data[i + 1] > 250 && data[i + 2] > 250;
        if (isWhite) {
          data[i + 3] = 0;
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // Tampilkan nilai monster di tengah kotak
      ctx.fillStyle = "#17a0e9";
      ctx.font = "bold 20px Arial";
      ctx.textAlign = "center";
      ctx.fillText(monster.value, monster.x + cellHeight / 2, monster.y + 25);

      // Jika monster sedang terpilih, beri border highlight
      if (monster.selected) {
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 3;
        ctx.strokeRect(monster.x, monster.y, cellWidth, cellHeight);
      }
    });
  }

  // Fungsi untuk menggambar ulang tampilan game
  function renderGame() {

    ctx.clearRect(0, 0, canvasW, canvasH);

    // 1. Gambar ulang background dan grid (termasuk area tower)
    drawBackgroundAndGrid();

    // 2. Gambar monster yang masih aktif
   drawMonsters();
  

    // 3. Tampilkan informasi towerHealth, score, dan spell card
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Tower Health: " + towerHealth, 10, 30);
    ctx.fillText("Score: " + score, 10, 60);
    ctx.fillText("Spell Card: " + selectedCardNumber, 10, 90);

    for (let i = 0; i < gridRows; i++) {
      ctx.drawImage(towerSprite, 0, i * cellHeight, cellWidth, cellHeight);
    }
  }

  // Game loop dengan menggunakan requestAnimationFrame
  function gameLoop() {
    if (gameOver) {
      // Tampilkan layar game over
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(0, 0, canvasW, canvasH);
      ctx.fillStyle = "white";
      ctx.font = "40px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Game Over", canvasW / 2, canvasH / 2);
      return; // Hentikan loop
    }

    updateGame();
    renderGame();
    requestAnimationFrame(gameLoop);
  }

  // Mulai game loop

  // ======================
  // 4. INTERAKSI PEMAIN (PEMILIHAN MONSTER)
  // ======================

  // --- Tambahan: Fungsi helper untuk mengecek sel kosong ---
  function isCellEmpty(row, col) {
    return !monsterList.some(
      (monster) => monster.row === row && monster.col === col
    );
  }

  // --- Tambahan: Fungsi untuk mendorong monster yang ada secara rekursif ---
  function pushCell(row, col) {
    // Cari monster yang berada di cell (row, col)
    let idx = monsterList.findIndex(
      (monster) => monster.row === row && monster.col === col
    );
    if (idx !== -1) {
      let newCol = col - 1; // Dorong ke kiri (menuju tower)
      if (newCol < 0) {
        // Jika melewati batas tower, hapus monster dan kurangi nyawa tower.
        monsterList.splice(idx, 1);
        towerHealth--;
      } else {
        // Jika cell sebelah kiri sudah terisi, dorong terlebih dahulu.
        if (!isCellEmpty(row, newCol)) {
          pushCell(row, newCol);
        }
        // Setelah cell kiri kosong, perbarui posisi monster.
        monsterList[idx].col = newCol;
        monsterList[idx].x = towerGap + newCol * (cellWidth);
      }
    }
  }

  // Tambahkan event listener pada canvas untuk mendeteksi klik/tap
  canvas.addEventListener("click", function (e) {
    // Hitung posisi klik relatif terhadap canvas
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Cek setiap monster: jika klik berada di dalam bounding box monster, toggle status 'selected'
    monsterList.forEach((monster) => {
      if (
        clickX >= monster.x &&
        clickX <= monster.x + cellWidth &&
        clickY >= monster.y &&
        clickY <= monster.y + cellHeight
      ) {
        monster.selected = !monster.selected;
      }
    });

    // Hitung jumlah nilai monster yang terpilih
    let sumSelected = monsterList.reduce((acc, monster) => {
      return acc + (monster.selected ? monster.value : 0);
    }, 0);

    // Jika jumlah nilai monster yang terpilih sama dengan nilai kartu (selectedCardNumber)
    if (sumSelected === selectedCardNumber) {
      // Hapus monster yang terpilih dan tambahkan skor
      let removedValue = 0;
      monsterList = monsterList.filter((monster) => {
        if (monster.selected) {
          removedValue += monster.value;
          return false; // Hapus monster tersebut
        }
        return true;
      });
      score += removedValue;

      // Reset status seleksi monster yang tersisa
      monsterList.forEach((monster) => {
        monster.selected = false;
      });

      // --- Perbarui Spell Number dan Spawn Monster Baru ---
      // Perbarui spell card: gunakan angka antara 1 dan 10
      selectedCardNumber = getRandomInt(1, 10);

      // Tentukan jumlah monster baru yang akan muncul (antara 2 dan 3)
      let numNew = getRandomInt(2, 3);
      for (let i = 0; i < numNew; i++) {
        // Monster baru selalu muncul di kolom paling kanan (rightmost cell)
        let targetRow = getRandomInt(0, gridRows - 1);
        let targetCol = gridCols - 1; // Kolom paling kanan

        // Jika cell target sudah terisi, dorong monster yang ada ke kiri
        if (!isCellEmpty(targetRow, targetCol)) {
          pushCell(targetRow, targetCol);
        }
        // Setelah cell target kosong, spawn monster baru di sana
        let newValue = getRandomInt(1, 10 + currentLevel);
        let newMonster = {
          value: newValue,
          row: targetRow,
          col: targetCol,
          x: towerGap + targetCol * (cellWidth),
          y: targetRow * (cellHeight),
          active: true,
          selected: false,
        };
        monsterList.push(newMonster);
      }
    }
  });

  // Panggil fungsi untuk menggambar
  // drawBackgroundAndGrid();
}

// function init

function clearAllScreen(screenId, clearAll = true) {
  if (clearAll) {
    document
      .querySelectorAll(".screen.active")
      .forEach((screen) => screen.classList.remove("active"));
  }
  const screen = document.getElementById(screenId);
  screen.classList.add("active");
}

init();
