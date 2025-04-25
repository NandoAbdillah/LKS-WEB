let player1Data = {},
  player2Data = {},
  playerLevel = "",
  playerBall = "";
function initHomeLayout() {
  const btnInstr = document.getElementById("btn-instruction"),
    instruction = document.querySelector(".instruction"),
    overlay = document.querySelector(".overlay"),
    btnClose = document.querySelector(".close-instr"),
    selectLevel = document.getElementById("level"),
    btnPlay = document.getElementById("btn-play");
  btnInstr.onclick = () => {
    instruction.classList.toggle("active");
    overlay.classList.toggle("blur");
  };

  btnClose.onclick = () => {
    instruction.classList.remove("active");
    overlay.classList.remove("blur");
  };

  let activePlayer = 1; // Menunjukkan pemain yang sedang aktif (1 atau 2)

  const playerInputState = {
    1: { username: "", country: "" },
    2: { username: "", country: "" },
  };

  const countries = document.querySelectorAll("input[name=countries]");

  const setupCountryListeners = (currentPlayerId) => {
    countries.forEach(
      (country) =>
        (country.onclick = (e) => {
          document
            .querySelectorAll(".input-group.active")
            .forEach((all) => all.classList.remove("active"));
          country.parentElement.classList.toggle("active");

          // Dapatkan input country dari player yang aktif
          const activeInputCountry = document.getElementById(
            `input-country-${currentPlayerId}`
          );
          activeInputCountry.value = e.target.value.toString();
          playerInputState[currentPlayerId].country = activeInputCountry.value;

          // Periksa input untuk player aktif
          checkInput(currentPlayerId);
        })
    );
  };

  function checkInput(playerId) {
    const btnSave = document.getElementById(`btn-save-${playerId}`);
    console.log(
      `Player ${playerId}: ${playerInputState[playerId].username} ${playerInputState[playerId].country}`
    );

    if (
      playerInputState[playerId].username !== "" &&
      playerInputState[playerId].country !== ""
    ) {
      btnSave.classList.remove("disabled");
      return true;
    }
    btnSave.classList.add("disabled");
    return false;
  }

  function playerInput(playerId) {
    const btnSave = document.getElementById(`btn-save-${playerId}`),
      inputUsername = document.getElementById(`input-username-${playerId}`);

    inputUsername.oninput = (e) => {
      playerInputState[playerId].username = e.target.value;
      checkInput(playerId);
    };

    btnSave.onclick = () => {
      console.log("Saving data for Player " + playerId);
      if (checkInput(playerId)) {
        // Simpan data ke objek data
        if (playerId === 1) {
          player1Data.username = playerInputState[playerId].username;
          player1Data.country = playerInputState[playerId].country;

          // Nonaktifkan form Player 1 dan aktifkan form Player 2
          disablePlayerInput(1);
          enablePlayerInput(2);
          activePlayer = 2; // Ubah pemain aktif ke Player 2

          const inputForm = document.querySelectorAll(".input-player");
          inputForm[1].classList.remove("hidden");

          // Update country listener untuk player 2
          setupCountryListeners(2);
        } else {
          player2Data.username = playerInputState[playerId].username;
          player2Data.country = playerInputState[playerId].country;

          disablePlayerInput(2);
          // Simpan data, kemudian lanjutkan
          selectLevel.classList.remove("hidden");
        }
      }
    };
  }

  function disablePlayerInput(playerId) {
    const inputUsername = document.getElementById(`input-username-${playerId}`);
    const inputCountry = document.getElementById(`input-country-${playerId}`);
    const btnSave = document.getElementById(`btn-save-${playerId}`);

    // Nonaktifkan input untuk pemain tertentu
    inputUsername.disabled = true;
    inputCountry.disabled = true;
    btnSave.classList.add("disabled"); // Nonaktifkan tombol
  }

  function enablePlayerInput(playerId) {
    const inputUsername = document.getElementById(`input-username-${playerId}`);
    const inputCountry = document.getElementById(`input-country-${playerId}`);
    const btnSave = document.getElementById(`btn-save-${playerId}`);

    // Reset nilai input untuk pemain yang baru diaktifkan
    inputUsername.value = playerInputState[playerId].username;
    inputCountry.value = playerInputState[playerId].country;

    // Aktifkan input untuk pemain tertentu
    inputUsername.disabled = false;
    inputCountry.disabled = false;

    // Tombol save hanya diaktifkan jika data valid
    if (
      playerInputState[playerId].username !== "" &&
      playerInputState[playerId].country !== ""
    ) {
      btnSave.classList.remove("disabled");
    }
  }

  selectLevel.oninput = (e) => {
    playerLevel = e.target.value;
    btnPlay.classList.toggle(
      "disabled",
      playerLevel === "" && playerBall === ""
    );
  };

  function chooseBall() {
    const balls = document.querySelectorAll("input[name=balls]");
    balls.forEach(
      (ball) =>
        (ball.onclick = (e) => {
          document
            .querySelectorAll(".input-group.active")
            .forEach((all) => all.classList.remove("active"));
          ball.parentElement.classList.toggle("active");
          playerBall = e.target.value;
          console.log(playerBall);
        })
    );
  }

  // Inisialisasi form untuk kedua pemain
  playerInput(1);
  playerInput(2);

  setupCountryListeners(1);

  disablePlayerInput(2);

  chooseBall();

  btnPlay.onclick = () => {
    if (player1Data && player2Data && playerLevel !== "" && playerBall !== "") {
      // initGameplay();
      showCountdown(() => {
        clearActiveScreen("gameplay");
        initGameplay();
      });
    } else {
      alert("Choose Level and Choose Ball (By click ball image)");
    }
  };
}

// Fungsi untuk memuat gambar dengan Promise (menggunakan encodeURI untuk menangani spasi)
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      console.log(
        `Image loaded: ${src} (w:${img.naturalWidth} h:${img.naturalHeight})`
      );
      resolve(img);
    };
    img.onerror = () => {
      console.error(`Error loading image: ${src}`);
      reject(new Error("Gagal memuat gambar: " + src));
    };
    img.src = encodeURI(src);
  });
}

function initGameplay() {
  const canvas = document.getElementById("gameplay-canvas"),
    ctx = canvas.getContext("2d"),
    canvasH = canvas.height,
    canvasW = canvas.width;

  // ---------------------------
  // 1. DEFINISI OBJEK IMAGE
  // ---------------------------
  const images = {
    // Asset umum
    Goal: new Image(),
    Ball: new Image(),
    IncreaseBall: new Image(),
    DecreaseBall: new Image(),
    DiamondIce: new Image(),
    // Sprite karakter untuk masing-masing pemain (hanya animasi idle)
    // Sprite karakter untuk masing-masing pemain dengan berbagai aksi
    player1: {
      idle: [],
      jump: [],
      kick: [],
      moveBackward: [],
      moveForward: [],
      fallingDown: [],
    },
    player2: {
      idle: [],
      jump: [],
      kick: [],
      moveBackward: [],
      moveForward: [],
      fallingDown: [],
    },
  };

  // Objek Pemain 1 (posisi di sisi kiri)
  const player1 = {
    x: 100,
    y: canvas.height - 120, // misalnya 120px dari atas dasar canvas
    width: 150,
    height: 150,
    velocityX: 0,
    velocityY: 0,
    state: "idle", // state: "idle", "move", "jump", "kick", dll.
    score: 0,
  };

  // Objek Pemain 2 (posisi di sisi kanan)
  const player2 = {
    x: canvas.width - 150, // misalnya 150px dari tepi kanan
    y: canvas.height - 120,
    width: 150,
    height: 150,
    velocityX: 0,
    velocityY: 0,
    state: "idle",
    score: 0,
  };

  // Tambahkan properti untuk menyimpan indeks frame dan timer animasi
  player1.frameIndex = 0;
  player1.frameTimer = 0;
  player2.frameIndex = 0;
  player2.frameTimer = 0;

  // Objek Bola
  const ball = {
    x: canvas.width / 2,
    y: 50, // Mulai dari atas
    radius: 25, // Gunakan radius (atau bisa dikonversi ke width/height jika pakai sprite persegi)
    velocityX: 0,
    velocityY: 0,
    isFrozen: false, // Status untuk efek beku
    freezeTimer: 0,
  };

  // Array Items untuk menampung item yang muncul setiap 5 detik
  // Setiap item memiliki properti: type, x, y, width, height, active
  let items = [];
  // Contoh penambahan item:
  // items.push({ type: "increase", x: 300, y: 0, width: 30, height: 30, active: true });

  // Variabel Score (jika diperlukan, selain score di masing-masing player)
  let scorePlayer1 = 0;
  let scorePlayer2 = 0;

  // ---------------------------
  // 2. SET PATH UNTUK SETIAP ASSET
  // ---------------------------
  // Asset umum
  images.Goal.src = "./Sprites/Goal - Side.png";
  images.Ball.src = "./Sprites/Ball 01.png";
  images.IncreaseBall.src = "./Sprites/Increase Ball.png";
  images.DecreaseBall.src = "./Sprites/Decrease Ball.png";
  images.DiamondIce.src = "./Sprites/Diamond Ice.png";

  // Mapping negara ke folder karakter
  const countryToFolder = {
    Brazil: "Character 01 - Brazil",
    England: "Character 02 - England",
    Spain: "Character 03 - Spain",
    Japan: "Character 04 - Japan",
    Netherlands: "Character 05 - Netherlands",
    Portugal: "Character 06 - Portugal",
    Germany: "Character 07 - Germany",
    Italy: "Character 08 - Italy",
  };

  const user1Country = "Brazil";
  const user2Country = "England";

  // Fungsi untuk generate frame animasi untuk suatu aksi
  function generateFramesForAction(country, action, frameCount, targetArray) {
    const folder = countryToFolder[country];
    if (!folder) {
      console.error("Negara tidak dikenali:", country);
      return;
    }
    for (let i = 0; i < frameCount; i++) {
      const frameNum = i.toString().padStart(3, "0");
      const img = new Image();
      // Misalnya, untuk aksi "Jump" path-nya: ./Sprites/Characters/<folder>/Jump/Jump_000.png
      img.src = `./Sprites/Characters/${folder}/${action}/${action}_${frameNum}.png`;
      targetArray.push(img);
    }
  }

  // Contoh penggunaan untuk player1
  generateFramesForAction(user1Country, "Idle", 18, images.player1.idle);
  generateFramesForAction(user1Country, "Jump", 5, images.player1.jump);
  generateFramesForAction(user1Country, "Kick", 9, images.player1.kick);
  generateFramesForAction(
    user1Country,
    "Move Backward",
    10,
    images.player1.moveBackward
  );
  generateFramesForAction(
    user1Country,
    "Move Forward",
    10,
    images.player1.moveForward
  );
  generateFramesForAction(
    user1Country,
    "Falling Down",
    5,
    images.player1.fallingDown
  );

  // Lakukan hal yang sama untuk player2 jika diperlukan
  generateFramesForAction(user2Country, "Idle", 18, images.player2.idle);
  generateFramesForAction(user2Country, "Jump", 5, images.player2.jump);
  generateFramesForAction(user2Country, "Kick", 9, images.player2.kick);
  generateFramesForAction(
    user2Country,
    "Move Backward",
    10,
    images.player2.moveBackward
  );
  generateFramesForAction(
    user2Country,
    "Move Forward",
    10,
    images.player2.moveForward
  );
  generateFramesForAction(
    user2Country,
    "Falling Down",
    5,
    images.player2.fallingDown
  );

  // ---------------------------
  // 3. PENGAMBILAN GAMBAR MENGGUNAKAN ONLOAD
  // ---------------------------
  function fetchImages() {
    // Tidak perlu fungsi fetchImages() terpisah jika kita hanya meng-set src di atas.
    // Namun, bila diinginkan bisa menambahkan logika khusus di sini.
    // Misalnya, jika Anda ingin log atau memodifikasi src.
    // Contoh:
    // images.Goal.src = encodeURI("./Sprites/Goal - Side.png");
    // dst.
  }

  // Fungsi untuk memastikan semua gambar telah termuat menggunakan onload
  function loadAllImages() {
    const promiseArray = [];

    // Fungsi bantu: push promise untuk sebuah image
    function pushImagePromise(img) {
      promiseArray.push(
        new Promise((resolve) => {
          // Jika gambar sudah termuat (misalnya naturalWidth > 0), langsung resolve
          if (img.complete && img.naturalWidth !== 0) {
            resolve();
          } else {
            img.onload = resolve;
          }
        })
      );
    }

    // Asset tunggal
    pushImagePromise(images.Goal);
    pushImagePromise(images.Ball);
    pushImagePromise(images.IncreaseBall);
    pushImagePromise(images.DecreaseBall);
    pushImagePromise(images.DiamondIce);

    // Untuk animasi karakter player1
    images.player1.idle.forEach((img) => pushImagePromise(img));
    // Untuk animasi karakter player2
    images.player2.idle.forEach((img) => pushImagePromise(img));

    return Promise.all(promiseArray);
  }

  function getPlayerFrame(player, animSet, deltaTime) {
    // Pilih array frame sesuai state pemain; fallback ke idle jika state tidak ada
    const frames = animSet[player.state] || animSet.idle;
    if (!frames || frames.length === 0) return null;

    // Tentukan durasi tiap frame (misalnya 100ms)
    const frameDuration = 100;

    // Tambahkan deltaTime ke timer animasi pemain
    player.frameTimer += deltaTime;

    // Jika waktu cukup, perbarui frame index
    if (player.frameTimer >= frameDuration) {
      player.frameIndex = (player.frameIndex + 1) % frames.length;
      player.frameTimer = 0;
    }

    return frames[player.frameIndex];
  }

  // ---------------------------
  // 4. RENDER DAN GAME LOOP
  // ---------------------------
  function render() {
    // Gambar gawang: di sisi kiri dan kanan
    const goalHeight = 200;
    const yPosition = canvas.height - goalHeight - 40; // 20px dari bawah
    const xPosition = 50;

    // Gambar bola: menggunakan properti ball.x dan ball.y
    const ballSize = ball.radius * 2; // Ukuran bola berdasarkan radius
    ctx.drawImage(
      images.Ball,
      ball.x - ball.radius, // agar pusat gambar sesuai dengan ball.x
      ball.y - ball.radius, // agar pusat gambar sesuai dengan ball.y
      ballSize,
      ballSize
    );

    ctx.drawImage(images.Goal, xPosition, yPosition, 80, goalHeight);
    // Gambar gawang di sisi kanan dengan flip horizontal
    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(images.Goal, xPosition, yPosition, 80, goalHeight);
    ctx.restore();
  }

  // Tambahkan properti onGround untuk memeriksa apakah pemain sudah menyentuh tanah
  player1.onGround = true;
  player2.onGround = true;

  document.addEventListener("keydown", function (e) {
    switch (e.code) {
      // Pemain 1
      case "KeyA": // Gerak ke kiri
        player1.velocityX = -5;
        player1.state = "moveBackward";
        break;
      case "KeyD": // Gerak ke kanan
        player1.velocityX = 1;
        player1.state = "moveForward";
        break;
      case "KeyW": // Lompat
        if (player1.onGround) {
          player1.velocityY = -10;
          player1.state = "jump";
          player1.onGround = false;
        }
        break;
      case "Space": // Tendang bola
        player1.state = "kick";
        // Logika tendang bola akan diimplementasikan di sini
        break;

      // Pemain 2
      case "ArrowLeft": // Gerak ke kiri
        player2.velocityX = -5;
        player2.state = "moveBackward";
        break;
      case "ArrowRight": // Gerak ke kanan
        player2.velocityX = 5;
        player2.state = "moveForward";
        break;
      case "ArrowUp": // Lompat
        if (player2.onGround) {
          player2.velocityY = -10;
          player2.state = "jump";
          player2.onGround = false;
        }
        break;
      case "Enter": // Tendang bola
        player2.state = "kick";
        // Logika tendang bola akan diimplementasikan di sini
        break;
    }
  });

  document.addEventListener("keyup", function (e) {
    switch (e.code) {
      // Jika tombol horizontal dilepas, set ke idle
      case "KeyA":
      case "KeyD":
        player1.velocityX = 0;
        if (player1.state !== "jump" && player1.state !== "kick") {
          player1.state = "idle";
        }
        break;
      case "ArrowLeft":
      case "ArrowRight":
        player2.velocityX = 0;
        if (player2.state !== "jump" && player2.state !== "kick") {
          player2.state = "idle";
        }
        break;
    }
  });

  // Tambahkan properti onGround untuk memeriksa apakah pemain sudah menyentuh tanah
  player1.onGround = true;
  player2.onGround = true;

  document.addEventListener("keydown", function (e) {
    switch (e.code) {
      // Pemain 1
      case "KeyA": // Gerak ke kiri
        player1.velocityX = -5;
        player1.state = "moveBackward";
        break;
      case "KeyD": // Gerak ke kanan
        player1.velocityX = 5;
        player1.state = "moveForward";
        break;
      case "KeyW": // Lompat
        if (player1.onGround) {
          player1.velocityY = -10;
          player1.state = "jump";
          player1.onGround = false;
        }
        break;
      case "Space": // Tendang bola
        player1.state = "kick";
        // Logika tendang bola akan diimplementasikan di sini
        break;

      // Pemain 2
      case "ArrowLeft": // Gerak ke kiri
        player2.velocityX = -5;
        player2.state = "moveBackward";
        break;
      case "ArrowRight": // Gerak ke kanan
        player2.velocityX = 5;
        player2.state = "moveForward";
        break;
      case "ArrowUp": // Lompat
        if (player2.onGround) {
          player2.velocityY = -10;
          player2.state = "jump";
          player2.onGround = false;
        }
        break;
      case "Enter": // Tendang bola
        player2.state = "kick";
        // Logika tendang bola akan diimplementasikan di sini
        break;
    }
  });

  document.addEventListener("keyup", function (e) {
    switch (e.code) {
      // Jika tombol horizontal dilepas, set ke idle
      case "KeyA":
      case "KeyD":
        player1.velocityX = 0;
        if (player1.state !== "jump" && player1.state !== "kick") {
          player1.state = "idle";
        }
        break;
      case "ArrowLeft":
      case "ArrowRight":
        player2.velocityX = 0;
        if (player2.state !== "jump" && player2.state !== "kick") {
          player2.state = "idle";
        }
        break;
    }
  });

  function updatePositions() {
    const gravity = 0.5;

    // Update posisi pemain 1
    player1.x += player1.velocityX;
    player1.y += player1.velocityY;
    if (!player1.onGround) {
      player1.velocityY += gravity;
    }
    // Batasi agar tidak jatuh ke bawah
    if (player1.y + player1.height >= canvas.height - 20) {
      player1.y = canvas.height - player1.height - 20;
      player1.velocityY = 0;
      player1.onGround = true;
      if (player1.state === "jump") player1.state = "idle";
    }

    // Update posisi pemain 2
    player2.x += player2.velocityX;
    player2.y += player2.velocityY;
    if (!player2.onGround) {
      player2.velocityY += gravity;
    }
    if (player2.y + player2.height >= canvas.height - 20) {
      player2.y = canvas.height - player2.height - 20;
      player2.velocityY = 0;
      player2.onGround = true;
      if (player2.state === "jump") player2.state = "idle";
    }

    // Update posisi bola
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    // Sederhana: tambahkan gravitasi pada bola dan bounce dari dasar
    if (ball.y + ball.radius >= canvas.height - 20) {
      ball.y = canvas.height - ball.radius - 20;
      ball.velocityY = -ball.velocityY * 0.7; // Efek pantulan
    } else {
      ball.velocityY += gravity;
    }

    // Clamp posisi horizontal pemain agar tidak keluar dari area lapangan
    if (player1.x < 0) {
      player1.x = 0;
    } else if (player1.x + player1.width > canvas.width) {
      player1.x = canvas.width - player1.width;
    }

    if (player2.x < 0) {
      player2.x = 0;
    } else if (player2.x + player2.width > canvas.width) {
      player2.x = canvas.width - player2.width;
    }
  }

  function updateCharacters() {
    // Misalnya, di dalam render() atau gameLoop():
    const deltaTime = 16; // Contoh: 16ms per frame (60 fps)
    const framePlayer1 = getPlayerFrame(player1, images.player1, deltaTime);
    const framePlayer2 = getPlayerFrame(player2, images.player2, deltaTime);

    if (framePlayer1) {
      ctx.drawImage(
        framePlayer1,
        player1.x,
        player1.y,
        player1.width,
        player1.height
      );
    }

    if (framePlayer2) {
      ctx.save();
      ctx.translate(player2.x + player2.width, player2.y);
      ctx.scale(-1, 1);
      ctx.drawImage(
        framePlayer2, // gunakan framePlayer2, bukan images.player2.idle[0]
        100,
        0,
        player2.width,
        player2.height
      );
      ctx.restore();
    }
  }

  // Fungsi untuk memeriksa apakah bola telah melewati garis gawang
  function checkGoal() {
    const goalWidth = 80; // lebar gawang
    const goalHeight = 200;
    const yPosition = canvas.height - goalHeight - 40;

    // Cek gol untuk sisi kiri:
    // Jika bola menyentuh area gawang kiri secara horizontal dan
    // pusat bola (atau seluruh bola) berada di antara yPosition dan yPosition + goalHeight.
    if (
      ball.x - ball.radius < goalWidth &&
      ball.y + ball.radius > yPosition &&
      ball.y - ball.radius < yPosition + goalHeight
    ) {
      scorePlayer2++;
      console.log(
        "Goal! Player 2 scores. Score:",
        scorePlayer1,
        "-",
        scorePlayer2
      );
      respawnBall();
    }
    // Cek gol untuk sisi kanan:
    else if (
      ball.x + ball.radius > canvas.width - goalWidth &&
      ball.y + ball.radius > yPosition &&
      ball.y - ball.radius < yPosition + goalHeight
    ) {
      scorePlayer1++;
      console.log(
        "Goal! Player 1 scores. Score:",
        scorePlayer1,
        "-",
        scorePlayer2
      );
      respawnBall();
    }
  }

  // Fungsi untuk mereset posisi bola setelah gol
  function respawnBall() {
    ball.x = canvas.width / 2;
    ball.y = 0; // Muncul kembali dari atas
    ball.velocityX = 0;
    ball.velocityY = 5; // Beri kecepatan jatuh
    ball.isFrozen = false;
    ball.freezeTimer = 0;
    console.log("Ball respawned at the top center.");
  }

  // Fungsi untuk mereset posisi bola setelah gol
  // function respawnBall() {
  //   ball.x = canvas.width / 2;
  //   ball.y = 0; // Muncul kembali dari atas
  //   ball.velocityX = 0;
  //   ball.velocityY = 5; // Beri kecepatan jatuh
  //   ball.isFrozen = false;
  //   ball.freezeTimer = 0;
  //   console.log("Ball respawned at the top center.");
  // }

  // 1. Tambahkan sedikit friction & inertia agar bola tidak hanya memantul naik-turun.
  const friction = 0.95; // Semakin mendekati 1, semakin lama bola meluncur

  function updateBall() {
    checkGoal();

    // Pergerakan bola dasar
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Misalkan kita sudah definisikan:
    const goalWidth = 80; // lebar gawang
    const goalHeight = 200;
    const yPosition = canvas.height - goalHeight - 40;

    if (ball.x - ball.radius < goalWidth && ball.y + ball.radius > yPosition) {
      ball.x = goalWidth + ball.radius;
      // Beri sedikit pantulan atau peredam
      ball.velocityX = -ball.velocityX * 0.3;
    }

    // Jika bola sudah di bawah gawang kanan (y>yPosition) dan x > canvas.width - goalWidth
    if (
      ball.x + ball.radius > canvas.width - goalWidth &&
      ball.y + ball.radius > yPosition
    ) {
      ball.x = canvas.width - goalWidth - ball.radius;
      ball.velocityX = -ball.velocityX * 0.3;
    }

    // Terapkan gravitasi
    const gravity = 0.5;
    ball.velocityY += gravity;

    // Terapkan friction pada sumbu X agar bola tidak memantul horizontal selamanya
    ball.velocityX *= friction;

    // Pantulan dengan lantai
    if (ball.y + ball.radius >= canvas.height - 20) {
      ball.y = canvas.height - ball.radius - 20;
      // Koefisien restitusi (0.7), membuat pantulan berkurang
      ball.velocityY = -ball.velocityY * 0.7;
    }

    // Pantulan dengan tembok kiri dan kanan
    if (ball.x - ball.radius < 0) {
      ball.x = ball.radius;
      ball.velocityX = -ball.velocityX * 0.8; // kurangi sedikit agar pantulan horizontal berkurang
    } else if (ball.x + ball.radius > canvas.width) {
      ball.x = canvas.width - ball.radius;
      ball.velocityX = -ball.velocityX * 0.8;
    }

    // Deteksi collision bola dengan pemain (bounding box sederhana)
    function isColliding(ball, player) {
      const distX = Math.abs(ball.x - (player.x + player.width / 2));
      const distY = Math.abs(ball.y - (player.y + player.height / 2));
      if (distX > player.width / 2 + ball.radius) return false;
      if (distY > player.height / 2 + ball.radius) return false;
      return true;
    }

    // Fungsi bantu untuk "mendorong" bola ke arah tertentu
    // Ganti bagian "pushBall" di dalam updateBall:
    // Fungsi bantu untuk "mendorong" bola ke arah tertentu (kurangi nilai dorongan)
    function pushBall(ball, player) {
      const centerPlayer = player.x + player.width / 2;
      if (ball.x < centerPlayer) {
        ball.velocityX = -Math.abs(ball.velocityX) - 0.5;
      } else {
        ball.velocityX = Math.abs(ball.velocityX) + 0.5;
      }
      ball.velocityY = -Math.abs(ball.velocityY) - 0.5;
      if (player.velocityX !== 0) {
        ball.velocityX += player.velocityX * 0.2;
      }
    }

    // Pada saat pemain "kick", kurangi tambahan kecepatan
    // Pada saat pemain "kick", kurangi tambahan kecepatan (turunkan sensitivitas)
    if (player1.state === "kick") {
      ball.velocityX += ball.velocityX > 0 ? 0.5 : -0.5;
      ball.velocityY -= 0.25;
    }

    if (player2.state === "kick") {
      ball.velocityX += ball.velocityX > 0 ? 0.5 : -0.5;
      ball.velocityY -= 0.25;
    }

    // Pantulan dengan karakter pemain 1
    if (isColliding(ball, player1)) {
      pushBall(ball, player1);
      // Jika pemain 1 sedang menendang, tambahkan kekuatan ekstra
      if (player1.state === "kick") {
        ball.velocityX += ball.velocityX > 0 ? 2 : -2;
        ball.velocityY -= 1;
      }
    }

    // Pantulan dengan karakter pemain 2
    if (isColliding(ball, player2)) {
      pushBall(ball, player2);
      // Jika pemain 2 sedang menendang, tambahkan kekuatan ekstra
      if (player2.state === "kick") {
        ball.velocityX += ball.velocityX > 0 ? 2 : -2;
        ball.velocityY -= 1;
      }
    }
  }

  // Variabel global untuk penjadwalan item
  let gameTime = 0; // Waktu total permainan (dalam ms)
  let lastItemSpawnTime = 0; // Waktu saat item terakhir di-spawn

  // Fungsi untuk spawn item secara acak
  function spawnItem() {
    const types = ["increase", "decrease", "diamond"];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const newItem = {
      type: randomType,
      x: Math.random() * (canvas.width - 30), // x acak, asumsikan item width = 30
      y: 0, // Mulai dari atas
      width: 30,
      height: 30,
      active: true,
    };
    items.push(newItem);
  }

  // Fungsi sederhana untuk mendeteksi collision antara bola dan item (bounding box)
  function isCollidingItem(ball, item) {
    const distX = Math.abs(ball.x - (item.x + item.width / 2));
    const distY = Math.abs(ball.y - (item.y + item.height / 2));
    if (distX > item.width / 2 + ball.radius) return false;
    if (distY > item.height / 2 + ball.radius) return false;
    return true;
  }

  // Fungsi untuk meng-update posisi item dan memeriksa collision dengan bola
  function updateItems(deltaTime) {
    // Pastikan deltaTime adalah angka
    deltaTime = Number(deltaTime) || 0;

    // Akumulasi waktu (dalam ms)
    gameTime += deltaTime;

    // Spawn item setiap 5 detik (5000 ms)
    if (gameTime - lastItemSpawnTime >= 5000) {
      spawnItem();
      lastItemSpawnTime = gameTime;
    }

    const dt = deltaTime / 1000; // konversi ms ke detik

    // Loop untuk setiap item
    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      // Pergerakan item: misal, jatuh dengan kecepatan 50 px/detik
      item.y += 50 * dt;

      // Deteksi collision antara bola dan item
      if (isCollidingItem(ball, item)) {
        // Terapkan efek berdasarkan tipe item
        if (item.type === "increase") {
          ball.radius += 5; // Bola membesar
        } else if (item.type === "decrease") {
          ball.radius = Math.max(10, ball.radius - 5); // Bola mengecil, minimal radius 10
        } else if (item.type === "diamond") {
          ball.isFrozen = true;
          ball.freezeTimer = 3000; // Bekukan bola selama 3 detik
          ball.velocityX = 0;
          ball.velocityY = 0;
        }
        // Hapus item setelah collision
        items.splice(i, 1);
        continue; // lanjutkan ke item selanjutnya
      }

      // Hapus item jika sudah keluar dari layar
      if (item.y > canvas.height) {
        items.splice(i, 1);
      }
    }
  }

  // Fungsi untuk menggambar item ke canvas
  function renderItems() {
    items.forEach((item) => {
      let img;
      if (item.type === "increase") {
        img = images.IncreaseBall;
      } else if (item.type === "decrease") {
        img = images.DecreaseBall;
      } else if (item.type === "diamond") {
        img = images.DiamondIce;
      }
      if (img) {
        ctx.drawImage(img, item.x, item.y, item.width, item.height);
      }
    });
  }

  // Tambahkan variabel global untuk pause dan reset
  let paused = false;

  // Event listener untuk pause/resume (P) dan reset (R)
  document.addEventListener("keydown", (e) => {
    if (e.code === "KeyP") {
      paused = !paused;
      console.log(paused ? "Game Paused" : "Game Resumed");
    }
    if (e.code === "KeyR") {
      resetGame();
      console.log("Game Reset");
    }
  });

  // Fungsi untuk reset game (posisi pemain, bola, item, skor)
  function resetGame() {
    // Reset posisi pemain 1
    player1.x = 100;
    player1.y = canvas.height - player1.height - 20;
    player1.velocityX = 0;
    player1.velocityY = 0;
    player1.state = "idle";

    // Reset posisi pemain 2
    player2.x = canvas.width - player2.width - 100;
    player2.y = canvas.height - player2.height - 20;
    player2.velocityX = 0;
    player2.velocityY = 0;
    player2.state = "idle";

    // Reset bola
    ball.x = canvas.width / 2;
    ball.y = 0; // Muncul dari atas
    ball.velocityX = 0;
    ball.velocityY = 5; // Kecepatan jatuh awal
    ball.isFrozen = false;
    ball.freezeTimer = 0;

    // Reset item dan skor
    items = [];
    scorePlayer1 = 0;
    scorePlayer2 = 0;
  }

  // Revisi gameLoop dengan fitur pause/resume
  let lastTime = performance.now();
  function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!paused) {
      updatePositions();
      updateCharacters();
      updateBall();
      updateItems(deltaTime);
    } else {
      // Tampilkan overlay pause
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      ctx.font = "48px sans-serif";
      ctx.fillText("Paused", canvas.width / 2 - 80, canvas.height / 2);
    }

    render();
    renderItems();

    requestAnimationFrame(gameLoop);
  }
  // ---------------------------
  // 5. INISIALISASI GAME
  // ---------------------------
  fetchImages(); // Opsional, jika ingin memodifikasi src lebih lanjut

  loadAllImages()
    .then(() => {
      console.log("Semua gambar telah termuat. Mulai game.");
      gameLoop();
    })
    .catch((error) => {
      console.error("Error loading images:", error);
    });
}

initGameplay();

function showCountdown(callback) {
  let count = 3,
    countdown = document.getElementById("count");

  countdown.textContent = count;

  const countdownInterval = setInterval(() => {
    count--;

    if (count === 0) {
      countdown.textContent = "GO !";
      clearInterval(countdownInterval);
      callback();
      return;
    }

    countdown.textContent = count;
  }, 1000);
}
