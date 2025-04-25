function initLayout() {
    // initHome(); 
    initGameplay();
    clearActiveScreen('gameplay');
}


const playerData = {
    username: 'Nando',
    level: 'medium'
}

function initHome() {
    const inputUsername = document.getElementById('username'),
        selectLevel = document.getElementById('level'),
        btnPlay = document.getElementById('btn-play'),
        btnInstruction = document.getElementById('btn-instruction'),
        instruction = document.getElementById('instruction'),
        closeInstr = document.getElementById('close-instr')
        ;

    inputUsername.oninput = (e) => {
        let username = e.target.value.trim()
        // console.log(username)
        btnPlay.classList.toggle('disabled', username === '');
        playerData['username'] = username;
    }

    selectLevel.onchange = (e) => {
        playerData['level'] = e.target.value
    }

    btnInstruction.onclick = () => {
        instruction.classList.toggle('open');
    }

    closeInstr.onclick = () => {
        instruction.classList.remove('open');
    }

    btnPlay.onclick = (e) => {
        if (playerData['username'] === '') {
            alert('Username must be filled !')
            return;
        }

        if (playerData['level'] === '') {
            alert('Must be choose one level !')
            return;
        }

        clearActiveScreen('countdown');
        showCountdown(() => {
            clearActiveScreen('gameplay');
            initGameplay();
        })


    }


}

function initGameplay() {
    const sunAmount = document.getElementsByClassName('.sun-amount')[0],
        plantSeeds = document.querySelectorAll('.seeds'),
        playerName = document.querySelectorAll('.player-name'),
        playerScore = document.querySelectorAll('.player-score'),
        playerTime = document.getElementById('player-time'),
        shovel = document.getElementById('shovel'),
        leaderSort = document.getElementById('sortBy'),
        leaders = document.getElementById('leaders'),
        zombieLevel = playerData['level'] === 'easy' ? 1 : playerData['level'] === 'medium' ? 2 : 3
        ;


    const timer = gameTimer({
        MAX_TIME: 50000,
        ELEMENT: playerTime,
        onCompleted: () => {
            alert('selesai');
        }
    });

    // Load games

    const images = {
        Lawnmower: new Image(),
        SunFlower: [],
        WallNut: [],
        PeaShooter: [],
        IcePea: [],
        Zombie: [],
        Sun: new Image(),
    }


    function fetchImages() {
        images.Lawnmower.src = './media/Sprites/General/lawnmowerIdle.gif';
        images.Sun.src = './media/Sprites/General/Sun.png';


        function generateFrame(plantName, frameCount, frameDelay) {

            for (let fr = 0; fr < frameCount; fr++) {
                const img = new Image(),
                    frame = fr.toString().padStart(2, "0");
                img.src = `./media/Sprites/${plantName}/frame_${frame}_delay-${frameDelay}s.gif`;

                images[plantName].push(img)
            }
        }


        generateFrame("SunFlower", 25, 0.06);
        generateFrame("WallNut", 33, 0.12);
        generateFrame("PeaShooter", 31, 0.12);
        generateFrame("IcePea", 32, 0.12);
        generateFrame("Zombie", 34, 0.05);
    }


    function loadAllImages() {
        let promise = [];

        promise.push(
            new Promise((resolve) => images.Lawnmower.onload = resolve)
        )

        promise.push(
            new Promise((resolve) => images.Sun.onload = resolve)
        )


        images.SunFlower.forEach((img) => {
            promise.push(
                new Promise((resolve) => img.onload = resolve)
            )

        })

        images.WallNut.forEach((img) => {
            promise.push(
                new Promise((resolve) => img.onload = resolve)
            )
        })

        images.PeaShooter.forEach((img) => {
            promise.push(

                new Promise((resolve) => img.onload = resolve)
            )

        })

        images.IcePea.forEach((img) => {
            promise.push(
                new Promise((resolve) => img.onload = resolve)
            )

        })

        return Promise.all(promise);
    }

    fetchImages();
    loadAllImages()
        .then(() => {

        })
        .catch((err) => {
            console.log(err);
        })

    //    Gameplay 
    const canvas = document.getElementById('gameCanvas'),
        ctx = canvas.getContext('2d'),
        canvasW = canvas.width,
        canvasH = canvas.height,
        gridX = 80,
        gridY = 0,
        gridW = 670,
        gridH = 450,
        COLS = 8,
        ROWS = 5,
        cellW = gridW / COLS,
        cellH = gridH / ROWS;


    let
        grid = [],
        lawnmowers = [],
        plants = [],
        zombies = [],
        suns = [];

    // Create Grid 
    for (let row = 0; row < ROWS; row++) {
        grid[row] = [];
        lawnmowers.push({
            x: 0,
            y: gridY + row * cellH,
            width: 80,
            height: 80,
            speed: 1,
            active: false,
            used: false,
        })

        for (let col = 0; col < COLS; col++) {
            grid[row][col] = {
                x: gridX + col * cellW,
                y: gridY + row * cellH,
                width: cellW,
                height: cellH,
                occupied: false
            }
        }
    }


    const drawObject = {
        drawGrid: () => {
            ctx.strokeStyle = 'green',
                ctx.lineWidth = 2
            grid.forEach(gr => gr.map((g) => {
                ctx.strokeRect(g.x, g.y, g.width, g.height)
            }))

            ctx.stroke();
        },
        drawLawnmowers: () => {
            lawnmowers.forEach((lawn) => {
                ctx.drawImage(
                    images.Lawnmower,
                    lawn.x,
                    lawn.y,
                    lawn.width,
                    lawn.height
                )
            })
        },
        drawZombies: () => {
            zombies.forEach((zombie) => {
                ctx.drawImage(
                    images.Zombie[zombie.frameIndex],
                    zombie.x,
                    zombie.y,
                    zombie.width,
                    zombie.height
                )
            })
        },
        drawPlants: () => {
            plants.forEach((plant) => {
                ctx.drawImage(
                    images[plant.plantType][plant.frameIndex],
                    plant.x,
                    plant.y,
                    plant.width,
                    plant.height
                )
            })
        }
    }

    const updateObject = {
        updateZombies: () => {
            const now = Date.now();

            zombies.forEach((zombie, index) => {

                zombie.x -= zombie.speed;

                if (zombie.x <= 0) {
                    if (!lawnmowers[zombie.row].active) {
                        lawnmowers[zombie.row].active = true
                    }

                    zombies.splice(index, 1);


                    if (lawnmowers[zombie.row].used) {
                        timer.stop();
                        clearActiveScreen("gameover", false);
                    }


                }

                if (!zombie.lastUpdate) {
                    zombie.lastUpdate = now;
                }

                if (now - zombie.lastUpdate > zombie.frameDelay) {
                    zombie.frameIndex = (zombie.frameIndex + 1) % images.Zombie.length
                    zombie.lastUpdate = now
                }

            })
        },
        updateLawnmowers: () => {
            lawnmowers.forEach((lawn, lIndex) => {
                if (lawn.active && !lawn.used) {

                    lawn.x += lawn.speed;

                    zombies.forEach((zombie, zIndex) => {
                        if (lIndex === zombie.row) {
                            if (lawn.x + lawn.width >= zombie.x) {
                                zombies.splice(zIndex, 1)
                            }
                        }
                    })

                    if (lawn.x > canvasW) {
                        // lawnmowers.splice(lIndex, 1);
                        lawn.used = true

                    }
                }
            })
        },

        updatePlants: () => {
            const now = Date.now();

            plants.forEach((plant, index) => {
                if (!plant.lastUpdate) {
                    plant.lastUpdate = now;
                }

                if (now - plant.lastUpdate > plant.frameDelay) {
                    plant.frameIndex = (plant.frameIndex + 1) % images[plant.plantType].length
                    plant.lastUpdate = now
                }

            })
        },
    }



    let animationFrameId = null,
        spawnZombieIntervalId = null,
        spawnSunIntervalId = null
        ;
    function render() {
        ctx.clearRect(0, 0, canvasW, canvasH)
        drawObject.drawGrid();
        drawObject.drawLawnmowers();
        drawObject.drawZombies();
        drawObject.drawPlants();


        updateObject.updateZombies();
        updateObject.updateLawnmowers();
        updateObject.updatePlants();

        animationFrameId = requestAnimationFrame(render);
    }



    function spawnZombies() {
        if (spawnSunIntervalId === null) {
            spawnSunIntervalId = setInterval(() => {

                for (let i = 0; i < zombieLevel; i++) {
                    const randomRow = Math.floor(Math.random() * ROWS)
                    zombies.push({
                        x: canvasW,
                        y: gridY + randomRow * cellH,
                        speed: 0.5,
                        width: cellW,
                        row: randomRow,
                        frameIndex: 0,
                        frameDelay: 100,
                        height: cellH
                    });
                }


            }, 5000);
        }
    }

    function spawnSuns() {

    }




    render();
    spawnZombies();



    let selectedTool = 'plant',
        selectedPlant = '';

    const almanac = [
        {
            plantType: "SunFlower",
            cost: 50
        },
        {
            plantType: "WallNut",
            cost: 50
        },
        {
            plantType: "PeaShooter",
            cost: 50
        },
        {
            plantType: "IcePea",
            cost: 50
        },
    ]

    plantSeeds.forEach((seed, index) => {
        seed.onclick = () => {
            selectedTool = 'plant';
            selectedPlant = almanac[index].plantType;
        }
    })

    canvas.onclick = (e) => {
        const rect = canvas.getBoundingClientRect(),
            mouseX = e.clientX - rect.left,
            mouseY = e.clientY - rect.top,
            col = Math.floor((mouseX - gridX) / cellW),
            row = Math.floor((mouseY - gridY) / cellH),
            isGridClicked =
                mouseX >= gridX &&
                mouseX <= canvasW &&
                mouseY >= gridY &&
                mouseY <= canvasH;
            
           if(isGridClicked ) {
                 const selectedGrid = grid[row][col]
                 if(!selectedGrid.occupied)
                 {
                     plants.push ({
                        plantType : selectedPlant,
                        x : selectedGrid.x,
                        y : selectedGrid.y,
                        width : selectedGrid.width,
                        height : selectedGrid.height,
                        frameIndex : 0,
                        frameDelay : 100
                     })

                     console.log(plants)
                 }
           }
    }


}

function gameTimer(options = {}) {
    let elapsedTime = 0,
        timerInterval = null,
        MAX_TIME = options.MAX_TIME,
        element = options.ELEMENT;

    function updateDisplay() {
        const second = Math.ceil(elapsedTime / 100),
            centisecond = elapsedTime % 100;

        element.textContent = `${second.toString().padStart(2, "0")} : ${centisecond.toString().padStart(2, "0")}`
    }

    function startTimer() {
        if (timerInterval === null) {

            timerInterval = setInterval(() => {
                elapsedTime++;

                if (elapsedTime >= MAX_TIME) {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    options.onCompleted();
                }

                updateDisplay();
            }, 10)
        }
    }

    startTimer();


    return {
        stop: () => {
            clearInterval(timerInterval);
            timerInterval = null
        },
        resume: () => {
            if (timerInterval === null) startTimer()
        },
        reset: () => {
            clearInterval(timerInterval);
            timerInterval = null;
            elapsedTime = 0;
            startTimer();
        }
    }
}


function showCountdown(callback) {
    let count = 3,
        element = document.getElementById('count'),
        countdownInterval = null;


    countdownInterval = setInterval(() => {

        if (count <= 0) {
            clearInterval(countdownInterval)
            countdownInterval = null;
            callback();

        }

        element.textContent = count;

        count--;

    }, 1000)
}

function clearActiveScreen(screenId, clearAll = true) {
    if (clearAll) {
        const screens = document.querySelectorAll('.screen.active');
        screens.forEach((screen) => screen.classList.remove('active'))
    }

    const screen = document.getElementById(screenId);
    screen.classList.add('active')
}

initLayout();

