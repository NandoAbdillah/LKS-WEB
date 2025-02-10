document.addEventListener("DOMContentLoaded", () => {
  // Objek Tanaman
  // Mendeklaraikan Tanman yang memilki anak banyak tanaman
  class Plant {
    constructor(name, cost, health, damage = null) {
      this.name = name;
      this.cost = cost;
      this.health = health;
      this.damage = damage;
      this.position = null;
      this.block = null;

      // For Image
      this.image = null;
      this.totalFrame = 0;
      this.frame = 0;
      this.frameRate = 0.12;
      this.blockElement = null;
      this.paddedFrame = null;
      this.plantAnimationInterval = null;

      // Untuk Animasi Tembakan
      this.shootImage = null;
      this.shootImagePath = null;
      this.shootAnimationInterval = null;
      this.shootPosition = -5;
      this.shootSpeed = 0.5;

      this.livePosition = null;
      this.shootOff = null;

      this.zombieObj = null;
    }

    setPlantImageAttribut(totalFrame, frameRate, blockElement) {
      this.totalFrame = totalFrame;
      this.frameRate = frameRate;
      this.blockElement = blockElement;

      // console.log(
      //   this.totalFrame + " " + this.frameRate + " " + this.blockElement
      // );

      // this.blockElement.style.background = 'green';
      // this.blockElement.classList.add('.plant-render-fixer');
    }

    setShootAttribute(shootImagePath) {
      this.shootImagePath = shootImagePath;
    }

    setShoot(initial = null) {
      this.shootImage = document.createElement("img");
      this.shootImage.src = this.shootImagePath;
      if (initial === "SUN") {
        this.shootImage.classList.add("sun");
      } else {
        this.shootImage.classList.add("shooter");
      }
      this.blockElement.appendChild(this.shootImage);
    }

    animateShoot(zombieObj) {
      this.zombieObj = zombieObj;
      this.shootOff = zombieObj.getZombiePosition();
      console.log(this.shootOff);
      // console.log(this.block);

      this.shootAnimationInterval = setInterval(
        this.moveShoot.bind(this),
        this.shootSpeed
      );
    }

    stopAnimateShoot() {
      clearInterval(this.shootAnimationInterval);
      this.shootAnimationInterval = null;
      this.livePosition = null;
      this.shootPosition = null;
      this.shootSpeed = 0.5;
      this.blockElement.removeChild(this.blockElement.firstElementChild);
    }

    moveShoot() {
      this.livePosition = this.shootPosition - this.shootSpeed;
      this.shootImage.style.right = `${this.livePosition}px`;
      console.log(this.livePosition);

      if (this.livePosition * -1 > this.shootOff) {
        this.hitZombie();
        this.stopAnimateShoot();
        this.blockElement.appendChild(this.shootImage);

        this.animateShoot();
      }
      this.shootSpeed += 2;
      // if(this.shootOff  )
    }

    hitZombie() {
      console.log("Zombie is hit");

      this.zombieObj.takeDamage(1, this);
    }

    stopHit() {
      console.log("Stop Hit");
      console.log(zombieList);
      console.log(zombieLaneList);
      console.log(blockArray);
      console.log(this);
      zombieList.shift();
      this.stopAnimateShoot();
    }

    // takeDamage(damage) {
    //   this.health -= damage;
    //   if (this.health <= 0) {
    //     this.destroy();
    //   }
    // }

    destroy() {
      console.log(`${this.name} has been destroyed`);
    }

    createPlantAnimation() {
      // this.image = `./media/Sprites/${this.name}`;
      this.plantAnimationInterval = setInterval(
        this.updateFrame.bind(this),
        this.frameRate * 1000
      );
    }

    updateFrame() {
      this.paddedFrame = String(this.frame).padStart(2, 0);
      this.blockElement.style.background = `url('./media/Sprites/${this.name}/frame_${this.paddedFrame}_delay-${this.frameRate}s.gif')`;
      this.blockElement.style.backgroundSize = "95% 95%";
      this.blockElement.style.backgroundRepeat = "no-repeat";

      this.frame = (this.frame + 1) % this.totalFrame;
    }
  }

  class Sunflower extends Plant {
    constructor() {
      super("SunFlower", 50, 5);
      this.name = "Sunflower";
      this.sunProduce = 25;
      // Matahari akan keluar setiap 3 detik
    }

    // produceSun() {
    //   // Menyetel sun yang ada
    //   super.setShootAttribute(this.sunImagePath);
    //   super.setShoot();
    // }

    produceSun(sun, sunImagePath) {
      super.setShootAttribute(sunImagePath);
      super.setShoot("SUN");
    }

    setSunflower(element) {
      super.setPlantImageAttribut(24, 0.06, element);
    }

    getElement() {
      return this.blockElement;
    }
  }

  class Sun extends Sunflower {
    constructor() {
      super();
      this.sunValue = 50;
      this.timeSunSpawn = 3000;
      this.sunImagePath = "./media/Sprites/General/Sun.png";
      this.sunPosition = null;
    }

    generateSun() {
      super.setSun(this.sunImagePath);
    }

    setSunPosition(element) {
      this.sunPosition = element;
    }

    getSunPosition() {
      return this.sunPosition;
    }
  }

  class Wallnut extends Plant {
    constructor() {
      super("WallNut", 50, 20);
      this.name = "WallNut";
    }

    takeDamage(damage) {
      super.takeDamage(damage);
    }

    setWallNut(element) {
      super.setPlantImageAttribut(32, 0.12, element);
    }
  }

  class Pea extends Plant {
    constructor() {
      super("PeaShooter", 100, 5);

      this.name = "PeaShooter";
      this.peaShootImage = "./media/Sprites/General/Pea.png";
      this.shootAnimationInterval = null;
      this.shootPosition = -5;
      this.shootSpeed = 2;
    }

    takeDamage(damage) {
      super.takeDamage(damage);
    }

    shoot(zombieObj) {
      // Parameternya merupakan objek
      // zombie.takeDamage(this.damage); // Serang jumbi
      // Membuat efek shoot

      // this.shootAnimationInterval = setInterval(() => {
      //   this.setSoot();
      // }, this.frameRate * 5000);

      super.setShootAttribute(this.peaShootImage);
      super.setShoot();
      super.animateShoot(zombieObj);

      // this.setSoot();

      // this.animateShoot();
      // requestAnimationFrame(this.shoot);
    }

    setPea(element) {
      super.setPlantImageAttribut(30, 0.12, element);
    }
  }

  class IcePea extends Plant {
    constructor() {
      super("IcePea", 175, 5);
      this.name = "IcePea";
      this.damage = 2;
      this.slowEffect = true;
      this.icePeaShootImage = "./media/Sprites/General/IcePea.png";
    }

    shoot(zombie) {
      // zombie.takeDamage(this.damage);
      // if (this.slowEffect) {
      // Parameter objeksombie
      // }

      super.setShootAttribute(this.icePeaShootImage);
      super.setShoot();
      super.animateShoot();
    }

    setIcePea(element) {
      super.setPlantImageAttribut(31, 0.12, element);
    }
  }

  class Zombie {
    constructor(name, speed) {
      this.name = name;
      this.speed = speed;

      this.lanePosition = null;
      this.blockPosition = null;

      // For Image
      this.totalFrame = 33;
      this.frame = 0;
      this.frameRate = 0.05;
      this.blockElement = null;
      this.paddedFrame = null;
      this.zombieElement = null;
      this.zombieAnimationInterval = null;

      this.zombieMoveInterval = null;
      this.walk = 0.01;
      // Untuk px awal zombie muncul
      this.position = parseFloat(lanePlantWithZombieWidth);
      this.zombiePosition = null;
      this.positionPoint = null;
    }

    setLanePosition(position) {
      this.lanePosition = position;
      blockArray[this.lanePosition][7].setZombieHere(this);
    }

    getZombiePosition() {
      return this.zombiePosition;
    }

    setZombieELement(element) {
      this.zombieElement = element;
    }

    slowDown() {
      this.speed /= 2;
    }

    move() {
      this.zombieMoveInterval = setInterval(
        this.updateMove.bind(this),
        this.speed
      );
    }

    // updateBlockPosition() {}
    updateMove() {
      this.zombieElement.style.right = `${this.walk}px`;
      this.walk += 0.01;
      // console.log(this.walk);
      this.updatePosition();
    }

    updatePosition() {
      // this.position = this.position - this.walk;

      // Kita mendapatkan posisi realtime untuk setiap zombi berjalan
      this.positionPoint =
        this.position - (this.walk + zombieLaneGridWidth + 90);
      // console.log(this.positionPoint);

      this.checkBox();
    }

    checkBox() {
      // blockArray.forEach((block) => {
      //     if(block.)
      // })

      // console.log(blockArray[this.lanePosition]);

      blockArray[this.lanePosition].forEach((block, index) => {
        this.zombiePosition = Math.floor(this.positionPoint);

        // console.log(block.coordinat + " " + this.zombiePosition);
        if (block.coordinat === this.zombiePosition) {
          if (block.isAvailable()) {
            this.stopMove(); // Hentikan jika ada tanaman di sini
          } else {
            blockArray[this.lanePosition][7].setZombieHere(null);

            // console.log("Posisi ada di block", block);
            this.blockPosition = block;
            block.setZombieHere(this); // Set zombie pada block
            blockArray[this.lanePosition][index + 1].setZombieHere(null);
          }
        }
      });
    }

    stopMove() {
      // console.log('Ada tanaman');
      clearInterval(this.zombieMoveInterval);
      this.zombieMoveInterval = null;
      // this.walk += 0;
    }

    die() {
      console.log("Zombie mati");
      // console.log(this.blockPosition);
      // console.log(this);
      // blockArray[this.lanePosition].forEach(())
      // console.log(blockArray);


      this.stopMove();
      // this.zombieElement = null;
      document
        .getElementById(`lane-${this.lanePosition + 1}`)
        .removeChild(this.zombieElement);
      // document.removeChild(this.zombieElement);
      // console.log(this.zombieElement);
      
      // this.blockPosition.setZombieHere = null;
    }

    isMove() {}

    createZombieAnimation() {
      this.zombieAnimationInterval = setInterval(
        this.updateFrame.bind(this),
        this.frameRate * 1000
      );
    }

    updateFrame() {
      this.paddedFrame = String(this.frame).padStart(2, 0);
      this.zombieElement.style.background = `url('./media/Sprites/Zombie/frame_${this.paddedFrame}_delay-${this.frameRate}s.gif')`;
      this.zombieElement.style.backgroundSize = "90% 90%";
      this.zombieElement.style.backgroundRepeat = "no-repeat";

      this.frame = (this.frame + 1) % this.totalFrame;
    }
  }

  class RegularZombie extends Zombie {
    constructor() {
      super("Regular", 2);
      this.health = 5;
    }

    setZombie(element) {
      super.setZombieELement(element);
    }

    takeDamage(damage, obj) {
      this.health -= damage;
      if (this.health <= 0) {
        this.die();
        obj.stopHit();
      }
    }

    die() {
      // alert(this.)
      super.die();
      console.log(this);
      
      blockArray.forEach(row => {
        row.forEach(block => {
          if (block.zombieHere === this) {
            block.setZombieHere(null);
          }
        })
      })
      // blockArray[this.lanePosition][7].setZombieHere(null);
    }
  }

  class Block {
    constructor(element, coordinat) {
      this.element = element;
      this.coordinat = coordinat;
      this.active = false;
      this.blockPlant = null;
      this.zombieHere = null;
    }

    isAvailable() {
      return this.active;
    }

    setZombieHere(objZombie) {
      this.zombieHere = objZombie;
    }

    getZombieHere() {
      return this.zombieHere;
    }

    setAvailable() {
      this.active = true;
    }

    dropPlant() {
      this.active = true;
      console.log("plant drop here " + this.coordinat);
    }

    getElement() {
      return this.element;
    }

    setBlockPlant(objPlant) {
      this.blockPlant = objPlant;
    }

    getBlockPlant() {
      return this.blockPlant;
    }
  }

  let plantsPicker,
    plantBlocks,
    // Panjang baris
    blockRow = 5,
    // Panjang kolom per baris
    blockCol = 8,
    blockArray,
    // Ini untuk batas kanan setiap block
    blockBorders = [85, 170, 255, 340, 425, 510, 595, 680],
    laneGrid,
    zombieLaneGrid,
    zombieLaneGridWidth,
    // Lane untuk melihat panjang grid tanaman saja
    laneGridWidth,
    // Lane untuk melihat panjang dari grid tanaman dan container zombie
    lanePlantWithZombie,
    lanePlantWithZombieWidth,
    userPickState = "none",
    userPlantPick = "none";

  let sunAmount = 50;

  // Variabel untuk tanaman
  let plantList = [];

  // Variabel untuk Matahari
  let sunFlowerList = [];

  // Variabel untuk zombie
  let zombieWidth;

  const renderGameplayLayout = () => {
    // Mengambil elemen slot tanaman classnya plant-slot
    plantsPicker = document.querySelectorAll(".plant-slot");
    // Mengambil elemen lane column yaitu untuk tempat grid untuk penempatan tnaman
    plantBlocks = document.querySelectorAll(".lane-column");

    // Mengambil elemen grid lane yaitu container yang menampung grid penempatan tanaman
    laneGrid = document.getElementsByClassName("lane-grid")[0];
    // Mengambil panjang grid lane  yang ditentukan oleh offset width elemen lane grid
    laneGridWidth = laneGrid.offsetWidth;

    // console.log(laneGridWidth);

    lanePlantWithZombie = document.getElementsByClassName("lane")[0];

    lanePlantWithZombieWidth = lanePlantWithZombie.offsetWidth;

    zombieLaneGrid = document.getElementsByClassName("zombie-lane")[0];
    zombieLaneGridWidth = zombieLaneGrid.offsetWidth;

    // Mendifinisikan array dengan panjang 5 baris
    blockArray = Array.from({ length: blockRow }, () =>
      // setiap array baru diisi dengan 0
      new Array(blockCol).fill(0)
    );

    // mendeklarasikan indeks kolom dan indeks baris
    let colIndex = 0,
      rowIndex = 0;

    // Memuat foreach untuk semua plantBlock ada 40 objek block
    //  Saya menggunakan pemetaan untuk setiap gridnya
    //  contoh  di lane pertama di grid ke 4 maka petanya adalah [0][3]
    plantBlocks.forEach((block) => {
      // jika colIndex lebih dari 7 ulangi colom ke 0
      if (colIndex > 7) {
        colIndex = 0;

        // kolom menajadi 0 , indeks di tambah 1
        rowIndex++;
      }
      // membuat objek block baru dan mengatur posisi block di grid lane
      blockArray[rowIndex][colIndex] = new Block(
        // Memberikan element grid htmlnya ke kelas
        block,
        // Mengatur koordinat element ini pakai perhitungan
        laneGridWidth - block.offsetWidth * (blockCol - (colIndex + 1))
      );
      // console.log(block.offsetWidth);

      // Kolom indeks menambah
      colIndex++;
    });

    // Mengiterasi untuk setiap baris lane
    blockArray.forEach((row, rowBlock) => {
      // Setiap baris lane kita mengiterasi gridnya
      row.forEach((block, colBlock) => {
        // block.isAvailable();
        // Kita mengambil elemen dari setiap objek blocknya
        const element = block.getElement();
        // Setiap elemen kita beri event ketika bloknya di klik
        element.addEventListener("click", () => {
          // element.style.background = "green";
          //   console.log(rowBlock, colBlock);
          //   block.isAvailable();

          // kita memanggil method dari objeknya untuk memeriksa apakah objek terisi tanaman atau tidak, jika tidak ada tanaman yang aktif atau kosong  maka tidak bisa menambhakan tanaman lagi
          if (!block.isAvailable()) {
            // Kita membuat objek tanaman baru dan menempatkan objek tanaman di blok yang dipilih
            dropPlanToBlock(element, block);
          } else {
            console.log("block is active");
            console.log(block.coordinat);
          }
        });
      });
    });

    // Event untuk memilih tanaman

    plantsPicker.forEach((plant) => {
      plant.addEventListener("click", () => {
        // plantsPicker.forEach((planty) => {
        // Ini berfungsi agar hanya ada 1 tanaman saja yang aktif
        //   if (planty.classList.contains("plant-active")) {
        //     planty.classList.remove("plant-active");
        //   }
        // });

        removeAllActivePlants();
        userPickState = "plant";
        plant.classList.add("plant-active");
        userPlantPick = plant.id;
      });
      // plant.addEventListener("mouseout", () => {
      //   plant.style.opacity = 1;
      // });
    });
  };

  const removeAllActivePlants = () => {
    // Ini berfungsi agar hanya ada 1 tanaman saja yang aktif
    plantsPicker.forEach((planty) => {
      if (planty.classList.contains("plant-active")) {
        planty.classList.remove("plant-active");
      }
    });
  };

  // elemen berisi elemen block yang akan diisi
  const dropPlanToBlock = (element, objBlock) => {
    // checkBlock();
    // Mengecek apakah ada tanaman yang dipilih oleh user saat ini
    if (
      userPickState === "plant" &&
      (userPlantPick !== "none") & (sunAmount > 0)
    ) {
      // Mengecek tanaman yang dipilih
      const plantName = userPlantPick.split("-")[1];
      console.log(plantName);

      // mengecek plant mana yang dipilih user lalu memutuskan objek mana yang harus di buat
      switch (plantName) {
        case "PeaShooter":
          const pea = new Pea();
          if (checkSunAmountAndPlantPrice(pea.cost)) {
            pea.setPea(element);
            pea.createPlantAnimation();
            // pea.shoot();

            objBlock.setBlockPlant(pea);
            plantList.push(pea);
          }

          break;

        case "IcePea":
          const icePea = new IcePea();

          if (checkSunAmountAndPlantPrice(icePea.cost)) {
            icePea.setIcePea(element);
            icePea.createPlantAnimation();
            icePea.shoot();

            objBlock.setBlockPlant(icePea);
            plantList.push(icePea);
          }

          break;

        case "WallNut":
          const wallNut = new Wallnut();

          if (checkSunAmountAndPlantPrice(wallNut.cost)) {
            wallNut.setWallNut(element);
            wallNut.createPlantAnimation();

            objBlock.setBlockPlant(wallNut);
            plantList.push(wallNut);
          }

          break;

        case "SunFlower":
          const sunFlower = new Sunflower();

          if (checkSunAmountAndPlantPrice(sunFlower.cost)) {
            console.log("ini harga matahari " + sunFlower.cost);

            sunFlower.setSunflower(element);
            sunFlower.createPlantAnimation();
            // sunFlower.produceSun();

            objBlock.setBlockPlant(sunFlower);
            plantList.push(sunFlower);
            sunFlowerList.push(sunFlower);

            if (sunFlowerList.length > 0) {
              randomSun();
            }
          }

          break;

        default:
          break;
      }

      objBlock.setAvailable();
      removeAllActivePlants();
      userPlantPick = "none";
    }
  };

  const checkSunAmountAndPlantPrice = (plantPrices) => {
    const result = sunAmount - plantPrices;

    // console.log(result);
    if (result < 0) {
      return false;
    }
    sunAmount -= plantPrices;
    sunAmountChange();
    return true;
  };

  let zombieLane = null;
  let zombieInterval = null;
  let zombieSpeed = 0.01;
  // const generateZombie = () => {
  //   zombieLane = document.getElementById('zombie-lane-1');

  //   zombieInterval = setInterval(()=> {
  //     zombieLane.style.right = `${zombieSpeed}px`
  //     zombieSpeed += 0.01;
  //     console.log(zombieSpeed);
  //   }, zombieSpeed)
  // }

  let zombieLaneList = [];
  let zombieList = Array.from({ length: 5 }, () => []);

  const generateZombie = () => {
    const randomLaneRow = Math.floor(Math.random() * 5);
    zombieLaneList.push(randomLaneRow);
    // console.log(zombieLaneList);
    // Ini +1 karena lihat htmlnya
    const randomLane = document.getElementById(`lane-${randomLaneRow + 1}`);

    const zombieContainer = document.createElement("div");
    zombieContainer.classList.add("zombie-lane");
    zombieContainer.id = `zombie-lane-${randomLaneRow}`;
    zombieContainer.style.background = "yellow";

    randomLane.appendChild(zombieContainer);

    const zombie = new RegularZombie();
    zombie.setZombie(zombieContainer);
    zombie.setLanePosition(randomLaneRow);
    zombie.createZombieAnimation();
    zombie.move();

    // zombieList.push(zombie);
    zombieList[randomLaneRow].push(zombie);
    console.log(zombieList);
  };

  let shootInterval = null;

  const setShootInterval = () => {
    shootInterval = setInterval(() => {
      checkZombieAndPlant();
    }, 3000);
  };

  // Fungsi untuk mengecek zombie di setiap lane dan menghitung jarak dari zombie
  const checkZombieAndPlant = () => {
    // Untuk emenentukan lane uniq
    const unique = [...new Set(zombieLaneList)];
    // console.log(unique);
    unique.forEach((lane) => {
      // Langsung akss baris
      blockArray[lane].forEach((block, colIndex) => {
        // console.log(block.isAvailable());

        if (block.isAvailable()) {
          let plant = block.getBlockPlant();
          // console.log(plant);

          switch (plant.name) {
            case "PeaShooter":
              // console.log(block);
              let objZombieHere = null;

              blockArray[lane].forEach((zombotBlock) => {
                if (zombotBlock.getZombieHere() !== null) {
                  console.log("ada");
                  objZombieHere = zombotBlock.getZombieHere();
                  console.log(objZombieHere);
                  // console.log("INI NGESOOT");
                  plant.shoot(objZombieHere);
                }
                // console.log(zombotBlock);
              });

              break;

            case "IcePea":
              plant.shoot();
              break;

            default:
              break;
          }
        }
      });
    });
  };

  let randomSunInterval = null;
  let sunList = [];

  // UNTUK Memunculkan random Matahari
  const randomSun = () => {
    if (sunFlowerList.length > 0) {
      randomSunInterval = setInterval(() => {
        const randomSunflowerIndex = Math.floor(
          Math.random() * sunFlowerList.length
        );

        // Untuk mengambil random objek bunga matahari
        const sunflower = sunFlowerList[randomSunflowerIndex];

        // Untuk membuat objek mathari
        let sun = new Sun();

        // Memeriksa eleme block apakah ada sun atau tidak
        let blockContainer = sunflower.getElement();
        // console.log(blockContainer);

        // Memnaggil kelas bunga matahari
        if (!blockContainer.querySelector("img")) {
          sun.setSunPosition(blockContainer);
          sunflower.produceSun(sun, sun.sunImagePath);

          // Memetakan elemen mathari dari bunga matahri

          sunList.push(sun);
        }

        checkSunClick();
      }, 3000);
    }
  };

  const checkSunClick = () => {
    if (sunList.length > 0) {
      sunList.forEach((item, index) => {
        const sunElement = item.getSunPosition();

        // console.log(sunElement);
        const firstChild = sunElement.firstElementChild;

        // Mengecek apakah ada elment di dalamnya
        if (sunElement.contains(firstChild)) {
          firstChild.addEventListener("click", () => {
            console.log("sun clicked");

            sunElement.removeChild(firstChild);

            // Menambahkan jumlah matahari setiap kali matahsati di pilih
            sunAmount += item.sunValue;

            // Memanggil fungsinya
            sunAmountChange();

            sunList.splice(index, 1);
          });
        }
      });
    }
  };

  // Ketika matahari bertambah

  const gameSun = document.getElementById("sun-amount");

  const sunAmountChange = () => {
    gameSun.innerHTML = sunAmount;
  };

  // Batas koordinat dari block 85, 170, 255, 340, 425, 510, 595, 680
  const showCoordinatBlock = () => {
    console.log(laneGridWidth); //Widthnya 680
    console.log(lanePlantWithZombieWidth); // widthnya 803
    // Setiap move zombienya  bakal mengurangi lanePlantWithZombieWidth
    blockArray[1].forEach((block) => {
      console.log(block.coordinat);
    });
  };

  renderGameplayLayout();
  generateZombie();
  setShootInterval();

  showCoordinatBlock();

  // setInterval(() => {
  //   generateZombie();
  // }, 5000);
});
